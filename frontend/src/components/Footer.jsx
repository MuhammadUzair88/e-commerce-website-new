import React from "react";

const Footer = () => {
  return (
    <footer className=" py-10 ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-bold mb-4">Company</h2>
          <p className="text-gray-400">
            Delivering exceptional products and services to our customers with a
            commitment to excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-gray-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-300">
                Services
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-300">
                Careers
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-lg font-bold mb-4">Resources</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-gray-300">
                Blog
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-300">
                FAQs
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-300">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h2 className="text-lg font-bold mb-4">Stay Connected</h2>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter to receive updates and special offers.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        <p>© 2024 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
