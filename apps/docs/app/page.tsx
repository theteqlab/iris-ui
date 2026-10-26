import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold">iris-ui</h1>
      <p className="text-fd-muted-foreground">
        Accessible React components in the Verre irisé style.
      </p>
      <Link href="/docs" className="font-medium text-fd-primary underline underline-offset-4">
        Read the docs
      </Link>
    </main>
  );
}
