"use client"
import React, { useState } from 'react'
import WebLayout from '../Layout/WebLayout';
import Image from 'next/image';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        company: "",
        subject: "",
        question: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.firstname) newErrors.firstname = "First Name is required";
        if (!formData.lastname) newErrors.lastname = "Last Name is required";
        if (!formData.number) newErrors.number = "Phone number is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.question.trim()) newErrors.question = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Form submitted successfully!");
            // Handle form submission logic here
        }
    };
    return (
        <>
            <WebLayout>
                <div className="w-full max-w-[1200px] sm:px-0 px-4 mx-auto">
                    <h1 className="sm:text-5xl text-3xl font-bold text-center gradient-text SF_Pro sm:py-12 py-8 border-b border-[#E2E2E2]">Contact Us</h1>
                    <div className="sm:pt-20 pt-12 sm:grid gap-x-10 grid-cols-2">
                        <Image
                            src="/assets/images/contact.png"
                            alt='contact image'
                            height={600}
                            width={600}
                            className='sm:h-full h-[400px] rounded-lg sm:w-auto w-full object-cover'
                        />
                        <form onSubmit={handleSubmit} className="sm:space-y-6 space-y-5 sm:pt-0 pt-5">
                            <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 items-center'>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        First Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full py-2 rounded-md border ${errors.firstname ? "border-red-500" : "border-gray-300"
                                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                                    />
                                    {errors.firstname && (
                                        <p className="text-sm text-red-500 mt-1">{errors.firstname}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Last Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full py-2 rounded-md border ${errors.lastname ? "border-red-500" : "border-gray-300"
                                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                                    />
                                    {errors.lastname && (
                                        <p className="text-sm text-red-500 mt-1">{errors.lastname}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone Number<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                                />
                                {errors.number && (
                                    <p className="text-sm text-red-500 mt-1">{errors.number}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Message<span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="question"
                                    value={formData.question}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md h-40 border ${errors.question ? "border-red-500" : "border-gray-300"
                                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                                />
                                {errors.question && (
                                    <p className="text-sm text-red-500 mt-1">{errors.question}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="sm:w-[300px] w-full button-linear-gradient text-white rounded-lg py-2 px-4 "
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </WebLayout>
        </>
    )
}

export default ContactUs;
