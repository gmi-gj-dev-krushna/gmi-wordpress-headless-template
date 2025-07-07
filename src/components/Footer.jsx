import React, { useEffect, useState } from "react";
import { fetchData } from "../lib/api";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";

const getSocialIcon = (label) => {
  switch (label.toLowerCase()) {
    case "facebook":
      return <Facebook className="w-4 h-4" />;
    case "twitter":
      return <Twitter className="w-4 h-4" />;
    case "instagram":
      return <Instagram className="w-4 h-4" />;
    case "linkedin":
      return <Linkedin className="w-4 h-4" />;
    case "youtube":
      return <Youtube className="w-4 h-4" />;
    default:
      return <Globe className="w-4 h-4" />;
  }
};

const Footer = () => {
  const [footerData, setFooterData] = useState({
    logo: "",
    address: "",
    email: "",
    links: [],
    social: [],
    copyright: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await fetchData("/footer");
        const custom = data?.custom_fields || {};

        // Convert object of links/social into array
        const formatObjectToArray = (obj) =>
          obj
            ? Object.keys(obj).map((key) => ({
                label: obj[key].title,
                url: obj[key].url,
                target: obj[key].target || "_self",
              }))
            : [];

        setFooterData({
          logo: custom.footer_logo || "",
          address: custom.footer_address || "",
          email: custom.footer_email || "",
          links: formatObjectToArray(custom.footer_links),
          social: formatObjectToArray(custom.footer_social),
          copyright: custom.footer_copyright || "",
        });

        setError(null);
      } catch (err) {
        console.error("Footer fetch error:", err);
        setError("Failed to load footer");
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return (
      <div className="text-white py-12 px-6 md:px-12 text-center">
        Loading footer...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 py-12 px-6 md:px-12 text-center">
        {error}
      </div>
    );
  }

  return (
    <footer className="text-white py-12 px-6 md:px-12 bg-gray-900">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-4 gap-10 items-start">
        {/* Logo */}
        <div className="flex flex-col items-start">
          {footerData.logo && (
            <img
              src={footerData.logo}
              alt="Footer Logo"
              className="h-16 mb-4"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
        </div>

        {/* Address and Email */}
        <div>
          <h4 className="font-bold uppercase mb-2">Office</h4>
          {footerData.address && (
            <div
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: footerData.address }}
            />
          )}
          {footerData.email && (
            <a
              href={`mailto:${footerData.email}`}
              className="block mt-4 font-semibold text-white hover:underline"
            >
              {footerData.email}
            </a>
          )}
        </div>

        {/* Links */}
        {footerData.links.length > 0 && (
          <div>
            <h4 className="font-bold uppercase mb-2">Links</h4>
            <ul className="space-y-2">
              {footerData.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target={link.target}
                    rel="noopener noreferrer"
                    className="hover:underline text-sm text-white font-bebas tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Social Links */}
        {footerData.social.length > 0 && (
          <div>
            <h4 className="font-bold uppercase mb-2">Social Links</h4>
            <ul className="flex space-x-4">
              {footerData.social.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-400 transition"
                    title={item.label}
                  >
                    {getSocialIcon(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Divider and Copyright */}
      {footerData.copyright && (
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-400">
          {footerData.copyright}
        </div>
      )}
    </footer>
  );
};

export default Footer;
