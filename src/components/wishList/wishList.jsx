import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../Loading/Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

function WishlistProduct({ product, productRemove }) {
  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div className="p-4 mb-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-700">Price: ${product.price}</p>
        <button
          onClick={() => productRemove(product._id)}
          className="mt-2 text-red-500 hover:text-red-700"
        >
          Remove from wishlist
        </button>
      </div>
    </>
  );
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
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
            token: localStorage.getItem("tkn"),
          },
        }
      );
      if (data && Array.isArray(data.data)) {
        setWishlist(data.data);
      } else {
        console.error("Unexpected data format:", data);
        toast.error("Unexpected data format received");
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  async function productRemove(productId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      getUserWishlist();
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
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex flex-col">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">
            Favourites
          </h1>
          <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
            {wishlist.length} items
          </p>
          <div className="grid grid-cols-4 gap-3 rounded-lg">
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
