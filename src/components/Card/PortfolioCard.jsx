import { Link } from "react-router-dom";

export default function PortfolioCard({ title, excerpt, image, slug, type }) {
  return (
    <Link to={`/${type}/${slug}`}>
      <div className=" rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer border-white border-2">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 bg-white">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p
            className="prose prose-invert"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
      </div>
    </Link>
  );
}
