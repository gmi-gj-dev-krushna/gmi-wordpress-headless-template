import { useEffect, useState } from "react";
import { fetchData } from "../lib/api";
import Loader from "../components/Loader";
import TeamCard from "../components/Card/TeamCard";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("/posts/team").then((data) => {
      setTeam(data.posts);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {team.map((member) => (
        <TeamCard
          key={member.id}
          name={member.title}
          designation={member.designation}
          image={member.featured_image}
        />
      ))}
    </section>
  );
}
