import React, { useEffect, useState } from "react";
import style from "./Allorders.module.css";
import axios from "axios";
export default function Allorders() {
  function getAllOrders() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders`)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
      <h1>Allorders</h1>
    </>
  );
}
