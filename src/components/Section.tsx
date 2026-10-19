export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-4xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
