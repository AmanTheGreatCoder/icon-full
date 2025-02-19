"use client"
import React, { Fragment, useEffect, useState } from 'react'
import Header from '@/app/Component/Header'
import Footer from '@/app/Component/Footer'
import Image from 'next/image'


const WebLayout = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <Header />
      <div>
        {children}
      </div>
      <Footer />

      {/* timmer signup page */}
      <div className="flex items-center justify-center bg-gray-100">
        {isModalVisible && (
          <div className="fixed inset-0 flex sm:items-center items-end justify-center bg-black bg-opacity-50 z-50">
            <div className='sm:grid grid-cols-2'>
              <Image
                src="/assets/images/contact-timer-image.jpg"
                alt='login image'
                height={600}
                width={600}
                className='sm:h-[600px] sm:block hidden w-full object-cover'
              />
              <div className="bg-white shadow-lg w-full max-w-lg relative sm:pb-0 pb-8">
                <button
                  onClick={() => setModalVisible(false)}
                  className="absolute top-2 right-4 text-white text-3xl font-bold"
                >
                  &times;
                </button>
                <h2 className="sm:text-3xl text-xl font-semibold sm:p-6 p-3 bg-[#0A79C1] text-black">
                  Sign up to our newsletter!
                </h2>
                <p className="text-black sm:px-6 sm:py-4 p-3 bg-[#00A0E3] mb-4">
                  Enjoy exclusive offers, and be the first to know about promotions
                  and new product launches.
                </p>
                <form className='sm:p-6 p-3'>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        className="mt-1 block outline-none w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        className="mt-1 block outline-none w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block outline-none w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="products"
                      className="block text-sm font-medium text-gray-700"
                    >
                      I'm interested in products for...
                    </label>
                    <select
                      id="products"
                      className="mt-1 block w-full outline-none p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="personal">Personal Use</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="whatsapp"
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="whatsapp"
                      className="ml-2 text-sm text-gray-600"
                    >
                      I would also like to receive promotional messages on WhatsApp
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-auto button-linear-gradient text-white py-2 px-4 rounded-lg"
                  >
                    Sign up Now
                  </button>
                  <p className="mt-4 text-xs text-gray-600">
                    By signing up, you agree to the terms of{" "}
                    <a href="#" className="text-[#0A79C1] underline">
                      HP's Privacy Statement
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

    </Fragment>
  )
}

export default WebLayout