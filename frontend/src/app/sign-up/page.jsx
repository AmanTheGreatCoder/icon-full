'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { apiManager } from '@/common/apiManager';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../context/GlobalContext';

const SignUp = () => {
	const router = useRouter();
	const { setUser } = useGlobal();
	const [showPassword, setShowPassword] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await apiManager.post('customer/auth/register', {
				firstName,
				lastName,
				email,
				password,
			});
			toast.success('Account created successfully!');
			setUser(data?.user);
			localStorage.setItem('token', data?.tokens?.accessToken);
			router.push('/');
		} catch (error) {
			toast.error('Error creating account. Please try again.');
		}
	};

	return (
		<>
			<div className='w-full max-w-[1300px] sm:pb-9 pb-7 mx-auto sm:px-0 px-4 pt-14'>
				<Link href='/'>
					<Image
						src='/assets/images/logo.png'
						alt='logo image'
						height={70}
						width={150}
						className='cursor-pointer sm:h-[50px] h-9 w-auto'
					/>
				</Link>
				<div className='h-auto flex  justify-center mt-7'>
					<div className='bg-white shadow-[0px_4px_10px_0px_#2323231A] border border-[#E9E9E9] rounded-2xl sm:px-12 px-3 w-full max-w-[590px] p-8'>
						<h1 className='text-3xl SF_Pro font-bold mb-1 text-gray-800'>
							Create an account
						</h1>
						<p className='text-[#2B2A29] text-sm mb-6'>
							Enter your account details.
						</p>

						<form className='space-y-4' onSubmit={handleSubmit}>
							<div className='grid sm:grid-cols-2 grid-cols-1 gap-y-4 sm:space-x-4'>
								<div className='flex-1'>
									<label className='block text-sm font-medium text-[#2B2A29]'>
										First Name
									</label>
									<input
										type='text'
										placeholder='Enter Your First Name'
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
									/>
								</div>
								<div className='flex-1'>
									<label className='block text-sm font-medium text-[#2B2A29]'>
										Last Name
									</label>
									<input
										type='text'
										placeholder='Enter Your Last Name'
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-[#2B2A29]'>
									Email
								</label>
								<input
									type='email'
									placeholder='Enter Your Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-[#2B2A29]'>
									Enter your password
								</label>
								<div className='mt-1 relative'>
									<input
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter your password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
									/>
									<button
										type='button'
										onClick={() => setShowPassword((prev) => !prev)}
										className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none'
									>
										{showPassword ? (
											<span>
												<PiEyeSlash size={20} />
											</span>
										) : (
											<span>
												<PiEye size={20} />
											</span>
										)}
									</button>
								</div>

								<div className='flex items-center mt-3'>
									<input
										id='remember-me'
										type='checkbox'
										className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
									/>
									<label
										htmlFor='remember-me'
										className='ml-2 block text-sm text-gray-900'
									>
										Remember me
									</label>
								</div>
							</div>

							<div className='pt-5'>
								<button
									type='submit'
									className='w-full bg-[#00A0E3] text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2'
								>
									Sign Up
								</button>
							</div>
						</form>

						<div className='my-4 flex items-center'>
							<hr className='flex-grow border-gray-300' />
							<span className='mx-4 text-gray-500'>or</span>
							<hr className='flex-grow border-gray-300' />
						</div>

						<div className='flex space-x-4'>
							<button className='w-1/2 flex gap-x-1.5 items-center justify-center py-2 border border-gray-300 rounded-xl hover:bg-gray-50'>
								<Image
									src='/assets/images/google.png'
									alt='google'
									className='h-6 w-6 mr-2'
									height={30}
									width={30}
								/>
								Google
							</button>
							<button className='w-1/2 flex gap-x-1.5 items-center justify-center py-2 border border-gray-300 rounded-xl hover:bg-gray-50'>
								<Image
									src='/assets/images/facebook.png'
									alt='google'
									className='h-6 w-6 mr-2'
									height={30}
									width={30}
								/>
								Facebook
							</button>
						</div>

						<p className='text-center text-sm text-gray-500 mt-3'>
							Already have an account?{' '}
							<Link href='#' className='text-[#2B2A29] hover:underline'>
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
