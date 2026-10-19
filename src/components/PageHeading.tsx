export default function PageHeading({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {lead && <p className="mt-3 max-w-xl text-foreground/60">{lead}</p>}
    </header>
  );
}
