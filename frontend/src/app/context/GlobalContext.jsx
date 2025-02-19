"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { apiManager } from "@/common/apiManager";
import { toast } from "react-toastify";

const GlobalContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [], user: null });

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const setCart = (newCart) => {
    dispatch({ type: "SET_CART", payload: newCart });
  };

  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const clearUser = () => {
    dispatch({ type: "CLEAR_USER" });
  };

  const handleDecrementCart = async (productId, cartId, quantity) => {
    try {
      const data = await apiManager.post("customer/cart/remove", {
        productId: productId,
        cartId: cartId,
        quantity: quantity,
      });
      toast.success("Success!");
      fetchCart();
    } catch (error) {
      console.log("Error", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      await apiManager.post("customer/cart", {
        productId: productId,
        quantity: quantity,
      });
      toast.success("Product added to cart successfully!");
      fetchCart();
    } catch (error) {
      console.log("Error in add to cart", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchUserSession = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const data = await apiManager.get("customer/auth/session", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data?.user);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        localStorage.removeItem("token");
      }
    }
  };

  const fetchCart = async () => {
    try {
      const data = await apiManager.get("customer/cart");
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserSession();
  }, []);

  useEffect(() => {
    if (state.user) {
      fetchCart();
    }
  }, [state.user]);

  return (
    <GlobalContext.Provider
      value={{
        cart: state.cart,
        user: state.user,
        clearCart,
        fetchCart,
        setUser,
        handleAddToCart,
        handleDecrementCart,
        clearUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
