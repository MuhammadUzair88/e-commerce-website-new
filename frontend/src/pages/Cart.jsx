import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updatecart, gettotalcart, price } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const productData = products.find((product) => product._id === items);
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
    gettotalcart();
  }, [cartItems, products, price]);

  return (
    <div className="border-t pt-14 bg-gray-100 min-h-screen px-4 sm:px-8 lg:px-16">
      {/* Page Title */}
      <div className="text-3xl font-bold mb-6 text-gray-800">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            Your cart is empty!
          </p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            if (!productData) return null; // Prevent the render if product data is missing
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white shadow-md rounded-lg p-4 border"
              >
                {/* Product Details */}
                <div className="flex items-start gap-6 sm:gap-8">
                  <img
                    className="w-16 sm:w-20 object-cover rounded-md"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-gray-700">
                      <p className="font-medium">
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-3 py-1 border bg-slate-50 rounded-lg text-sm">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity Input */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <input
                    className="border rounded px-3 py-1 w-16 text-center focus:outline-none focus:ring focus:ring-indigo-200"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(e) =>
                      e.target.value === 0 || e.target.value === ""
                        ? null
                        : updatecart(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                  />
                  {/* Remove Button */}
                  <img
                    onClick={() => updatecart(item._id, item.size, 0)}
                    className="w-5 h-5 cursor-pointer text-gray-400 hover:text-red-500 transition"
                    src={assets.bin_icon}
                    alt="Remove Item"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Total Section */}
      <div className="mt-8 sm:mt-12">
        <CartTotal subtotal={price} />
        <div className="flex justify-center mt-6">
          <Link to="/place-order">
            <button className="bg-black text-white font-medium py-3 px-12 rounded-lg hover:bg-gray-800 transition duration-300">
              Proceed To Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
