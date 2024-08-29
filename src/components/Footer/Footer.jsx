import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-100 pt-10 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-2xl font-semibold text-green-800">Let's keep in touch!</h4>
            <h5 className="text-lg mt-2 mb-4 text-gray-600">
              Find us on any of these platforms, we respond within 1-2 business days.
            </h5>
            <div className="flex space-x-3">
              <button
                className="bg-white text-blue-500 shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-50"
                type="button"
              >
                <i className="fa-brands fa-twitter"></i>
              </button>
              <button
                className="bg-white text-blue-700 shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-50"
                type="button"
              >
                <i className="fa-brands fa-facebook"></i>
              </button>
              <button
                className="bg-white text-gray-800 shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                type="button"
              >
                <i className="fa-brands fa-github"></i>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4 mt-8 lg:mt-0">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">Useful Links</span>
                <ul className="list-none">
                  <li>
                    <a
                      className="text-gray-600 hover:text-green-800 font-semibold block pb-2 text-sm cursor-pointer"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-green-800 font-semibold block pb-2 text-sm cursor-pointer"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-green-800 font-semibold block pb-2 text-sm cursor-pointer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-green-800 font-semibold block pb-2 text-sm cursor-pointer"
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">Other Resources</span>
                <ul className="list-none">
                  <li>
                    <a
                      className="text-gray-600 hover:text-green-800 font-semibold block pb-2 text-sm cursor-pointer"
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-green-800 font-semibold block pb-2 text-sm cursor-pointer"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-green-800 font-semibold block pb-2 text-sm cursor-pointer"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-green-800 font-semibold block pb-2 text-sm cursor-pointer"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-500 font-semibold py-1">
              &copy; {currentYear} 
              <a
                href="#"
                className="text-gray-600 hover:text-green-800 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notus JS by
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-green-800 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Creative Tim
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
