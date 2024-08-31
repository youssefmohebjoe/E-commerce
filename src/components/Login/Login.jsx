import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";
export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  let navigate = useNavigate();
  let { setUserLogin } = useContext(UserContext);
  async function handleLogin(formik) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formik)
      .then((response) => {
        if ((response.data.message = "succcess")) {
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
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "password must be minimum eight characters, at least one letter and one number"
      )
      .required("Password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yupValidation,
    onSubmit: handleLogin,
  });

  // return (
  //   <>
  //     <Helmet>
  //       <title>Login</title>
  //     </Helmet>
  //     <div className="py-6 max-w-lg mx-auto p-5 sm:p-0">
  //       {error && (
  //         <div
  //           class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
  //           role="alert"
  //         >
  //           {error}
  //         </div>
  //       )}
  //       <h2 className="text-3xl font-bold mb-6 text-green-600">Login Now</h2>
  //       <form onSubmit={formik.handleSubmit}>
  //         <div className="relative z-0 w-full mb-5 group">
  //           <input
  //             type="email"
  //             name="email"
  //             id="email"
  //             value={formik.values.email}
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
  //             placeholder=" "
  //           />
  //           <label
  //             htmlFor="email"
  //             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  //           >
  //             Enter your Email
  //           </label>

  //           {formik.errors.email && formik.touched.email && (
  //             <div
  //               class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
  //               role="alert"
  //             >
  //               {formik.errors.email}
  //             </div>
  //           )}
  //         </div>
  //         <div className="relative z-0 w-full mb-5 group">
  //           <input
  //             type="password"
  //             name="password"
  //             id="password"
  //             value={formik.values.password}
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
  //             placeholder=" "
  //           />
  //           <label
  //             htmlFor="password"
  //             className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  //           >
  //             Enter your password
  //           </label>
  //           {formik.errors.password && formik.touched.password && (
  //             <div
  //               class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
  //               role="alert"
  //             >
  //               {formik.errors.password}
  //             </div>
  //           )}
  //         </div>
  //         <div className="flex items-center flex-col sm:flex-row ">
  //           <button
  //             disabled={isLoading}
  //             type="submit"
  //             className=" disabled:bg-gray-500  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
  //           >
  //             {isLoading ? (
  //               <i class="fa-solid fa-spinner fa-spin-pulse"></i>
  //             ) : (
  //               "Submit"
  //             )}
  //           </button>
  //           <p className="pl-2">
  //             didn't have account yet?
  //             <span className="font-semibold">
  //               <Link to={"/register"}>Register now</Link>
  //             </span>
  //           </p>
  //         </div>
  //       </form>
  //     </div>
  //   </>
  // );
  return <>
        <div className='py-6 max-w-xl mx-auto'>
            {error ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">{error}</div> : null}
            <h2 className='text-3xl text-green-600 font-bold mb-6'>Sign in</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="text" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email address :</label>
                </div>
                {formik.errors.email && formik.touched.email ? <div className="mb-4 text-sm text-red-800" role="alert">
                    {formik.errors.email}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password :</label>
                </div>
                {formik.errors.password && formik.touched.password ? <div className="mb-4 text-sm text-red-800" role="alert">
                    {formik.errors.password}
                </div> : null}

                <div className='flex items-center'>
                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
                    </button>
                    <p className='pl-3'>Don't have an acount?<span className='font-semibold'><Link className='hover:underline hover:text-green-700' to={'/register'}> Register Now</Link></span></p>
                </div>
            </form>
        </div>


    </>
}
