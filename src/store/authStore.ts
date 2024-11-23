/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";

interface AuthStore {
  user: any;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  message: string | null;
  userToken: string | null;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<string | void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;

  categories: any[];
  getAllCategories: () => Promise<void>;
  getCategoryProducts: (
    categoryKey: string,
    categoryValue: string
  ) => Promise<void>;
  categoryProducts: any[];

  allProducts: any[];
  getAllProducts: () => Promise<void>;
  getSingleProduct: (productId: string | undefined) => Promise<any>;
}

const BASE_URL = "http://localhost:1337/api";

export const authStore = create<AuthStore>((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  message: null,
  userToken: null,
  isCheckingAuth: true,
  categories: [],
  allProducts: [],
  categoryProducts: [],

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        set({
          isCheckingAuth: false,
          isAuthenticated: false,
          isLoading: false,
        });
        return "No Token in Local Storage";
      }

      const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({
        user: response.data,
        isAuthenticated: true,
        isCheckingAuth: false,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isCheckingAuth: false,
        isAuthenticated: false,
        isLoading: false,
        error:
          error.response?.data?.message || "Failed to verify authentication.",
      });
    }
  },

  signup: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("jbdjgfdbjg", {
        username,
        email,
        password,
      });

      const { user, jwt } = response.data;
      localStorage.setItem("jwt", jwt);
      set({
        isLoading: false,
        user: user,
        isAuthenticated: true,
        userToken: jwt,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error Registering User",
      });
      throw error;
    }
  },

  signin: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/auth/local`, {
        identifier: email,
        password,
      });
      const { user, jwt } = response.data;
      localStorage.setItem("jwt", jwt);

      set({
        user: user,
        isAuthenticated: true,
        userToken: jwt,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to sign in. Please try again.",
        isLoading: false,
      });
    }
  },

  getAllCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/categories"
      );

      set({ categories: response.data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error Fetching Categories",
      });
    }
  },

  getAllProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );

      set({ isLoading: false, allProducts: response.data });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error fetching All Products",
      });
      throw error;
    }
  },

  getSingleProduct: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error Fetching Single Product",
      });
      throw error;
    }
  },

  getCategoryProducts: async (categoryKey, categoryValue) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?${categoryKey}=${categoryValue}`
      );

      set({ isLoading: false, categoryProducts: response.data });
    } catch (error: any) {
      set({
        error: error.message || "Error Fetching Category Products",
        isLoading: false,
      });
      throw error;
    }
  },

  signout: () => {
    localStorage.removeItem("jwt");
    set({
      user: null,
      userToken: null,
      isAuthenticated: false,
    });
  },
}));
