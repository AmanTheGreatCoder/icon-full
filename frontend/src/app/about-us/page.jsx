import React from 'react'
import WebLayout from '../Layout/WebLayout'
import Image from 'next/image'

const AboutUs = () => {
    const Service = [
        {
            image: "/assets/images/service-image-1.png",
            title: "Premium Quality",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
        },
        {
            image: "/assets/images/service-image-2.png",
            title: "On Time Services",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
        },
        {
            image: "/assets/images/service-image-3.png",
            title: "Support Home",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
        },
        {
            image: "/assets/images/service-image-4.png",
            title: "Part and Upgrades",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
        },
    ]

    return (
        <WebLayout>
            <div className="w-full max-w-[1200px] sm:px-0 px-4 mx-auto">
                <h1 className="sm:text-5xl text-3xl font-bold text-center gradient-text SF_Pro sm:py-12 py-8">About  Us</h1>
                <div className='md:grid hidden grid-cols-5 items-center gap-x-5'>
                    <Image
                        src="/assets/images/contact-banner-1.png"
                        alt='banner'
                        height={400}
                        width={400}
                        className='h-[322px] w-full object-cover rounded-[10px]'
                    />
                    <Image
                        src="/assets/images/contact-banner-2.png"
                        alt='banner'
                        height={400}
                        width={400}
                        className='h-[215px] w-full object-cover rounded-[10px]'
                    />
                    <Image
                        src="/assets/images/contact.png"
                        alt='banner'
                        height={400}
                        width={400}
                        className='h-[322px] w-full object-cover rounded-[10px]'
                    />
                    <Image
                        src="/assets/images/contact-banner-3.png"
                        alt='banner'
                        height={400}
                        width={400}
                        className='h-[215px] w-full object-cover rounded-[10px]'
                    />
                    <Image
                        src="/assets/images/contact-banner-4.png"
                        alt='banner'
                        height={400}
                        width={400}
                        className='h-[322px] w-full object-cover rounded-[10px]'
                    />
                </div>
                <Image
                    src="/assets/images/contact-banner-4.png"
                    alt='banner'
                    height={400}
                    width={400}
                    className='h-[322px] sm:hidden block w-full object-cover rounded-[10px]'
                />
                <div className='sm:pt-20 pt-12'>
                    <h2 className='max-w-[500px] sm:text-4xl sm:leading-10 text-2xl font-semibold SF_Pro'>We Make Sure to Your Laptop Or System Delivered Properly</h2>
                    <div className='pt-6 sm:grid grid-cols-2 gap-x-5'>
                        <p className='text-base text-[#4D4D4D]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        <p className='text-base text-[#4D4D4D]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>
                </div>
                <div className='sm:pt-24 pt-14 sm:flex items-center gap-x-14'>
                    <Image
                        src="/assets/images/insta-2.png"
                        alt='banner'
                        height={400}
                        width={400}
                        className='h-[411px] w-auto object-cover rounded-[10px]'
                    />
                    <div className='sm:pt-0 pt-8'>
                        <h3 className='sm:text-4xl text-3xl max-w-[400px] text-black font-bold'>We Empower Small Business Owers</h3>
                        <p className='text-sm max-w-[500px] pt-7 text-[#4D4D4D]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>
                </div>

                <div className='sm:pt-[130px] pt-16'>
                    <h2 className='text-[#2B2A29] font-bold sm:text-[48px] text-3xl text-center SF_Pro'>We're Here to Help You</h2>
                    <div className='sm:pt-[80px] pt-14 grid sm:grid-cols-4 grid-cols-2 sm:gap-11 gap-5'>
                        {Service.map((item, i) => (
                            <div className='' key={i}>
                                <div className='flex justify-center'>
                                    <Image
                                        src={item.image}
                                        alt='service'
                                        height={60}
                                        width={60}
                                        className='w-auto sm:h-[60px] h-10'
                                    />
                                </div>
                                <p className='sm:pt-[30px] pt-3 font-bold text-[#2B2A29] sm:text-lg_40/7 text-md_40 text-center SF_Pro'>{item.title}</p>
                                <div className='flex justify-center '>
                                    <p className='sm:pt-[17px] pt-1 text-[#2B2A29] sm:text-base_40/6 text-sm_40/5 max-w-[330px] text-center'>{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </WebLayout>
    )
}

export default AboutUs
