import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Utility functions (copied from Blogs.jsx)
const stripHtml = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const getKeywords = (post) => {
  const keywords = [];
  if (post._embedded && post._embedded["wp:term"]) {
    const terms = post._embedded["wp:term"];
    terms.forEach((termGroup) => {
      if (termGroup && Array.isArray(termGroup)) {
        termGroup.forEach((term) => {
          if (term.name && term.name.toLowerCase() !== "uncategorized") {
            keywords.push(term.name);
          }
        });
      }
    });
  }
  return keywords.slice(0, 1);
};

export default function ResourcesPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://localhost/wordpress/wp-json/wp/v2/posts?per_page=10&_embed"
        );
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        // Process blogs like in Blogs.jsx
        const processedBlogs = data.map((post) => {
          let featuredImage = "https://placeholder.com/300x200";
          if (post._embedded && post._embedded["wp:featuredmedia"]) {
            featuredImage =
              post._embedded["wp:featuredmedia"][0]?.source_url ||
              featuredImage;
          }
          return {
            id: post.id,
            title: stripHtml(post.title.rendered),
            description:
              stripHtml(post.excerpt.rendered).substring(0, 150) + "...",
            date: formatDate(post.date),
            image: featuredImage,
            link: post.link,
            slug: post.slug,
            keywords: getKeywords(post),
            comments: post.comment_count || 0,
          };
        });
        setBlogs(processedBlogs);
      } catch {
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://acetechinside.tech/wp-json/wp/v2/categories?per_page=100"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        // Filter out categories with 0 posts and uncategorized
        const filteredCategories = data.filter(
          (cat) => cat.count > 0 && cat.name.toLowerCase() !== "uncategorized"
        );
        setCategories(filteredCategories);
      } catch {
        setError("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "https://acetechinside.tech/wp-json/wp/v2/tags?per_page=100"
        );
        if (!response.ok) throw new Error("Failed to fetch tags");
        const data = await response.json();
        // Filter out tags with 0 posts
        const filteredTags = data.filter((tag) => tag.count > 0);
        setTags(filteredTags);
      } catch {
        setError("Failed to load tags.");
      }
    };
    fetchTags();
  }, []);

  // Handle category click - navigate to separate category component
  const handleCategoryClick = (category) => {
    navigate(`/category/${category.slug}`);
  };

  // Handle tag click - navigate to tag blogs page
  const handleTagClick = (tag) => {
    navigate(`/tag/${tag.slug}`);
  };

  // Handle blog click - navigate to blog detail page using slug
  const handleBlogClick = (blog) => {
    // Navigate to blog detail page using the slug
    navigate(`/${blog.slug}`);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-12">
      <div className="flex flex-col md:flex-row gap-8 text-white max-w-7xl w-full">
        {/* Left: Blog Cards */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading && (
              <div className="col-span-full text-center py-16">
                <p className="text-xl text-gray-400">Loading blogs...</p>
              </div>
            )}
            {error && <div className="col-span-full text-red-500">{error}</div>}
            {!loading && blogs.length === 0 && !error && (
              <div className="col-span-full text-center py-16">
                <p className="text-xl text-gray-400">No blogs found.</p>
              </div>
            )}
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => handleBlogClick(blog)}
                onMouseEnter={() => setHoveredCard(blog)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group font-roboto bg-gray-800 overflow-hidden transition-all duration-500 ease-in-out cursor-pointer flex flex-col hover:bg-gray-750"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://placeholder.com/300x200";
                    }}
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-3 font-bebas">
                    <div className="flex items-center gap-2 mb-2 tracking-wider">
                      <div className="w-8 h-0.5 bg-white"></div>
                      {blog.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="text-white px-2 py-1 rounded uppercase tracking-wide"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="font-bebas tracking-wider flex-1">
                    <h2 className="text-xl mb-2 line-clamp-2 group-hover:text-gray-200 transition-colors duration-200">
                      {blog.title}
                    </h2>
                  </div>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="flex items-center text-gray-400 text-sm mt-auto">
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.comments} Comments</span>
                  </div>
                  <div className="flex items-center text-white mt-2 font-bebas tracking-wider text-xl">
                    {hoveredCard === blog && (
                      <span className="mr-2">READ MORE</span>
                    )}
                    <p className="text-2xl">+</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Categories & Tags */}
        <div className="w-full md:w-1/3 p-8 bg-[#242222]">
          {/* Categories Section */}
          <h2 className="text-xl font-bold mb-4 font-bebas tracking-wider">
            CATEGORIES
          </h2>
          {categories.length === 0 && !error && (
            <div className="text-gray-400">Loading categories...</div>
          )}
          <ul className="space-y-2 mb-8">
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="text-gray-200 font-bebas flex justify-between hover:text-[#de60ca] hover:cursor-pointer transition-colors duration-200 py-1"
              >
                <span className="uppercase">{cat.name}</span>
                <span className="ml-2">({cat.count})</span>
              </li>
            ))}
          </ul>

          {/* Tags Section */}
          <h2 className="text-xl font-bold mb-4 font-bebas tracking-wider">
            TAGS
          </h2>
          {tags.length === 0 && !error && (
            <div className="text-gray-400">Loading tags...</div>
          )}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                onClick={() => handleTagClick(tag)}
                className="border border-gray-400 px-3 py-1 text-xs font-bebas uppercase tracking-wide text-gray-200 hover:text-[#de60ca] hover:border-[#de60ca] transition-colors duration-200 cursor-pointer"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
