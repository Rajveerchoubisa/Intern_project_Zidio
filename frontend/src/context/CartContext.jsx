import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("zidio_cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("zidio_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    console.log("Adding product to cart:", product); // Debug

    if (!product?._id) {
      console.error("Product missing _id:", product);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        console.log("Product exists, increasing quantity");
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      console.log("New product, adding to cart");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const incrementQty = (_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQty = (_id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === _id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQty,
        decrementQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
