import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si"; // NEW X icon (formerly Twitter)

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-5">
        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/libraries" className="hover:text-white">
                Libraries
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-white">
                Books
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Contact Us</h2>
          <p className="mb-2">📞 +880 1234-567890</p>
          <p className="mb-2">📧 support@bookcourier.com</p>
          <p className="">📍 Dhaka, Bangladesh</p>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Follow Us</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-white">
              <SiX /> {/* New X logo */}
            </a>
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} BookCourier — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
