import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { fetchData } from "../lib/api";

export default function SinglePost() {
  const { type, slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchData(`/post-by-slug/${type}/${slug}`).then(setPost);
  }, [type, slug]);

  if (!post) return <Loader />;

  return (
    <article className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.featured_image && (
        <img src={post.featured_image} alt={post.title} className="mb-6" />
      )}
      <div
        className="prose prose-lg prose-invert max-w-none
                  prose-headings:text-white prose-headings:font-bebas prose-headings:tracking-wider prose-headings:uppercase
                  prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:border-b prose-h1:border-gray-600 prose-h1:pb-3
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:text-white prose-h2:font-bebas
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5 prose-h3:text-gray-100 prose-h3-font-bebas
                  prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4 prose-h4:text-gray-200 prose-h4:font-bebas
                  prose-h5:text-base prose-h5:mb-2 prose-h5:mt-3 prose-h5:text-gray-300 prose-h5:font-bebas
                  prose-h6:text-sm prose-h6:mb-2 prose-h6:mt-3 prose-h6:text-gray-400
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg prose-p:font-roboto
                  prose-a:text-white prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:font-roboto
                  prose-strong:text-white prose-strong:font-bebas
                  prose-em:text-gray-200 prose-em:italic
                  prose-ul:text-gray-300 prose-ul:mb-4 prose-ul:pl-6
                  prose-ol:text-gray-300 prose-ol:mb-4 prose-ol:pl-6
                  prose-li:text-gray-300 prose-li:mb-2 prose-li:leading-relaxed
                  prose-li:marker:text-white
                  prose-blockquote:border-l-4 prose-blockquote:border-l-white prose-blockquote:text-gray-300 
                  prose-blockquote:bg-gray-700 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:italic
                  prose-code:text-white prose-code:bg-gray-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                  prose-table:text-gray-300 prose-thead:bg-gray-700 prose-th:text-white prose-th:font-bebas prose-th:tracking-wider
                  prose-td:border-gray-600 prose-th:border-gray-600
                  prose-img:rounded-lg prose-img:shadow-lg prose-img:mb-6
                  prose-hr:border-gray-600 prose-hr:my-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
