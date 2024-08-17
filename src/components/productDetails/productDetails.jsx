import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetaisl] = useState();
  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetaisl(data.data);
        console.log(productDetails);
      });
  }
  useEffect(() => {
    getProductDetails(id);
  }, []);
  return (
    <>
      <div className="row">
        <div className="w-1/4">
          <img src={productDetails?.imageCover} alt={productDetails?.title} />
        </div>
        <div className="w-3/4 p-6">
          <h1 className="text-lg text-gray-950 font-normal">
            {productDetails?.title}
          </h1>
          <p className="text-gray-600 font-light mt-4">
            {productDetails?.description}
          </p>
          <div className="flex justify-between my-4">
            <span className="text-gray-500 text-sm">
              {productDetails?.price} EGP
            </span>
            <span>
              <i className="fa-solid fa-star text-[#FFD43B]"></i>
              {productDetails?.ratingsAverage}
            </span>
          </div>
          <button className="btn">Add to cart</button>
        </div>
      </div>
    </>
  );
}
