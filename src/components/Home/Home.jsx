import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import { CounterContext } from "../../context/CounterContext";
import RecentProducts from "../RecentProducts/RecentProducts";
export default function Home(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {}, []);
  let { counter, handleCounter } = useContext(CounterContext);
  return (
    <>
      <RecentProducts />
    </>
  );
}
