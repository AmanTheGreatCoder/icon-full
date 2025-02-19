import React from 'react'
import WebLayout from './Layout/WebLayout'
import Image from 'next/image';
import { RxArrowLeft } from "react-icons/rx";
import Link from 'next/link';

const not_found = () => {
    return (
        <WebLayout>
            <div className='sm:pt-28 pt-14 pb-14 flex items-start justify-center'>
                <div>
                    <div className='flex items-center justify-center sm:h-[220px] h-[200px] w-full font-bold text-[#2B2A29] sm:gap-x-5 gap-x-3 '>
                        <p className='sm:text-[200px] text-[100px]'>
                            4
                        </p>
                        <Image
                            src="/assets/images/fevicon-icon.png"
                            alt='icon digital'
                            height={500}
                            width={500}
                            className='sm:h-[165px] h-[120px] w-auto object-cover'
                        />
                        <p className='sm:text-[200px] text-[100px]'>
                            4
                        </p>
                    </div>
                    <p className='text-[#2B2A29] sm:text-3xl text-[20px] font-medium SF_Pro text-center'>
                        Looking like this page doesn't exit
                    </p>
                    <p className='text-[#2B2A29] sm:text-lg text-sm sm:pt-3 pt-1 SF_Pro text-center'>
                        Go back to home page and continue exploring
                    </p>
                    <div className='sm:pt-10 pt-6 flex justify-center'>
                        <Link href="/" className='bg-[#00A0E3] flex items-center gap-x-2 text-white sm:px-[44px] px-6 py-3 rounded-[14px] text-sm'>
                            <RxArrowLeft size={23} /> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </WebLayout>
    )
}

export default not_found;
