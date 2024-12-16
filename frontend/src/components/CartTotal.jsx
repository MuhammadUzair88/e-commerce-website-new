import React from "react";
import { Link } from "react-router-dom";

const CartTotal = ({ subtotal }) => {
  return (
    <div className="flex justify-end p-8">
      <div className="w-96 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-lg font-bold text-gray-700 border-b pb-3">
          CART TOTALS
        </h2>
        <div className="mt-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-700 font-medium">${subtotal}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Shipping Fee</span>
            <span className="text-gray-700 font-medium">$10.00</span>
          </div>
          <div className="flex justify-between items-center border-t pt-3 mt-3">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">${10 + subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
