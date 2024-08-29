import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import LoadingScreen from "../Loading/Loading";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setLoading(true);
      });
  }
  useEffect(() => {
    getCategories();
  });
  let settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
  };
  return (
    <>
      <div className="py-5">
        <h2 className="py-4 text-gray-900 font-light text-xl">
          Shop popular Categories
        </h2>
        <Slider {...settings}>
          {categories.map((category, index) => {
            return (
              <div key={index}>
                <img
                  className="w-full h-[200px]"
                  src={category.image}
                  alt={category.name}
                />
                <h2 className="font-light mt-2">{category.name}</h2>
              </div>
            );
          })}
        </Slider>
      </div>

    </>
  );
}
