import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you have this import for toastify styles
import { Link } from "react-router-dom";
import LoadingScreen from "../Loading/Loading";
import { cartContext } from "../../context/CartContext";
import ProductDetails from "./../productDetails/productDetails";

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  let { AddProductToCart } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUserWishlist();
  }, []);

  async function getUserWishlist() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      // Check if data and data.wishlist exist and is an array
      if (data && Array.isArray(data.data)) {
        setWishlist(data.data);
      } else {
        console.error("Unexpected data format:", data);
        setWishlist([]); // Set empty array on unexpected data format
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
    }
    setIsLoading(false);
  }

  async function productRemove(productId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      // After removing a product, refetch the wishlist
      getUserWishlist();
      toast.success("Product removed from wishlist successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to remove product from wishlist", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex flex-col">
          <div className="flex flex-col justify-start items-start">
            <div>
              {/* <p className="text-sm leading-4 text-gray-600 dark:text-white">
                Home
              </p> */}
            </div>
            <div className="mt-3">
              <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">
                Favourites
              </h1>
            </div>
            <div className="mt-4">
              <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
                {wishlist.length} items
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3 rounded-lg">
              {wishlist.map((product) => (
                <div key={product.id} className="flex flex-col">
                  <div className="relative">
                    <Link to={"/productDetails/" + product._id}>
                      <img
                        className=" rounded-lg hidden lg:block"
                        src={product.imageCover}
                        alt={product.name}
                      />
                    </Link>
                    <button
                      aria-label="remove"
                      className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 text-white hover:text-gray-400"
                      onClick={() => productRemove(product.id)}
                    >
                      <svg
                        className="fill-current"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 1L1 13"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 1L13 13"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-1 flex justify-between items-center ">
                    <div className="flex justify-center items-center">
                      <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">
                        {product.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start mt-0">
                    <div>
                      <p className=" tracking-tight text-xs leading-3 text-gray-800 dark:text-white">
                        {product.code}
                      </p>
                    </div>
                    <div className="mt-1">
                      <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
                        {product.color}
                      </p>
                    </div>
                    <div className="mt-1">
                      <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
                        {product.name}
                      </p>
                    </div>
                    <div className="mt-1">
                      <p className="  flex justify-start  tracking-tight font-bold  text-lg leading-4 text-gray-800 dark:text-white">
                        {" "}
                        Price : ${product.price}
                      </p>
                    </div>
                    <div className="flex justify-between flex-col lg:flex-row items-center mt-4  space-y-1 lg:space-y-0 lg:space-x-1 xl:space-x-8">
                      <div className="w-full">
                        <Link to={"/productDetails/" + product._id}>
                          <button className=" rounded-lg focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 dark:text-white text-gray-800 w-full tracking-tight py-2 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 dark:text-white bg-white border border-gray-800 dark:bg-transparent dark:border-white dark:hover:bg-gray-800 dark:hover:text-white">
                            More information
                          </button>
                        </Link>
                      </div>
                      <div className="w-full">
                        <button
                          className=" rounded-lg focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                          onClick={() => AddProductToCart(product._id)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
