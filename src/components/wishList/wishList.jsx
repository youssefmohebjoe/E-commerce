import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../Loading/Loading";
import { toast } from "react-toastify";

function WishlistProduct({ product, productRemove }) {
  return (
    <div className=" p-3 mb-4 border rounded-lg shadow-md w-[50%] sm:w-1/3 md:w-1/4 lg:w-1/4">
      <img src={product.imageCover} alt={product.title} className="w-full" />
      <h2 className="text-xl font-semibold">
        {product.title.split(" ").slice(0, 2).join(" ")}
      </h2>
      <p className="text-gray-700">Price: ${product.price}</p>
      <button
        onClick={() => productRemove(product._id)}
        className="mt-2 text-green-500 hover:text-green-700"
      >
        Remove from wishlist
      </button>
    </div>
  );
}

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      if (data && Array.isArray(data.data)) {
        setWishlist(data.data);
      } else {
        toast.error("Unexpected data format received");
        setWishlist([]);
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  async function productRemove(productId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      getWishList();
      toast.success("Product removed from wishlist successfully");
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex flex-col ">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">
            Favourites
          </h1>
          <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
            {wishlist.length} items
          </p>
          <div className="flex flex-wrap gap-x-2 mt-4 w-full justify-center">
            {wishlist.map((product) => (
              <WishlistProduct
                key={product._id}
                product={product}
                productRemove={productRemove}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
