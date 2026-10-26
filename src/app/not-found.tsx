import Link from "next/link";
import Label from "@/components/ui/Label";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 space-y-8">
      <Label>ERROR 404 // ROUTE NOT FOUND</Label>

      <div className="space-y-4 max-w-xl">
        <h1 className="font-display font-extrabold text-[clamp(4rem,14vw,11rem)] leading-none text-[var(--R)]">
          404.
        </h1>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--W)]">
          Wrong Diagnosis.
        </h2>
        <p className="type-body text-base text-[var(--W55)]">
          The page or case study you are searching for does not exist, has been
          repositioned, or has moved to another sector.
        </p>
      </div>

      <div className="pt-4">
        <Link href="/" className="btn-r">
          Back to Home Base →
        </Link>
      </div>
    </main>
  );
}
