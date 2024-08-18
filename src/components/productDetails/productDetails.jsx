import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import LoadingScreen from "../Loading/Loading";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [productDetails, setProductDetaisl] = useState();
  const [relatedProduct, setRelatedProductl] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetaisl(data.data);
        setLoading(true);
      });
  }
  function getRelatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data?.data;
        let sameProducts = allProducts?.filter(
          (product) => product?.category.name === category
        );
        setRelatedProductl(sameProducts);
        setLoading(true);
      });
  }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProduct(category);
  }, [id]);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  let settings2 = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
  };
  return (
    <>
      {isLoading ? (
        <div className="row">
          <div className="w-1/4">
            <Slider {...settings}>
              {productDetails?.images?.map((image) => {
                return (
                  <div>
                    <img src={image} alt={productDetails?.title} />
                  </div>
                );
              })}
            </Slider>
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
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingScreen />
        </div>
      )}
      <div className="row">
        <div className="w-full  p-4">
          <Slider {...settings2}>
            {relatedProduct.map((product, index) => {
              return (
                <Link
                  className="px-2"
                  key={index}
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
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
              );
            })}
          </Slider>
        </div>
      </div>
      {/* {isLoading ? (
        <div className="row">
          <div className="w-full  p-4">
            <Slider {...settings2}>
              {relatedProduct.map((product, index) => {
                return (
                  <Link
                    key={index}
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
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
                );
              })}
            </Slider>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingScreen />
        </div>
      )} */}
    </>
  );
}
