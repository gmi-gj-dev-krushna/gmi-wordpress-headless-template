import { Link } from "react-router-dom";

export default function ServiceCard({
  title,
  content,
  image,
  slug,
  type = "services",
}) {
  return (
    <Link to={`/${type}/${slug}`}>
      <div className="group font-roboto bg-gray-800 overflow-hidden transition-all duration-500 ease-in-out cursor-pointer flex flex-col hover:bg-gray-750">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x200";
            }}
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="mb-3 font-bebas tracking-wider">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-white"></div>
              <span className="text-white px-2 py-1 rounded uppercase">
                Service
              </span>
            </div>
          </div>
          <div className="font-bebas tracking-wider flex-1">
            <h3 className="text-xl text-white mb-2 line-clamp-2 group-hover:text-gray-200 transition-colors duration-200">
              {title}
            </h3>
          </div>
          <div className="text-gray-300 text-sm mb-3 line-clamp-3 prose prose-invert">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="flex items-center text-white mt-auto font-bebas tracking-wider text-xl">
            <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              LEARN MORE
            </span>
            <p className="text-2xl">+</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
