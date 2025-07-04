// components/Card/ServiceCard.jsx
export default function ServiceCard({ title, content }) {
  return (
    <div className="rounded-2xl p-6 shadow hover:shadow-md transition border-4 border-white">
      <h1 className="text-4xl font-bebas mb-3 text-white">{title}</h1>
      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
