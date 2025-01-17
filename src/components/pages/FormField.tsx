export default function FormField({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <section className="relative bg-white border border-zinc-100 border-opacity-0 mx-auto lg:p-12 p-6">
      {children}
    </section>
  );
}
