import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import style from "./Navbar.module.css";
import { UserContext } from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";

export default function Navbar() {
  const [numOfItems, setNumOfItems] = useState();
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { getLogedUserCart, addProductToCart } = useContext(cartContext);

  async function numOfCart() {
    let { data } = await getLogedUserCart();
    setNumOfItems(data.numOfCartItems);
    console.log(numOfItems);
  }

  useEffect(() => {
    numOfCart();
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-gray-100 static lg:fixed top-0 right-0 left-0 z-50">
        <div className="container mx-auto py-1 flex-col lg:flex-row flex justify-between items-center">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <NavLink className="flex mx-2" to="">
              <img src={logo} alt="logo" width="110px" />
              {userLogin ? (
                <ul className="lg:flex flex-row items-center hidden lg:visible">
                  <li className="py-2">
                    <NavLink
                      className=" font-normal mx-2 text-slate-900 text-lg "
                      to=""
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="cart"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="wishlist"
                    >
                      WishList
                    </NavLink>
                  </li>
                </ul>
              ) : null}
            </NavLink>
            <button
              className="lg:hidden text-2xl p-2"
              onClick={toggleMobileMenu}
            >
              &#9776; {/* Unicode character for hamburger menu */}
            </button>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:flex flex-col lg:flex-row items-center w-full lg:w-auto`}
          >
            <ul className="flex flex-col items-center lg:hidden ">
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to=""
                >
                  Home
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to="cart"
                >
                  Cart
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to="products"
                >
                  Products
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to="brands"
                >
                  Brands
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to="categories"
                >
                  Categories
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-normal mx-2 text-slate-900 text-lg"
                  to="wishlist"
                >
                  WishList
                </NavLink>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row items-center mt-4 lg:mt-0">
              {userLogin ? (
                ""
              ) : (
                <li className="py-2">
                  <NavLink
                    className="font-light mx-2 text-slate-900 text-lg"
                    to="login"
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {userLogin ? (
                ""
              ) : (
                <li className="py-2">
                  <NavLink
                    className="font-light mx-2 text-slate-900 text-lg"
                    to="register"
                  >
                    Register
                  </NavLink>
                </li>
              )}
              {userLogin ? (
                <>
                  <Link to={"/cart"}>
                    {" "}
                    <li className="py-2">
                      <i className="fa-solid fa-cart-shopping text-green-600 fa-xl relative">
                        <p className="text-white text-[14px] absolute top-[-3px] right-[25%]">
                          {numOfItems}
                        </p>
                      </i>
                    </li>
                  </Link>

                  <li className="py-2 cursor-pointer" onClick={logOut}>
                    <span className="font-light mx-2 text-slate-900 text-lg ">
                      Log out
                    </span>
                  </li>
                </>
              ) : (
                " "
              )}
              <li className="flex items-center py-2 cursor-pointer">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
