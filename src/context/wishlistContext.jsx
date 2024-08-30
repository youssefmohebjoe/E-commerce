import axios from "axios";

import { FallingLines } from "react-loader-spinner";
import SimpleSlider from "../HomeSlider/HomeSlider";
import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/blog-img-2.jpeg";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import SearchBar from "../Searchbar/Searchbar";

import { useWishlist } from "../../Context/WishlistContext";
import LoadingScreen from "../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Products() {
  const { addProduct } = useContext(CartContext);
  const { addToWishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState("");

  async function handleAddToCart(productId) {
    const resFlag = await addProduct(productId);
    if (resFlag) {
      toast.success("Product added to cart successfully");
    } else {
      toast.error("Error adding product to cart");
    }
  }

  async function handleAddToWishlist(productId) {
    if (addToWishlist) {
      const resFlag = await addToWishlist(productId);
      if (resFlag) {
        toast.success("Product added to wishlist successfully");
      } else {
        toast.error("Error adding product to wishlist");
      }
    } else {
      console.error("addToWishlist function is not defined in WishlistContext");
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: "allProducts",
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isError) {
    return <h2>Error fetching products</h2>;
  }

  if (isLoading) {
    return <LoadindScreen />;
  }

  const filteredProducts = data.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>wishlist</title>
      </Helmet>
      <div className="container w-[90%] mx-auto pt-10">
        <div className="flex flex-col md:flex-row md:space-x-6 items-start pt-5">
          <div className="w-full md:w-[70%] flex justify-center">
            <SimpleSlider />
          </div>
          <div className="w-full md:w-[30%] flex flex-col space-y-4 pt-10">
            <img
              src={img1}
              className="w-full h-40 object-cover rounded-lg shadow-lg"
              alt="Thumbnail 1"
            />
            <img
              src={img2}
              className="w-full h-40 object-cover rounded-lg shadow-lg"
              alt="Thumbnail 2"
            />
          </div>
        </div>

        <CategoriesSlider />
        <div className="pt-10">
          <SearchBar onSearch={setSearchTerm} />
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 pt-5">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product p-2">
              <div className="relative overflow-hidden group">
                <div
                  onClick={() => handleAddToCart(product._id)}
                  className="cursor-pointer group-hover:translate-x-0 transition-[500ms] p-2 rounded-xl bg-green-400 absolute top-2 end-2 translate-x-[200%]"
                >
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
                <Link to={`/productDetails/${product._id}`}>
                  <img
                    src={product.imageCover}
                    className="w-full"
                    alt={product.title}
                  />
                  <h6 className="text-cyan-400">{product.category.name}</h6>
                  <h2>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                  <div className="flex justify-between items-center">
                    <p>
                      <span
                        className={
                          product.priceAfterDiscount
                            ? "line-through text-purple-500"
                            : ""
                        }
                      >
                        {product.price}
                      </span>
                      <span className="ml-1">
                        {" "}
                        {product.priceAfterDiscount}
                      </span>
                    </p>
                    <p>
                      <i className="fa-solid fa-star text-blue-400"></i>{" "}
                      {product.ratingsAverage}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => handleAddToWishlist(product._id)}
                  className="mt-2 p-2 rounded-lg bg-pink-400 text-white hover:bg-pink-500"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
