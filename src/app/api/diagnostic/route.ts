import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site";
import { Resend } from "resend";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid business email required"),
  company: z.string().min(1, "Company or project name is required"),
  phone: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  notes: z.string().optional(),
  answers: z.array(z.string()).default([]),
  diagnosticResult: z
    .object({
      primaryPillar: z.string(),
      title: z.string(),
      recommendedEngagement: z.string(),
      scores: z.object({
        strategy: z.number(),
        branding: z.number(),
        web: z.number(),
      }),
    })
    .optional(),
  referralCode: z.string().optional(),
  _hp: z.string().optional(), // Honeypot field
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check honeypot
    if (body._hp && body._hp.trim() !== "") {
      // Silently return success to mislead spam bots
      return NextResponse.json({ success: true, leadId: "BOT_FILTERED" });
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const leadId = `DZ-${Date.now().toString(36).toUpperCase()}`;

    // Attempt email dispatch via Resend if API key is provided
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Deezaina Studios <onboarding@resend.dev>",
        to: [siteConfig.email],
        replyTo: data.email,
        subject: `[New Studio Lead] ${data.company} — ${data.name} (${leadId})`,
        text: `
NEW STUDIO DIAGNOSTIC LEAD [${leadId}]

CONTACT DETAILS:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company}
- Phone/WhatsApp: ${data.phone || "Not specified"}
- Referral Code: ${data.referralCode || "Direct"}

PROJECT PARAMETERS:
- Budget Tier: ${data.budget || "Not specified"}
- Target Timeline: ${data.timeline || "Not specified"}
- Notes/Brief: ${data.notes || "None"}

DIAGNOSTIC SCORES:
- Primary Gap: ${data.diagnosticResult?.title || "N/A"}
- Recommended: ${data.diagnosticResult?.recommendedEngagement || "N/A"}
- Scores: Strategy: ${data.diagnosticResult?.scores.strategy || 0} | Branding: ${
          data.diagnosticResult?.scores.branding || 0
        } | Web: ${data.diagnosticResult?.scores.web || 0}
        `.trim(),
      });
    } else {
      // In development or when RESEND_API_KEY is omitted, log the lead to server console
      console.log("[Deezaina Lead Engine] New Lead Captured:", {
        leadId,
        lead: data,
      });
    }

    return NextResponse.json({
      success: true,
      leadId,
      message: "Lead processed successfully",
    });
  } catch (error) {
    console.error("[Deezaina Lead Engine] Error processing lead:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
