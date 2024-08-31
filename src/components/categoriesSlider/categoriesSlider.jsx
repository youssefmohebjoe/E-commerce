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
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="py-5">
      <h2 className='text-green-500 text-xl ml-8 mb-2 font-semibold'>Shop popular categories :</h2>

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
