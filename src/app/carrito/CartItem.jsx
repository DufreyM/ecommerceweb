"use client";

import React from "react";

export default function CartItem({ item, incrementQuantity, decrementQuantity }) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded shadow relative">
      <img
        src={item.images.small}
        alt={item.name}
        className="w-24 h-24 object-contain"
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{item.name}</h2>

        {item.discountPrice ? (
          <p className="text-sm text-green-600">
            Precio: <span className="line-through text-gray-400">${item.originalPrice.toFixed(2)}</span>{" "}
            <span className="text-green-700 font-bold">${item.discountPrice.toFixed(2)}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Precio: ${item.originalPrice.toFixed(2)}
          </p>
        )}

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => decrementQuantity(item.id)}
            className="bg-gray-300 px-2 py-1 rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => {
              if (item.quantity < 9) incrementQuantity(item.id);
            }}
            className="bg-gray-300 px-2 py-1 rounded"
          >
            +
          </button>
        </div>

        <p className="mt-2 text-sm font-medium text-right">
          Subtotal: ${item.subtotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
