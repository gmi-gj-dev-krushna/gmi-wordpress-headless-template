import React, { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    axios
      .get("http://localhost/wordpress/wp-json/custom/v1/footer")
      .then((res) => setFooterData(res.data))
      .catch((err) => console.error("Footer fetch error:", err));
  }, []);

  return (
    <footer className="text-white py-12 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-4 gap-10 items-start">
        {/* Logo */}
        <div className="flex flex-col items-start">
          {footerData.logo && (
            <img
              src={footerData.logo}
              alt="Footer Logo"
              className="h-16 mb-4"
            />
          )}
        </div>

        {/* Address and Email */}
        <div>
          <h4 className="font-bold uppercase mb-2">Office</h4>
          <div
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: footerData.address }}
          />
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
        <div>
          <h4 className="font-bold uppercase mb-2">Links</h4>
          <ul className="space-y-2">
            {footerData.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="hover:underline text-sm text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-bold uppercase mb-2">Social Links</h4>
          <ul className="flex space-x-4">
            {footerData.social?.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400 transition"
                >
                  {getSocialIcon(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-400">
        {footerData?.copyright}
      </div>
    </footer>
  );
};

export default Footer;
