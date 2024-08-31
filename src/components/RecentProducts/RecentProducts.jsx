import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { cartContext } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import { useWishlist } from "../../context/wishlistContext";

export default function RecentProducts() {
  let { addProductToCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [currentWishlistId, setCurrentWishlistId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(false);
  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, error, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: getRecent,
    staleTime: 0,
    gcTime: 3000,
    select: (data) => data.data.data,
  });

  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response.data.status === "success") {
      toast.success('Product added to cart');
      setLoading(false);
    } else {
      toast.error(response.data.message);
    }
  }

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /////
  const { addToWishlist } = useWishlist();
  async function handleAddToWishlist(productId) {
    setWishlistLoading(true);
    setCurrentWishlistId(productId);
    if (addToWishlist) {
      const resFlag = await addToWishlist(productId);
      if (resFlag) {
        toast.success("Product added to wishlist");
        setWishlistLoading(false);
      } else {
        toast.error("Error adding product to wishlist");
        setWishlistLoading(false);
      }
    }
  }
  return (
    <>

      <h2 className="text-center text-gray-600 mt-4 font-semibold text-3xl">
        All Products
      </h2>
      <div class="relative m-4 w-3/4 mx-auto">
        <input
          type="text"
          placeholder=""
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="floating_filled"
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
        />
        <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Search for the product</label>
      </div>
      {/* <div className="m-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div> */}

      {!isLoading ? (
        <div className="row">
          {filteredProducts.map((product, indx) => {
            return (
              <div
                key={indx}
                className="main w-full sm:w-1/3 md:w-1/4 lg:w-1/6 p-4"
              >
                <div className="product">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      className="w-full"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="block font-light text-gray-600">
                      {product.category.name}
                    </span>
                    <h3 className="mt-2 text-lg font-normal text-gray-600 mb-4">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">
                        {product.price} EGP
                      </span>
                      <span>
                        <i className="fa-solid fa-star text-[#FFD43B]"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    disabled={
                      wishlistLoading && currentWishlistId == product.id
                    }
                    onClick={() => handleAddToWishlist(product._id)}
                    className="disabled:bg-gray-400 mt-2 p-2 rounded-lg bg-red-500  text-black hover:bg-red-500 w-full"
                  >
                    {wishlistLoading && currentWishlistId == product.id ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      "Add to Wishlist"
                    )}
                  </button>
                  <button
                    disabled={currentProductId === product.id && loading}
                    className="btn showHide disabled:bg-gray-400"
                    onClick={() => addProduct(product.id)}
                  >
                    {currentProductId === product.id && loading ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      "Add to cart"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingScreen />
        </div>
      )}
    </>
  );
}
