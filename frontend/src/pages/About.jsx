import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      {/* About Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8 p-6 lg:p-16 bg-gray-50">
        {/* Left Section: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={assets.about_img} // Replace this URL with the actual image source
            alt="Fashion items"
            className="rounded-md shadow-md"
          />
        </div>

        {/* Right Section: Text */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            ABOUT <span className="text-blue-500">US</span>
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Since our inception, we’ve worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We’re dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-12 px-6 lg:px-16">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-10">
          WHY <span className="text-blue-500">CHOOSE US</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quality Assurance */}
          <div className="text-center border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
            <p className="text-gray-700">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>

          {/* Convenience */}
          <div className="text-center border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Convenience</h3>
            <p className="text-gray-700">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>

          {/* Exceptional Customer Service */}
          <div className="text-center border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Exceptional Customer Service
            </h3>
            <p className="text-gray-700">
              Our team of dedicated professionals is here to assist you,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold">
            Subscribe now & get 20% off
          </h3>
          <p className="text-gray-700 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="mt-4 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-md px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-black text-white rounded-r-md hover:bg-gray-800 transition duration-150">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
