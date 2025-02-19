'use client';
import React, { useEffect, useState } from 'react';
import WebLayout from '@/app/Layout/WebLayout';
import Image from 'next/image';
import { PiShoppingCart, PiStar, PiStarFill } from 'react-icons/pi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useRouter } from 'next/navigation';
import { apiManager } from '@/common/apiManager';
import Link from 'next/link';

const Home = () => {
	const [products, setProducts] = useState([]);
	console.log(products, "product");

	const router = useRouter();

	const Processor = [
		'/assets/images/Processor-1.png',
		'/assets/images/Processor-2.png',
		'/assets/images/Processor-3.png',
		'/assets/images/Processor-4.png',
		'/assets/images/Processor-5.png',
		'/assets/images/Processor-6.png',
		'/assets/images/Processor-6.png',
		'/assets/images/Processor-6.png',
	];
	const Brands1 = [
		'/assets/images/brand-image-1.png',
		'/assets/images/brand-image-2.png',
		'/assets/images/brand-image-3.png',
	];
	const Brands2 = [
		'/assets/images/brand-image-4.png',
		'/assets/images/brand-image-5.png',
		'/assets/images/brand-image-6.png',
		'/assets/images/brand-image-7.png',
	];

	const Price = [
		'/assets/images/price.png',
		'/assets/images/price.png',
		'/assets/images/price.png',
		'/assets/images/price.png',
	];

	const Use = [
		{
			image: '/assets/images/use-image-1.png',
			name: 'Creator',
		},
		{
			image: '/assets/images/use-image-2.png',
			name: 'Gaming',
		},
		{
			image: '/assets/images/use-image-3.png',
			name: 'Home use',
		},
		{
			image: '/assets/images/use-image-4.png',
			name: 'Student',
		},
		{
			image: '/assets/images/use-image-5.png',
			name: 'Business',
		},
	];

	const Scroll_Image = [
		'/assets/images/scroll-image-1.png',
		'/assets/images/scroll-image-2.png',
		'/assets/images/scroll-image-3.png',
		'/assets/images/scroll-image-4.png',
		'/assets/images/scroll-image-5.png',
		'/assets/images/scroll-image-6.png',
		'/assets/images/scroll-image-7.png',
		'/assets/images/scroll-image-1.png',
		'/assets/images/scroll-image-2.png',
		'/assets/images/scroll-image-3.png',
		'/assets/images/scroll-image-4.png',
		'/assets/images/scroll-image-5.png',
		'/assets/images/scroll-image-6.png',
		'/assets/images/scroll-image-7.png',
	];

	const Service = [
		{
			image: '/assets/images/service-image-1.png',
			title: 'Premium Quality',
			content:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
		},
		{
			image: '/assets/images/service-image-2.png',
			title: 'On Time Services',
			content:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
		},
		{
			image: '/assets/images/service-image-3.png',
			title: 'Support Home',
			content:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
		},
		{
			image: '/assets/images/service-image-4.png',
			title: 'Part and Upgrades',
			content:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
		},
	];

	const Customer = [
		{
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
			image: "/assets/images/customer-image.png",
			name: "Tushar Patel"
		},
		{
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
			image: "/assets/images/customer-image.png",
			name: "Tushar Patel"
		},
		{
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
			image: "/assets/images/customer-image.png",
			name: "Tushar Patel"
		},
		{
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
			image: "/assets/images/customer-image.png",
			name: "Tushar Patel"
		},
		{
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
			image: "/assets/images/customer-image.png",
			name: "Tushar Patel"
		},
		{
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
			image: "/assets/images/customer-image.png",
			name: "Tushar Patel"
		},
	]

	const insta_image = [
		'/assets/images/insta-2.png',
		'/assets/images/insta-1.png',
		'/assets/images/insta-2.png',
		'/assets/images/insta-1.png',
		'/assets/images/insta-2.png',
		'/assets/images/insta-1.png',
		'/assets/images/insta-2.png',
		'/assets/images/insta-1.png',
		'/assets/images/insta-2.png',
		'/assets/images/insta-1.png',
		'/assets/images/insta-2.png',
		'/assets/images/insta-1.png',
	];

	const banner = [
		"/assets/images/banner.png",
		"/assets/images/banner-slider.png"
	]

	const fetchLaptops = () => {
		apiManager
			.post(`customer/product`, {
				type: 'LAPTOP',
				search: {},
			})
			.then((data) => {
				setProducts(data);
			})
			.catch((error) => {
				console.error('Error fetching laptops:', error);
			});
	};

	useEffect(() => {
		fetchLaptops();
	}, []);

	return (
		<WebLayout>
			<div className='overflow-hidden'>
				<div className='banner-slider'>
					<Swiper
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={20}
						slidesPerView={1}
						pagination={{ clickable: true }}
						autoplay={{ delay: 3000 }}
						breakpoints={{
							640: { slidesPerView: 1 },
							768: { slidesPerView: 1 },
							1024: { slidesPerView: 1 },
						}}
					>
						{banner.map((item, index) => (
							<SwiperSlide key={index}>
								<Image
									src={item}
									alt={`Banner image ${index + 1}`}
									height={800}
									width={1950}
									className="sm:h-auto object-cover h-[500px] w-auto"
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				{/* About Block  */}
				<div className='grid sm:grid-cols-2 grid-cols-1 gap-x-[60px] overflow-hidden items-center relative'>
					<Image
						src="/assets/images/about-image.png"
						alt='About image'
						height={650}
						width={960}
						className='sm:w-[960px] sm:h-[600px]  sm:block hidden h-auto w-auto object-cover'
					/>
					<div className='sm:px-0 px-4 sm:pt-0 pt-10'>
						<h2 className='sm:text-[48px] text-3xl font-bold text-[#2B2A29] SF_Pro'>About Icon Digital</h2>
						<p className='text-[#2B2A29] sm:pt-6 pt-2 max-w-[618px] font-medium sm:text-base_40/6 text-sm_40/5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
						<button className='sm:px-9 px-6 sm:py-[15px] py-3 button-linear-gradient text-base_40/5 font-medium text-white rounded-full sm:mt-5 mt-4 Outfit'>Read More</button>
					</div>
					<Image
						src="/assets/images/about-image.png"
						alt='About image'
						height={650}
						width={960}
						className='sm:w-[960px] sm:hidden block sm:pt-0 pt-8 sm:h-[600px] h-auto w-auto object-cover'
					/>
					<Image
						src="/assets/images/about-bg-image.png"
						alt='About background'
						height={270}
						width={210}
						className='object-cover absolute sm:block hidden -bottom-8 right-36'
					/>
				</div>

				{/* Shop By Processor */}
				<div className="bg-[url('/assets/images/Processor-bg-image.png')] sm:h-[677px] h-auto w-auto bg-cover">
					<div className='w-full max-w-[1200px] sm:px-0 px-4 mx-auto'>
						<div className='sm:pt-[84px] pt-14'>
							<h2 className='text-[#2B2A29] font-bold sm:text-[48px] text-3xl text-center SF_Pro'>Shop By Processor</h2>
						</div>
						<div className='flex justify-center sm:pt-[60px] pt-12'>
							<div className='grid sm:grid-cols-4 grid-cols-3 items-center flex-wrap sm:gap-x-16 gap-x-5 sm:gap-y-14 gap-y-7'>
								{Processor.map((item, i) => (
									<Image
										src={item}
										alt={item}
										height={200}
										width={200}
										onClick={() => router.push('/product/laptop')}
										className="object-cover cursor-pointer w-auto sm:h-[188px] h-[100px] transform transition-transform duration-300 hover:scale-110"
										key={i}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Shop By Brands */}
				<div className="bg-[url('/assets/images/Shop-By-Brands.png')] sm:h-[600px] h-auto w-auto bg-cover">
					<div className='w-full max-w-[1200px] mx-auto'>
						<div className='sm:pt-[55px] pt-14'>
							<h2 className='text-[#2B2A29] font-bold SF_Pro sm:text-[48px] text-3xl text-center'>Shop By Brands</h2>
						</div>
						<div className='flex justify-center pt-[60px]'>
							<div className='grid sm:gap-y-11 gap-y-7 sm:px-0 px-4'>
								<div className='flex justify-center items-center flex-wrap sm:gap-x-16 gap-x-4 sm:gap-y-14 gap-y-7'>
									{Brands1.map((item, i) => (
										<Image
											src={item}
											alt="brand-image"
											height={200}
											width={200}
											onClick={() => router.push('/laptop')}
											className='object-cover transform transition-transform duration-300 hover:scale-110 cursor-pointer w-auto sm:h-[188px] h-[100px]'
											key={i}
										/>
									))}
								</div>
								<div className='sm:grid flex justify-center sm:grid-cols-4 grid-cols-2 items-center flex-wrap sm:gap-x-16 gap-x-4 sm:gap-y-14 gap-y-7'>
									{Brands2.map((item, i) => (
										<Image
											src={item}
											alt="brand-image"
											height={200}
											onClick={() => router.push('/laptop')}
											width={200}
											className='object-cover transform transition-transform duration-300 hover:scale-110 cursor-pointer  w-auto sm:h-[188px] h-[100px]'
											key={i}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>


				{/* Price and Use */}
				<div className="relative">
					<Image
						src="/assets/images/price-bg-image.png"
						alt=""
						height={800}
						width={500}
						className='absolute -z-10 top-12 left-0 sm:h-[750px] h-auto w-auto'
					/>
					<div className='w-full max-w-[1200px] sm:px-0 px-4 mx-auto sm:pt-[74px] pt-14'>
						<h2 className='text-[#2B2A29] font-bold  sm:text-[48px] text-3xl  text-center SF_Pro'>Shop By Price</h2>
						<div className='sm:pt-[60px] pt-14 flex justify-center'>
							<div className='grid sm:grid-cols-4 grid-cols-2 sm:gap-x-[55px] gap-x-7 sm:gap-y-0 gap-y-5'>
								{Price.map((item, i) => (
									<Image
										src={item}
										alt="price-image"
										height={110}
										width={300}
										onClick={() => router.push('/product/laptop')}
										className='object-cover cursor-pointer'
										key={i}
									/>
								))}
							</div>
						</div>
						<div className='sm:pt-[140px] pt-16'>
							<h2 className='text-[#2B2A29] font-bold  sm:text-[48px] text-3xl text-center SF_Pro'>Shop By Use</h2>
							<div className='sm:pt-[78px] pt-14 sm:grid sm:grid-cols-5 flex justify-center flex-wrap sm:gap-[80px] gap-10'>
								{Use.map((item, i) => (
									<div className='relative z-10' key={i}
										onClick={() => router.push('/product/laptop')}
									>
										<Image
											src="/assets/images/Polygon.png"
											alt=""
											height={234}
											width={234}
											className='object-cover w-auto sm:h-[150px] h-[125px] cursor-pointer'
										/>
										<Image
											src={item.image}
											alt=""
											height={150}
											width={150}
											className='object-cover transform transition-transform duration-300 hover:scale-110 w-auto sm:h-[160px] h-[130px] cursor-pointer absolute -top-1 left-3  '
										/>
										<p className='text-center pt-6'>
											{item.name}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Best seller  */}
				<div className='sm:pt-[140px] pt-10'>
					<div className="bg-linear-gradient  sm:px-0 px-4 sm:h-[641px] h-auto relative">
						<Image
							src="/assets/images/best-saller-bg-image.png"
							alt='Best Seller background'
							height={650}
							width={1000}
							className='w-auto bg-cover sm:h-[641px] h-auto absolute sm:top-0 bottom-0 left-0'
						/>
						<div className='w-full BEST_SALLER z-30 max-w-[1200px] relative mx-auto sm:py-[130px] py-10 sm:grid grid-cols-5 gap-x-[83px]'>
							<div className='sm:block flex sm:justify-between justify-center sm:w-auto w-full col-span-1 items-center'>
								<div>
									<p className='text-white font-bold border-b border-white sm:text-4xl text-2xl inline-block SF_Pro'>Best Seller</p>
									<p className='sm:pt-5 pt-2.5 sm:text-left text-center text-white text-xl_40/7 SF_Pro'>New Arrivals</p>
								</div>
								<button className='px-9 py-[15px] sm:block hidden bg-white text-[#14519E] sm:text-base_40/5 text-sm font-medium rounded-full sm:mt-[220px]'>Read More</button>
							</div>
							<div className='col-span-4 sm:pt-0 pt-10'>
								<Swiper
									modules={[Navigation, Pagination, Autoplay]}
									spaceBetween={20}
									slidesPerView={1}
									pagination={{ clickable: true }}
									autoplay={{ delay: 3000 }}
									breakpoints={{
										640: { slidesPerView: 1 },
										768: { slidesPerView: 2 },
										1024: { slidesPerView: 3 },
									}}
									className='pt-7'
								>
									{products.map((item, i) => (
										<SwiperSlide key={i}>
											<div className='h-auto relative cursor-pointer w-auto group bg-white rounded-[20px] pr-3.5 pt-[57px] pl-[23px] pb-7'>
												<div className='flex justify-center'>
													<Image
														src={item.image}
														alt='Similar Product'
														height={200}
														width={300}
														className='w-auto h-[170px] group-hover:scale-110 transform transition-transform duration-300'
													/>
												</div>
												<div className='flex items-end justify-between'>
													<div>
														<p className='pt-[22px] text-[#2B2A29] text-lg_40/6 font-bold SF_Pro'>
															{item.name}
														</p>
														<p className='pt-[2px] text-[#2B2A29] text-sm_40/5'>
															Processor {item.Processor}
														</p>
														<p className='pt-4 text-xl_36 text-[#2B2A29] font-bold'>
															₹ {item.price}
														</p>
													</div>
													<div className='button-linear-gradient absolute bottom-3 right-3 text-white h-[50px] w-[52px] rounded-full flex justify-center items-center'>
														<PiShoppingCart size={24} />
													</div>
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
								<div className='flex justify-center sm:hidden'>
									<button className='sm:px-9 px-6 sm:mt-[240px] mt-8 sm:py-[15px] py-3 bg-white text-[#14519E] sm:text-base_40/5 text-sm font-medium rounded-full'>Read More</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* scroll image */}
				<div className="sm:pt-[130px] pt-14">
					<div className="w-full max-w-[1200px] mx-auto overflow-hidden relative">
						<div className="flex gap-x-14 marquee">
							{Scroll_Image.map((item, i) => (
								<Image
									src={item}
									alt="Best Seller"
									height={90}
									width={250}
									className="w-auto h-[56px] cursor-pointer"
									key={i}
								/>
							))}
						</div>
					</div>
				</div>

				{/* service block */}
				<div className='sm:pt-[130px] pt-16'>
					<div className='w-full max-w-[1200px] sm:px-0 px-4 mx-auto'>
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

				{/* Customer block */}
				<div className='sm:pt-[130px] pt-16'>
					<div className='w-full max-w-[1200px] sm:px-0 px-4 mx-auto'>
						<h2 className='text-[#2B2A29] font-bold sm:text-[48px] text-3xl text-center SF_Pro'>What Customer Say</h2>
						<div className='sm:pt-10 blue-slider-button pt-12 gap-5'>
							<Swiper
								modules={[Navigation, Pagination, Autoplay]}
								spaceBetween={20}
								slidesPerView={1}
								pagination={{ clickable: true }}
								autoplay={{ delay: 3000 }}
								breakpoints={{
									640: { slidesPerView: 1 },
									768: { slidesPerView: 2 },
									1024: { slidesPerView: 4 },
								}}
							>
								{Customer.map((item, i) => (
									<SwiperSlide key={i}>
										<div className='border border-[#D7D7D7] rounded-[20px] sm:pt-5 py-4 px-5' key={i}>
											<div className='text-[#FDCE15] flex gap-x-[5px]'>
												<PiStarFill size={24} />
												<PiStarFill size={24} />
												<PiStarFill size={24} />
												<PiStarFill size={24} />
												<PiStarFill size={24} />
											</div>
											<p className='sm:pt-6 pt-6 text-base_40/6 text-[#4D4D4D] '>{item.content}</p>
											<div className='flex items-center gap-x-[15px] sm:pt-8 pt-6'>
												<Image
													src={item.image}
													alt='Customer image'
													height={60}
													width={60}
													className='w-auto h-[50px] cursor-pointer object-cover'
												/>
												<p className='font-bold text-lg_40/6 text-[#2B2A29] cursor-pointer SF_Pro'>{item.name}</p>
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>

				{/* Instagram block  */}
				<div className='sm:pt-[113px] pt-10'>
					<div className='grid sm:gap-y-[80px] gap-y-[220px] overflow-hidden relative'>
						<div className='flex marquee'>
							{insta_image.map((item, i) => (
								<Image
									src={item}
									alt='Insta image'
									height={300}
									width={330}
									className='w-auto h-[300px] cursor-pointer object-cover'
									key={i}
								/>
							))}
						</div>
						<div className='flex marquee_One'>
							{insta_image.map((item, i) => (
								<Image
									src={item}
									alt='Insta image'
									height={300}
									width={330}
									className='w-auto h-[300px] cursor-pointer object-cover'
									key={i}
								/>
							))}
						</div>

						<div className='absolute w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
							<div className='sm:h-[400px] sm:w-[688px] h-[250px] w-auto relative'>
								<div className='sm:h-[50%] h-[70%] pt-5 pl-7 pr-5 bg-white'>
									<div className='flex justify-end items-center gap-x-[25px]'>
										<Link
											target='_blank'
											href="https://www.instagram.com/icon_digital_itstore/">
											<Image
												src="/assets/images/instagram.png"
												alt='social image'
												height={40}
												width={40}
												className='w-auto sm:h-10 h-6 cursor-pointer object-cover'
											/>
										</Link>
										<Image
											src="/assets/images/whatsapp.png"
											alt='social image'
											height={40}
											width={40}
											className='w-auto sm:h-10 h-6 cursor-pointer object-cover'
										/>
									</div>
									<div className='flex items-center gap-x-6 sm:pt-0 pt-5'>
										<div className='sm:h-[80px] h-14 w-14 sm:w-[80px] flex justify-center items-center rounded-full border border-[#D7D7D7]'>
											<Image
												src="/assets/images/logo.png"
												alt='logo image'
												height={100}
												width={100}
												className='w-[auto] sm:h-[20px] h-4  cursor-pointer object-cover'
											/>
										</div>
										<div className='flex items-center gap-x-5'>
											<div className='sm:text-sm text-xs font-extrabold text-[#2B2A29] text-center tracking-[1px]'>
												<p>77</p>
												<p>posts</p>
											</div>
											<div className='sm:text-sm text-xs font-extrabold text-[#2B2A29] text-center tracking-[1px]'>
												<p>6,392</p>
												<p>followers</p>
											</div>
											<div className='sm:text-sm text-xs font-extrabold text-[#2B2A29] text-center tracking-[1px]'>
												<p>44</p>
												<p>following</p>
											</div>
										</div>
									</div>
									<div className='flex items-center gap-3 sm:pl-4 pt-5'>
										<h3 className='gradient-text text-base font-bold'>Ph No.</h3>
										<p className='text-[#2B2A29] text-base font-medium SF_Pro'>+91 99798 53648</p>
									</div>
								</div>
								<div className='bg-linear-gradient sm:h-[50%] h-[30%] flex justify-center items-center'>
									<Image
										src="/assets/images/white-logo.png"
										alt='logo image'
										height={300}
										width={300}
										className='w-[auto] sm:h-[86px] h-10 cursor-pointer object-cover'
									/>
								</div>
								<Image
									src="/assets/images/insta-bg.png"
									alt='logo image'
									height={300}
									width={300}
									className='w-[auto] h-[184px] sm:block hidden right-8 absolute top-[108px]'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</WebLayout>
	);
};

export default Home;
