import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Added missing import for axios
import { toast } from "react-toastify"; // Added missing import for toast if using notifications

const PlaceOrder = () => {
  const { gettotalcart, price } = useContext(ShopContext);
  const navigate = useNavigate();
  const { backendUrl, token, cartItems, setCartItems, delivery_fee, products } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [method, setMethod] = useState("cod");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
    setFormErrors((errors) => ({ ...errors, [name]: undefined })); // Clear individual errors on input change
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${field} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        let orderItems = [];
        for (const items in cartItems) {
          for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
              const itemInfo = structuredClone(
                products.find((product) => product._id === items)
              );
              if (itemInfo) {
                itemInfo.size = item;
                itemInfo.quantity = cartItems[items][item];
                orderItems.push(itemInfo);
              }
            }
          }
        }
        let orderData = {
          address: formData,
          items: orderItems,
          amount: price + delivery_fee,
        };
        console.log(orderData);

        switch (method) {
          case "cod":
            const response = await axios.post(
              backendUrl + "/api/order/place",
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              console.log(response.data);
              toast.success("Order Placed");
              setCartItems({});
              navigate("/orders");
            } else {
              console.error("API Error:", response.data.error || response.data);
              toast.error(response.data.message || "Order placement failed.");
            }

            break;

          case "stripe":
            const responseStripe = await axios.post(
              backendUrl + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
            break;

          default:
            toast.error("Payment method not supported.");
            break;
        }
      } catch (error) {
        console.error("Error placing the order:", error);
        toast.error("An error occurred while placing the order.");
      }
    } else {
      console.log("Form validation failed:", formErrors);
    }
  };

  useEffect(() => {
    gettotalcart();
  }, [price, gettotalcart]); // Added gettotalcart to dependency array

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-12 pt-6 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-8 lg:px-16"
    >
      {/* Left Side: Delivery Information */}
      <div className="flex flex-col gap-6 w-full sm:w-1/2">
        <Title text1="DELIVERY" text2="INFORMATION" />
        <div className="flex flex-wrap gap-4">
          <input
            className="border border-gray-300 rounded py-2 px-4 w-full sm:w-[calc(50%-0.5rem)]"
            type="text"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            placeholder="First name"
          />
          {formErrors.firstName && (
            <span className="text-red-500 text-sm">{formErrors.firstName}</span>
          )}
          <input
            className="border border-gray-300 rounded py-2 px-4 w-full sm:w-[calc(50%-0.5rem)]"
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            placeholder="Last name"
          />
          {formErrors.lastName && (
            <span className="text-red-500 text-sm">{formErrors.lastName}</span>
          )}
        </div>
        <input
          className="border border-gray-300 rounded py-2 px-4 w-full"
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          placeholder="Email address"
        />
        {formErrors.email && (
          <span className="text-red-500 text-sm">{formErrors.email}</span>
        )}
        <input
          className="border border-gray-300 rounded py-2 px-4 w-full"
          type="text"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          placeholder="Street"
        />
        {formErrors.street && (
          <span className="text-red-500 text-sm">{formErrors.street}</span>
        )}
        <div className="flex flex-wrap gap-4">
          <input
            className="border border-gray-300 rounded py-2 px-4 w-full sm:w-[calc(50%-0.5rem)]"
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            placeholder="City"
          />
          {formErrors.city && (
            <span className="text-red-500 text-sm">{formErrors.city}</span>
          )}
          <input
            className="border border-gray-300 rounded py-2 px-4 w-full sm:w-[calc(50%-0.5rem)]"
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            placeholder="State"
          />
          {formErrors.state && (
            <span className="text-red-500 text-sm">{formErrors.state}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          <input
            className="border border-gray-300 rounded py-2 px-4 w-full sm:w-[calc(50%-0.5rem)]"
            type="text"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            placeholder="Zipcode"
          />
          {formErrors.zipcode && (
            <span className="text-red-500 text-sm">{formErrors.zipcode}</span>
          )}
          <input
            className="border border-gray-300 rounded py-2 px-4 w-full sm:w-[calc(50%-0.5rem)]"
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            placeholder="Country"
          />
          {formErrors.country && (
            <span className="text-red-500 text-sm">{formErrors.country}</span>
          )}
        </div>
        <input
          className="border border-gray-300 rounded py-2 px-4 w-full"
          type="text"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          placeholder="Phone"
        />
        {formErrors.phone && (
          <span className="text-red-500 text-sm">{formErrors.phone}</span>
        )}
      </div>

      {/* Right Side: Cart Tot


      {/* Right Side: Cart Totals and Payment Method */}
      <div className="flex flex-col w-full sm:w-1/2">
        <div className="flex flex-col gap-6">
          {/* Cart Totals */}
          <Title text1="CART" text2="TOTALS" />
          <CartTotal subtotal={price} />

          {/* Payment Method */}
          <div>
            <Title text1="PAYMENT" text2="METHOD" />
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Stripe */}
              <div
                className={`flex items-center gap-3 border rounded py-2 px-4 cursor-pointer hover:shadow-md ${
                  method === "stripe" ? "bg-green-100" : ""
                }`}
                onClick={() => setMethod("stripe")}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === "stripe"}
                  onChange={() => setMethod("stripe")}
                />
                <img
                  className="h-5"
                  src={assets.stripe_logo}
                  alt="Stripe Payment"
                />
              </div>

              {/* Razorpay */}
              <div
                className={`flex items-center gap-3 border rounded py-2 px-4 cursor-pointer hover:shadow-md ${
                  method === "razorpay" ? "bg-green-100" : ""
                }`}
                onClick={() => setMethod("razorpay")}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === "razorpay"}
                  onChange={() => setMethod("razorpay")}
                />
                <img
                  className="h-5"
                  src={assets.razorpay_logo}
                  alt="Razorpay Payment"
                />
              </div>

              {/* Cash on Delivery */}
              <div
                className={`flex items-center gap-3 border rounded py-2 px-4 cursor-pointer hover:shadow-md ${
                  method === "cod" ? "bg-green-100" : ""
                }`}
                onClick={() => setMethod("cod")}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                <span className="text-gray-700">CASH ON DELIVERY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
