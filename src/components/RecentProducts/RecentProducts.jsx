import React, { useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function RecentProducts() {
  const [recentProducts, setRececntProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function getRecentProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        console.log(data.data);
        setLoading(true);
        setRececntProducts(data.data);
      });
  }
  useEffect(() => getRecentProducts(), []);
  return (
    <>
      {isLoading ? (
        <div className="row">
          {recentProducts.map((product, indx) => {
            return (
              <div key={indx} className="w-1/6 p-4">
                <Link to={`/productdetails/${product.id}`}>
                  <div className="product">
                    <img
                      className="w-full "
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="block font-light text-green-600">
                      {product.category.name}
                    </span>
                    <h3 className="mt-2 text-lg font-normal text-gray-600 mb-4">
                      {product.title.split(" ").slice(0, 2).join(" ")}
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
                    <button className="btn">Add to cart</button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">Soliman</div>
      )}
    </>
  );
}
