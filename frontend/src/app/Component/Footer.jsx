"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PiCopyright } from 'react-icons/pi';

const Footer = () => {
  return (
    <div className='h-auto bg-[#F5F5F5] sm:pt-[100px] mt-20 pt-9 sm:pb-[62px] pb-7 relative'>
      <div className='w-full max-w-[1300px] mx-auto px-5'>
        {/* Top Section */}
        <div className='flex flex-col md:flex-row sm:gap-10 gap-5 md:gap-x-7'>
          {/* Logo and Description */}
          <div>
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                alt="logo image"
                height={300}
                width={300}
                className="w-auto sm:h-[50px] h-8 cursor-pointer object-cover"
                priority
              />
            </Link>
            <p className='text-[#4D4D4D] text-base font-medium max-w-[440px] sm:pt-[30px] pt-2.5'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>

          {/* Footer Links */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7'>
            {/* Account Section */}
            <div>
              <h3 className='font-bold sm:text-lg text-md text-[#2B2A29]'>My Icon Digital</h3>
              <div className='sm:pt-[25px] pt-3 text-[#4D4D4D] text-base space-y-3'>
                <Link
                  href="/profile"
                  className='cursor-pointer hover:text-[#2B2A29] transition-colors'>My Account
                </Link>
                <Link
                  href="/our-stores"
                  className="cursor-pointer block hover:text-[#2B2A29] transition-colors"
                >
                  Our Stores
                </Link>
                <Link
                  className="cursor-pointer block hover:text-[#2B2A29] transition-colors"
                  href="/profile"
                >
                  My Order Status
                </Link>
              </div>
            </div>

            {/* Support Section */}
            <div>
              <h3 className='font-bold sm:text-lg text-md text-[#2B2A29]'>Customer Support</h3>
              <div className='sm:pt-[25px] pt-3 text-[#4D4D4D] text-base space-y-3'>
                <Link
                  href="about-us"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>About Us
                </Link>
                <Link
                  href="contact-us"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Contact Us
                </Link>
                <Link
                  href="/privacy-policy"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Privacy Policy
                </Link>
                <Link
                  href="shipping-policy"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Shipping Policy</Link>
                <Link
                  href="return-policy"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Return Policy</Link>
                <Link
                  href="cancellation"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Cancellation Policy</Link>
                <Link
                  href="terms-conditions"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Terms & Conditions</Link>
              </div>
            </div>

            {/* Our Company Section */}
            {/* <div>
              <h3 className='font-bold sm:text-lg text-md text-[#2B2A29]'>Our Company</h3>
              <div className='sm:pt-[25px] pt-3 text-[#4D4D4D] text-base space-y-3'>
                <p className='cursor-pointer hover:text-[#2B2A29] transition-colors'>Who We Are</p>
                <p className='cursor-pointer hover:text-[#2B2A29] transition-colors'>Careers</p>
                <p className='cursor-pointer hover:text-[#2B2A29] transition-colors'>Trial Software Downloads</p>
                <p className='cursor-pointer hover:text-[#2B2A29] transition-colors'>Customer Stories</p>
              </div>
            </div> */}

            {/* Connect With Us Section */}
            <div>
              <h3 className='font-bold sm:text-lg text-md text-[#2B2A29]'>Shop For Products</h3>
              <div className='sm:pt-[25px] pt-3 text-[#4D4D4D] text-base space-y-3'>
                <Link
                  href="/product/laptop"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Laptop
                </Link>
                <Link
                  href="/product/desktop"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Desktop
                </Link>
                <Link
                  href="/product/all-in-one"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>All In One
                </Link>
                <Link
                  href="/product/monitor"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Monitors
                </Link>
                <Link
                  href="/product/printer"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Printer
                </Link>
                <Link
                  href="/product/pre-build-pc"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'> Pre-Build PC
                </Link>
                <Link
                  href="/product/accessories-and-software"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'> Accessories & Software
                </Link>
                <Link
                  href="/customize-product"
                  className='cursor-pointer block hover:text-[#2B2A29] transition-colors'>Customize Product
                </Link>
              </div>
            </div>

            {/* Connect With Us Section */}
            <div>
              <h3 className='font-bold sm:text-lg text-md text-[#2B2A29]'>Contact With Us</h3>
              <div className='sm:pt-[25px] pt-3 space-y-3'>
                <div>
                  <h3 className='font-semibold text-black'>H/O Contact Number</h3>
                  <p className='text-[#4D4D4D] text-base pt-1.5'>tg :- +91 85954 23549</p>
                </div>
                <Link
                  href="/our-stores"
                  className='cursor-pointer block text-[#4D4D4D] text-base hover:text-[#2B2A29] transition-colors'>Branches
                </Link>
                <div>
                  <h3 className='font-semibold text-black'>Time</h3>
                  <p className='text-[#4D4D4D] text-base pt-1.5'>Mon - Sun</p>
                  <p className='text-[#4D4D4D] text-base'>10:00AM - 8:30PM </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='sm:pt-8 pt-8'>
          <div className='flex flex-wrap sm:justify-center md:justify-start text-[14px]
           sm:gap-x-10 gap-x-8 sm:gap-y-0 gap-y-2 text-center md:text-left'>
            <Link
              href="/terms-conditions"
              className='cursor-pointer hover:underline'>Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className='cursor-pointer hover:underline'>Privacy Policy
            </Link>
          </div>
          <p className='hover:underline pt-3 flex items-center gap-x-1 text-[14px]'>
            <PiCopyright />  Copyrights 2025 Icondigital.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
