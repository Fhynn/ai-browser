interface PlaceholderCardProps {
  label: string;
  title: string;
  body: string;
}

export function PlaceholderCard({ body, label, title }: PlaceholderCardProps) {
  return (
    <article className="border border-borderSoft bg-surfaceWhite p-6">
      <p className="technical-label text-textSecondary">{label}</p>
      <h2 className="mt-4 text-2xl font-black uppercase leading-tight">{title}</h2>
      <p className="mt-4 leading-7 text-textSecondary">{body}</p>
    </article>
  );
}
