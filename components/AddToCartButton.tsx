"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore";
import { Products } from "@/sanity.types";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Toast } from "./ui/toast";

interface AddToCartButtonProps {
  product: Products;
  className?: string; // Optional additional classes for styling
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = "",
}) => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartItems = useCartStore((state) => state.cart);
  // const { toast } = useToast();

  // Check if the product is already in the cart
  const isInCart = cartItems.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    addItem(product);
    // toast({
    //   title: "Added to Cart",
    //   description: `${product.title} has been added to your cart.`,
    //   variant: "success",
    // });
  };

  const handleRemoveFromCart = () => {
    removeItem(product._id);
    Toast({
      title: "Removed from Cart",
      variant: "default",
    });
  };

  return (
    <button
      onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
      className={`flex items-center gap-2 ${
        isInCart
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white px-4 py-2 rounded-md transition ${className}`}
    >
      {isInCart ? <Trash2 size={18} /> : <ShoppingCart size={18} />}
      <span>{isInCart ? "Remove Cart" : "Add to Cart"}</span>
    </button>
  );
};

export default AddToCartButton;
