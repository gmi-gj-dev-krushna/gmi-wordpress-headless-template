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
        <div className="mb-8">
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
                <p className="text-blue-800 font-roboto">
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
        className="prose prose-invert "
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
