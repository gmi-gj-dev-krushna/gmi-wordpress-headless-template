import React, { useEffect, useState } from "react";
import { fetchData } from "../lib/api";

const Header = () => {
  const [headerData, setHeaderData] = useState({
    logo: "",
    menu: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const data = await fetchData("/header");
        setHeaderData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load header:", err);
        setError("Failed to load header");
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 shadow text-center text-white bg-black">
        Loading header...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 shadow text-center text-red-500 bg-black">
        {error}
      </div>
    );
  }

  return (
    <header className="text-white shadow sticky top-0 z-50 bg-black">
      <div className="mx-auto px-16 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          {headerData.logo ? (
            <img
              src={headerData.logo}
              alt="Site Logo"
              className="h-[120px] w-auto"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <span className="text-xl font-bold">My Site</span>
          )}
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            {headerData.menu.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="text-white hover:text-gray-300 transition font-bebas tracking-wider"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
