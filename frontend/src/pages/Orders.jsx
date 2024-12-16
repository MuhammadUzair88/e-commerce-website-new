import React, { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  // Function to load order data
  const loadOrderData = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem);
        console.log(response.data.orders);
        setOrderData(response.data.orders || []);
      } else {
        console.error("Failed to fetch orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error while fetching orders:", error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div key={index} className="py-4 border-t border-b text-gray-700">
              {/* Order Title */}
              <p className="text-lg font-semibold mb-2">
                Order ID: {order._id}
              </p>

              {/* Loop through each product */}
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4 mb-4"
                >
                  {/* Product Image */}
                  <img
                    className="w-20 h-20 object-cover rounded-md"
                    src={item.image[0] || "https://via.placeholder.com/50"}
                    alt={item.name || "Product Image"}
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.name || "No Name"}
                    </p>
                    <p className="text-gray-500">
                      Quantity: {item.quantity || 1}
                    </p>
                    <p className="text-gray-700">
                      Price: {currency}
                      {item.price || "N/A"}
                    </p>
                  </div>

                  {/* Order Info */}
                  <div className="text-sm">
                    <p className="text-green-500 font-semibold">
                      {order.status}
                    </p>
                    <p>
                      Date:{" "}
                      <span className="text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </p>
                    <p>
                      Payment Method:{" "}
                      <span className="text-gray-600">
                        {order.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            You have no orders yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
