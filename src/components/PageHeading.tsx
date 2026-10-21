export default function PageHeading({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <header className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {lead && <p className="mx-auto mt-3 max-w-xl text-foreground/60">{lead}</p>}
    </header>
  );
}
