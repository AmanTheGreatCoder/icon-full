import Head from 'next/head';
import React from 'react'
import WebLayout from '../Layout/WebLayout';

const TermAndConditions = () => {
    const sections = [
        {
            title: "Welcome To The Icon Digital",
            contentOne: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
            contentTwo: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
        },
        {
            title: "Accessing This Website",
            contentOne: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
            contentTwo: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
        },
        {
            title: "Your Permitted Use of This Website",
            contentOne: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
            contentTwo: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
        },
        {
            title: "Disclaimers",
            contentOne: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
        },
        {
            title: "Links To Third-Party Websites   ",
            contentOne: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
        },
    ];
    return (
        <>
            <WebLayout>
                <div className="w-full max-w-[1200px] sm:px-0 px-4 mx-auto">
                    <h1 className="sm:text-5xl text-3xl font-bold text-center gradient-text SF_Pro sm:py-12 py-8 border-b border-[#E2E2E2]">Terms & Conditions</h1>
                    <div className="sm:pt-20 pt-12 space-y-5">
                        {sections.map((section, index) => (
                            <div key={index} className="sm:flex justify-center">
                                <div className='space-y-7'>
                                    <h2 className="text-[22px] pt-3 leading-8 col-span-1 font-semibold gradient-text">
                                        {section.title}
                                    </h2>
                                    <div className='space-y-2 max-w-[900px]'>
                                        <p className="text-[#4D4D4D] SF_Pro sm:text-base text-sm leading-relaxed">{section.contentOne}</p>
                                        <p className="text-[#4D4D4D] SF_Pro sm:text-base text-sm leading-relaxed">{section.contentTwo}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </WebLayout>
        </>
    )
}

export default TermAndConditions;
