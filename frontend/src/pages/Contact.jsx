import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 md:px-20 md:py-16 bg-white">
      {/* Left Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={assets.contact_img} // Replace this URL with your image
          alt="Desk setup"
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Right Text Section */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          CONTACT <span className="text-blue-500">US</span>
        </h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Our Store</h3>
          <p className="text-gray-600 mt-2">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className="text-gray-600 mt-2">Tel: (415) 555-0132</p>
          <p className="text-gray-600 mt-2">Email: admin@forever.com</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Careers at Forever
          </h3>
          <p className="text-gray-600 mt-2">
            Learn more about our teams and job openings.
          </p>
          <button className="mt-4 px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
