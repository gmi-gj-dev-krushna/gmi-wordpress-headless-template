import { useEffect, useState } from "react";
import PortfolioCard from "../components/Card/PortfolioCard";
import Loader from "../components/Loader";
import { fetchData } from "../lib/api";

export default function Portfolio() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("/posts/portfolio").then((data) => {
      setPosts(data.posts);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {posts.map((post) => (
        <PortfolioCard
          key={post.id}
          title={post.title}
          excerpt={post.excerpt}
          image={post.featured_image}
          slug={post.slug}
          type="portfolio" // or post.type if available
        />
      ))}
    </section>
  );
}
