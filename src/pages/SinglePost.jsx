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

  // Check if this is a team member post
  const isTeamMember = post.type === "team";

  return (
    <article className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4 font-bebas tracking-wider">
        {post.title}
      </h1>

      {/* Show designation for team members */}
      {isTeamMember && post.custom_fields?.designation && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-white"></div>
            <span className="text-white px-2 py-1 rounded uppercase text-sm font-bebas tracking-wider">
              {post.custom_fields.designation}
            </span>
          </div>
        </div>
      )}

      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="mb-6 rounded-lg shadow-lg"
        />
      )}

      {/* Team member specific information */}
      {isTeamMember && post.custom_fields && (
        <div className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bebas tracking-wider mb-4 border-b border-gray-600 pb-2">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {post.custom_fields.department && (
              <div>
                <label className="text-gray-400 text-sm font-bebas tracking-wider">
                  Department
                </label>
                <p className="text-white font-roboto">
                  {post.custom_fields.department}
                </p>
              </div>
            )}

            {post.custom_fields.years_experiyance && (
              <div>
                <label className="text-gray-400 text-sm font-bebas tracking-wider">
                  Experience
                </label>
                <p className="text-white font-roboto">
                  {post.custom_fields.years_experiyance} years
                </p>
              </div>
            )}

            {post.custom_fields.email && (
              <div>
                <label className="text-gray-400 text-sm font-bebas tracking-wider">
                  Email
                </label>
                <p className="text-white font-roboto">
                  <a
                    href={`mailto:${post.custom_fields.email}`}
                    className="hover:underline"
                  >
                    {post.custom_fields.email}
                  </a>
                </p>
              </div>
            )}

            {post.custom_fields.phone && (
              <div>
                <label className="text-gray-400 text-sm font-bebas tracking-wider">
                  Phone
                </label>
                <p className="text-white font-roboto">
                  {post.custom_fields.phone}
                </p>
              </div>
            )}

            {post.custom_fields.linkedin && (
              <div>
                <label className="text-gray-400 text-sm font-bebas tracking-wider">
                  LinkedIn
                </label>
                <p className="text-white font-roboto">
                  <a
                    href={post.custom_fields.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    View Profile
                  </a>
                </p>
              </div>
            )}

            {post.custom_fields.skills && (
              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm font-bebas tracking-wider">
                  Skills
                </label>
                <p className="text-white font-roboto">
                  {post.custom_fields.skills}
                </p>
              </div>
            )}

            {post.custom_fields.bio && (
              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm font-bebas tracking-wider">
                  Bio
                </label>
                <p className="text-white font-roboto">
                  {post.custom_fields.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
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
