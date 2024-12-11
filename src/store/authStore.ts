/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { client } from "@/utils/sanityClient";
import { blockToHtml, processOrder } from "@/utils/helper";

import { supabase } from "../utils/supabase";

import axios from "axios";
import toast from "react-hot-toast";

interface AuthStore {
  user: any;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  message: string | null;
  userToken: any;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<string | void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;

  categories: any[];
  getAllCategories: () => Promise<void>;

  categoryProducts: any[];
  getCategoryDetailsWithId: (categoryId: string | undefined) => Promise<any>;
  categoryTitle: string;

  allProducts: any[];
  getAllProducts: () => Promise<void>;
  getSingleProduct: (productId: string | undefined) => Promise<any>;

  getBanners: () => Promise<any>;

  getOtherData: () => Promise<void>;
  otherData: any[];

  getPrivacyData: () => Promise<void>;
  privacyData: any[];

  aboutCard: any[];
  getAboutCard: () => Promise<void>;

  getLogo: () => Promise<any>;

  getUserOtherData: (userId: string) => Promise<any>;
  updateUserData: (userId: string, newData: any) => Promise<void>;
  newUserAddress: (userId: string, address: any) => Promise<any>;
  getUserDataFromSanity: (userId: string) => Promise<any>;
  deleteAddressAndUpdateUser: (addressId: string) => Promise<string>;

  handleBuyNow: (productDetails: any) => Promise<void>;

  applyCoupon: (couponCode: string) => Promise<any>;

  fetchOrderDetails: (orderId: string) => Promise<any>;

  getBasicInfo: () => Promise<any>;
}

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
  categoryTitle: "",
  otherData: [],
  privacyData: [],
  aboutCard: [],

  getLogo: async () => {
    set({ isLoading: true, error: null });
    try {
      const getLogoQuery = `*[_type == "logo"] {
  image {
    asset->{
      _id,
      url
    },
    hotspot
  }
} `;

      const response = await client.fetch(getLogoQuery);

      set({ isLoading: false });

      return response[0].image.asset;
    } catch (error: any) {
      set({ isLoading: false, error: error.message || "Error fetching Logo" });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error }: { data: any; error: any } =
        await supabase.auth.getUser();

      if (error || !data.user) {
        set({
          isCheckingAuth: false,
          isAuthenticated: false,
          isLoading: false,
        });
        console.log("No authenticated user found.");
        return "No authenticated user found.";
      }

      set({
        user: data.user,
        isAuthenticated: true,
        userToken: data.session?.access_token || null,
        isCheckingAuth: false,
        isLoading: false,
      });
      console.log("Authenticated user:", data.user);
    } catch (error: any) {
      set({
        isCheckingAuth: false,
        isAuthenticated: false,
        isLoading: false,
        error: error.message || "Error checking authentication.",
      });
      throw error;
    }
  },

  signup: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      // 1. Sign up the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // 2. Once the user is signed up, we get the userId from Supabase
      const userId = data?.user?.id;

      // 3. Check if the user already exists in Sanity
      const existingUserQuery = `*[_type == "users" && userId == $userId][0]`;
      const existingUser = await client.fetch(existingUserQuery, { userId });

      if (existingUser) {
        console.log("User already exists in Sanity");
        set({
          isLoading: false,
          user: data.user,
          isAuthenticated: true,
          userToken: data.session?.access_token || null,
          error: null,
        });
        return existingUser; // If the user already exists, return the existing user data
      }

      // 4. If the user doesn't exist in Sanity, create a new user document in Sanity
      const newUserDoc = {
        _type: "users",
        userId: userId,
        username: username,
        email: email, // Storing email as well
      };

      const createdUser = await client.create(newUserDoc); // Create new user in Sanity
      console.log("New user created in Sanity:", createdUser);

      // 5. Set the state after successful sign-up
      set({
        isLoading: false,
        user: data.user,
        isAuthenticated: true,
        userToken: data.session?.access_token || null,
        error: null,
      });

      return createdUser; // Return the created user object
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error signing up",
      });
      throw error; // Rethrow or handle error as necessary
    }
  },

  signin: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      set({
        user: data.user,
        isAuthenticated: true,
        userToken: data.session?.access_token || null,
        isLoading: false,
        error: null,
      });

      console.log("Sign-in successful:", data.user);
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error signing in",
      });
      throw error;
    }
  },

  signout: async () => {
    set({ isLoading: true, error: null });

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
      set({
        user: null,
        isAuthenticated: false,
        userToken: null,
        isLoading: false,
        error: null,
      });

      console.log("Sign-out successful.");
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error signing out.",
      });
      throw error;
    }
  },

  getAllCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const getAllCategoryQuery = `*[_type == "category"]{
  _id,
  title,
  image{
    asset->{
      _id,
      url
    }
  }
}`;
      const response = await client.fetch(getAllCategoryQuery);

      set({ categories: response, isLoading: false });
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
      // const response = await axios.get(`${BASE_URL}/products?populate=*`);
      // set({ isLoading: false, allProducts: response.data.data });

      const getAllProductsQuery = `*[_type == "product"]{
        _id,
        title,
        description,
        is_launched,
        launch_date,
        SKU,
        images[]{
          asset->{
            _id,
            url
          }
        },
        actual_price,
        discount,
        discount_price,
        tags,
        colors[]{
          hex
        },
        sizes,
        category->{
          _id,
          title,
          image{
            asset->{
              _id,
              url
            }
          }
        }
      }`;

      const response = await client.fetch(getAllProductsQuery);
      // console.log("aLL pRODUCTS:", response);

      set({ isLoading: false, allProducts: response });
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
      const getProductByIdQuery = `*[_type == "product" && _id == $productId]{
        _id,
        title,
        description,
        is_launched,
        launch_date,
        SKU,
        images[]{
          asset->{
            _id,
            url
          }
        },
        actual_price,
        discount,
        discount_price,
        tags,
        colors[]{
          hex
        },
        sizes,
        category->{
          _id,
          title,
          image{
            asset->{
              _id,
              url
            }
          }
        }
      }[0]`;

      const response = await client.fetch(getProductByIdQuery, { productId });

      set({ isLoading: false });
      return response;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error Fetching Single Product",
      });
      throw error;
    }
  },

  getCategoryDetailsWithId: async (categoryId) => {
    set({ isLoading: true, error: null });
    try {
      const getCategoryWithProductsQuery = `*[_type == "category" && _id == $categoryId]{
        _id,
        title,
      }[0]`;

      const response = await client.fetch(getCategoryWithProductsQuery, {
        categoryId,
      });

      const getRelatedProductsQuery = `
      *[_type == "product" && category._ref == $categoryId] {
      ...,
      images[]{..., asset->}
    }`;
      const getRelatedProducts = await client.fetch(getRelatedProductsQuery, {
        categoryId,
      });

      set({
        isLoading: false,
        categoryTitle: response.title,
        categoryProducts: getRelatedProducts,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error Fetching Single Products",
        isLoading: false,
      });
      throw error;
    }
  },

  getBanners: async () => {
    set({ isLoading: true, error: null });
    try {
      const homeBannerQuery = `*[_type == "homeBanner"]{_id,
  images[]{
    asset->{
      _id,
      url
    }
  }
}`;
      const homeBanner = await client.fetch(homeBannerQuery);

      return homeBanner[0].images;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error fetching Home Banner",
      });
      throw error;
    }
  },

  getOtherData: async () => {
    set({ isLoading: true, error: null });
    try {
      const otherDataQuery = `
      *[_type == "terms"]{
      title,
      content[]{
        ...,
        _type == "image" => {
          "imageUrl": asset->url,
          alt
        }
      }
    }`;

      const otherData = await client.fetch(otherDataQuery);
      const html = await blockToHtml(otherData);
      console.log("otherdata", otherData);

      set({ isLoading: false, otherData: html });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error fetching Other Data",
      });
      throw error;
    }
  },

  getPrivacyData: async () => {
    set({ isLoading: true, error: null });
    try {
      const privacyDataQuery = `
      *[_type == "privacy"] {
  title,
  content[]{
    ...,
    _type == "image" => {
      ...,
      "alt": alt
    }
  }
}`;

      const privacyData = await client.fetch(privacyDataQuery);
      const html = await blockToHtml(privacyData);

      // console.log("privacy Data", privacyData);
      set({
        isLoading: false,
        privacyData: html,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error fetching privacy data",
      });

      throw error;
    }
  },

  getAboutCard: async () => {
    set({ isLoading: true, error: null });
    try {
      const getAboutCardQuery = `*[_type == "aboutcard"]{
      _id,
      name,
      quote,
      "imageUrl": image.asset->url
    }`;
      const response = await client.fetch(getAboutCardQuery);
      console.log("response", response);
      set({ isLoading: false, aboutCard: response });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error fetching about card",
      });

      throw error;
    }
  },

  getBasicInfo: async () => {
    set({ isLoading: false, error: null });
    try {
      const query = `
      *[_type == "basicInfo"]{
  address,
  email,
  phone
}
      `;

      const response = await client.fetch(query);

      set({ isLoading: false });
      return response;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error fethching basic details",
      });
      throw error;
    }
  },

  getUserOtherData: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const getOtherUserDataQuery = `
*[_type == "user"]{
  userId,
  _id,
  name,
  profile{
    asset->{
      _id,
      url
    }
  },
  phone,
  shippingAddress{
    street,
    city,
    state,
    zipCode,
    country
  }
}
`;
      const getOtherUserData = await client.fetch(getOtherUserDataQuery, {
        userId,
      });

      set({ isLoading: false });

      return getOtherUserData;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error fetching other user data",
      });
      throw error;
    }
  },

  newUserAddress: async () => {
    set({ isLoading: true, error: null });
  },

  deleteAddressAndUpdateUser: async (addressId) => {
    set({ isLoading: true, error: null, message: null });
    try {
      // Fetch users that have the deleted address reference
      const users = await client.fetch(
        `*[_type == "users" && references(*[_type == "address" && _id == $addressId]._id)]`,
        { addressId }
      );
      console.log("Users to update:", users);

      // Remove the reference to the deleted address from each user's addresses array
      for (const user of users) {
        const updatedAddresses = user.addresses.filter(
          (address: any) => address._ref !== addressId
        );

        // Update the user document
        await client
          .patch(user._id)
          .set({ addresses: updatedAddresses })
          .commit()
          .then((updatedUser) => console.log("Updated User:", updatedUser));
      }

      // Deleting the address document using the correct addressId
      const deleteResponse = await client.delete(addressId);
      console.log("Deleted Address Response:", deleteResponse);

      set({ isLoading: false });
      return "Success";
    } catch (error: any) {
      console.error("Error during delete and update:", error);
      set({
        isLoading: false,
        error: error.message || "Error Deleting address",
      });
      throw error;
    }
  },

  getUserDataFromSanity: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const query = `
      *[_type == "users" && userId == $userId]{
  _id,
  userId,
  username,
  email,
  profile,
  addresses[]->{
    _id,
    username,
    address1, 
    address2,
    phone,
    street,
    city,
    state,
    zipCode,
    country
  },
  usedCoupons[]-> {
  _id,
  couponCode,
  discountType,
  discountValue,
  singleUsePerCustomer,
  
couponDescription,
isActive
  },
  orderDetails[]-> {
  
  _id,
  orderId,
  totalPaidPrice,
  orderProducts[]->{
  _id,
name, image, size, color, quantity,productId
  },
  shippingAddress[]->{
  _id,
  username, 
  phone, 
  address1, 
  address2, street,
  city, state, zipCode, country
  },
  orderStatus
  
  }
}

      `;

      const response = await client.fetch(query, { userId });
      set({ isLoading: false });
      return response;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error fetching user data from sanity",
      });
      throw error;
    }
  },

  updateUserData: async (userId, newData) => {
    set({ isLoading: true, error: null });
    try {
      console.log("new Data", newData);

      const response = await client.patch(userId).set(newData).commit();
      console.log("update User", response);
    } catch (error: any) {
      set({ isLoading: false, error: error.message || "Error Updating User" });
      throw error;
    }
  },

  handleBuyNow: async (productDetails) => {
    set({ isLoading: true, error: null });
    try {
      const { product, userInfo, total, appliedCoupon, shippingAddress } =
        productDetails;
      const finalData = {
        totalPrice: total,
        productName:
          product.length == 1 ? "Single Product" : "Multiple Products",
        firstName: shippingAddress.username,
        email: userInfo.email,
      };

      // console.log("final", finalData);

      const response = await axios.post(
        "https://payu-payment-gateway.onrender.com/api/create-payu-order",
        {
          price: finalData?.totalPrice,
          productName: finalData?.productName,
          email: finalData?.email,
          firstName: finalData?.firstName,
          product: product,
          user: userInfo,
          shippingAddress,
          appliedCoupon,
        }
      );
      if (response.data.paymentData && response.data.payUrl) {
        // console.log("sdsdsfsf", response.data);
        console.log("reponse data", response.data.paymentData);

        await processOrder(response.data);
      } else {
        toast.error("Error initiating payment. Please try again.");
      }

      set({ isLoading: false });
      // console.log("Payment", response.data);
    } catch (error: any) {
      set({ isLoading: false, error: error.message || "Error Buying Product" });
      throw error;
    }
  },

  fetchOrderDetails: async (orderId) => {
    set({ isLoading: true, error: null });
    try {
      const fetchOrderQuery = `
      *[_type == "order" && orderId == $orderId]{
    orderId,
    transactionId,
    totalPaidPrice,
    orderProducts[]->{
      productId,
      name,
      size,
      color,
      quantity
    },
    email,
    phone,
    fullName,
    address1,
    address2,
    city,
    state,
    country,
    zipcode,
    orderStatus
  }
      `;

      const orderDetails = await client.fetch(fetchOrderQuery, { orderId });
      console.log("order response", orderDetails);
      set({ isLoading: false });
      return orderDetails;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error fetching order Details",
      });

      throw error;
    }
  },

  // createOrderProduct: async (paymentData: any) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const orderProductIds = [];
  //     for (const product of paymentData.products) {
  //       // Create orderProduct entry for each product
  //       const orderProduct = await createDocument("orderProduct", {
  //         productId: product.productId,
  //         name: product.name,
  //         size: product.size,
  //         color: product.color,
  //         quantity: product.quantity,
  //       });
  //       orderProductIds.push(orderProduct._id);
  //     }
  //     return orderProductIds;
  //   } catch (error: any) {
  //     set({
  //       isLoading: false,
  //       error: error.message || "error creating order product",
  //     });

  //     throw error;
  //   }
  // },

  applyCoupon: async (couponCode) => {
    set({ isLoading: true, error: null });
    try {
      const checkCouponquery = `
      *[_type == "coupon" && couponCode == $couponCode && isActive == true][0]
      `;

      const response = await client.fetch(checkCouponquery, { couponCode });

      set({ isLoading: false });

      return response;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Error checking coupon",
      });
      throw error;
    }
  },
}));
