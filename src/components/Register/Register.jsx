import React, { useContext, useEffect, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";
export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  let { setUserLogin } = useContext(UserContext);

  async function handleRegister(formik) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formik)
      .then((response) => {
        if (response.data.message == "success") {
          navigate("/");
          setLoading(false);
          localStorage.setItem("Token", response.data.token);
          setUserLogin(response.data.token);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  }
  let yupValidation = yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[A-Z][a-z]{2,8}$/,
        "name must be uppercase and 3-8 characters long"
      )
      .required("name is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "password must be minimum eight characters, at least one letter and one number"
      )

      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "password and repassword must be same"
      )
      .required("repassword is required"),
    phone: yup
      .string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "phone is invalid")
      .required("phone is required"),
  });


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: yupValidation,
    onSubmit: handleRegister,
  });
  useEffect(() => { }, []);
  
  return <>
        <div className='py-6 max-w-xl mx-auto'>
            {error ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">{error}</div> : null}
            <h2 className='text-3xl text-green-600 font-bold mb-6'>Register Now</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input id="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your name :</label>
                </div>
                {formik.errors.name && formik.touched.name ? <div class="mb-4 text-sm text-red-800" role="alert">
                    {formik.errors.name}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="text" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email address :</label>
                </div>
                {formik.errors.email && formik.touched.email ? <div className="mb-4 text-sm text-red-800" role="alert">
                    {formik.errors.email}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone number :</label>
                </div>
                {formik.errors.phone && formik.touched.phone ? <div className="mb-4 text-sm text-red-800" role="alert">
                    {formik.errors.phone}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password :</label>
                </div>
                {formik.errors.password && formik.touched.password ? <div className="mb-4 text-sm text-red-800" role="alert">
                    {formik.errors.password}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input id="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password :</label>
                </div>
                {formik.errors.rePassword && formik.touched.rePassword ? <div className="mb-4 text-sm text-red-800" role="alert">
                    {formik.errors.rePassword}
                </div> : null}

                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}
                </button>
            </form>
        </div>


    </>
}
