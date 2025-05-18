
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-primary mb-4">Mango Groove</h3>
            <p className="text-gray-600 mb-4">
              Premium quality mangoes delivered straight to your door. Fresh,
              juicy, and bursting with flavor.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
                  Our Mangoes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h4>
            <address className="text-gray-600 not-italic">
              <p>123 Fruit Street</p>
              <p>Mango City, MC 12345</p>
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: hello@mangogroove.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Mango Groove Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
