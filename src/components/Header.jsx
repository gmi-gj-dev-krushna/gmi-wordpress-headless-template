import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [logo, setLogo] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const res = await axios.get(
          "http://localhost/wordpress/wp-json/custom/v1/header"
        );
        const data = res.data;
        setLogo(data.logo);
        setMenuItems(data.menu);
      } catch (err) {
        console.error("Failed to load header:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 shadow text-center text-white">Loading header...</div>
    );
  }

  return (
    <header className="text-white shadow sticky top-0 z-50 bg-black">
      <div className="mx-auto px-16 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          {logo ? (
            <img src={logo} alt="Site Logo" className="h-[120px] w-auto" />
          ) : (
            <span className="text-xl font-bold">My Site</span>
          )}
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
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
