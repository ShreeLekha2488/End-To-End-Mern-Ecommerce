import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            Global Bazaar
          </h2>

          <p className="text-gray-300 leading-7">
            Global Bazaar is a modern e-commerce platform built using
            MongoDB, Express.js, React.js and Node.js.
            Shop your favorite products with a fast,
            secure and responsive experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">

            <li>
              <Link
                to="/"
                className="hover:text-blue-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="hover:text-blue-400"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="hover:text-blue-400"
              >
                Cart
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className="hover:text-blue-400"
              >
                Profile
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-gray-300">

            <div className="flex items-center gap-3">
              <FaEnvelope />
              <span>support@globalbazaar.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone />
              <span>+91 9876543210</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt />
              <span>Coimbatore, Tamil Nadu</span>
            </div>

          </div>

        </div>

        {/* Social Media */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-5 text-2xl">

            <a href="#">
              <FaFacebook className="hover:text-blue-500" />
            </a>

            <a href="#">
              <FaInstagram className="hover:text-pink-500" />
            </a>

            <a href="#">
              <FaLinkedin className="hover:text-blue-400" />
            </a>

            <a href="#">
              <FaGithub className="hover:text-gray-400" />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}

      <div className="border-t border-gray-700 py-5 text-center text-gray-400">

        © {new Date().getFullYear()}  Global Bazaar. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;