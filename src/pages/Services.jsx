import { useEffect, useState } from "react";
import ServiceCard from "../components/Card/ServiceCard";
import Loader from "../components/Loader";
import { fetchData } from "../lib/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("/posts/services").then((data) => {
      setServices(data.posts);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          content={service.content}
        />
      ))}
    </section>
  );
}
