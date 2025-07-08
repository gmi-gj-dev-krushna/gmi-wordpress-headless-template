import React, { useEffect, useState } from "react";
import { fetchData } from "../lib/api";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [headerData, setHeaderData] = useState({
    logo: "",
    menu: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

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
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          {headerData.logo ? (
            <a href="/">
              <img
                src={headerData.logo}
                alt="Site Logo"
                className="h-[60px] sm:h-[80px] w-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </a>
          ) : (
            <span className="text-xl font-bold">My Site</span>
          )}
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {headerData.menu.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="text-white hover:text-gray-300 transition font-bebas tracking-wider text-xl"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-4 text-center">
            {headerData.menu.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="block text-white hover:text-gray-300 transition font-bebas tracking-wide text-2xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
