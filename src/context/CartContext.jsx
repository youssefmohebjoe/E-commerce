import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  // let headers = localStorage.getItem("userToken");
  function getLogedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  return (
    <cartContext.Provider
      value={{ getLogedUserCart, headers, addProductToCart }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
