import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../components/Loader';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LocalStorage } from '../hooks/LocalStorage';
import getError from '../hooks/getError';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import logo from './../assets/Stem.png';
const Login = () => {
	const { user, setUser } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate('/dashboard');
		}
	}, [user, navigate]);
	const [isLoading, setIsLoading] = useState();
	const [showPassword, setShowPassword] = useState(false);

	const submitHandler = (data) => {
		setIsLoading(true);
		axios
			.post(`${apiUrl}/users/login`, data)
			.then((res) => {
				if (res.data) {
					toast.success('Logged in successfully');
				}
				setUser({ ...res.data });
				LocalStorage.set('user', { ...res.data });
			})
			.catch((error) => {
				const message = getError(error);
				toast.error(message);
				return Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: message,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	const bgImage = {
		backgroundImage: `url(${logo})`,
	};
	return (
		<>
			<div className="tp-main-wrapper h-screen techbg">
				<div className="container mx-auto my-auto h-full flex items-center justify-center">
					<div className="pt-[120px] pb-[120px] w-full sm:max-w-6xl">
						<div className="grid grid-cols-12 shadow-lg bg-white overflow-hidden rounded-md">
							<div className="col-span-4 lg:col-span-6 relative h-full hidden lg:block">
								<div
									style={bgImage}
									className="data-bg absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat"
								></div>
							</div>
							<div className="col-span-12 lg:col-span-6 w-full sm:w-[500px] mx-auto my-auto  pt-[50px] py-[60px] px-5 md:px-[60px] shadow-sm">
								<div className="text-center text-gray-900">
									<img src={logo} alt="stemlab" />
									<div className="py-6 space-x-2">
										<span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-gray-200 cursor-pointer">
											G
										</span>
										<span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-gray-200 cursor-pointer">
											f
										</span>
										<span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-gray-200 cursor-pointer">
											Git
										</span>
									</div>
									<p className="text-black">or use your email account</p>
								</div>
								<form
									onSubmit={handleSubmit(submitHandler)}
									className="w-full px-4 lg:px-0 mx-auto"
								>
									<div className="mb-2 relative pb-2 pt-4">
										<label
											htmlFor="email"
											className="mb-0 text-left text-base text-black inline-block"
										>
											Email <span className="text-red">*</span>
										</label>
										<input
											type="email"
											name="email"
											{...register('email', {
												required: 'Email is required',
											})}
											className="block w-full p-4 text-lg rounded-sm bg-gray-200"
										/>
										{errors.email && (
											<p className="text-red-500 text-center">
												{errors.email.message}
											</p>
										)}
									</div>
									<div className="mb-5 relative py-2">
										<label
											htmlFor="password"
											className="mb-0 text-left text-base text-black inline-block"
										>
											Password <span className="text-red">*</span>
										</label>
										<input
											className="block w-full p-4 text-lg rounded-sm bg-gray-200"
											type={showPassword ? 'text' : 'password'}
											name="password"
											id="password"
											placeholder="Password"
											{...register('password', {
												required: 'Please enter password',
												minLength: {
													value: 6,
													message: 'password is more than 5 chars',
												},
											})}
										/>

										<div className="absolute inset-y-0 right-0 flex items-center h-[40px] mt-10 mr-4 px-3 z-10 bg-gray-200">
											{showPassword ? (
												<FiEyeOff
													onClick={() => setShowPassword(false)}
													className="text-gray-600 cursor-pointer"
												/>
											) : (
												<FiEye
													onClick={() => setShowPassword(true)}
													className="text-gray-600 cursor-pointer"
												/>
											)}
										</div>
										{errors.password && (
											<p className="text-red-500 text-center">
												{errors.password.message}
											</p>
										)}
									</div>
									<div className="text-left text-black ">
										Dont have account{' '}
										<Link
											to={'/register'}
											className="hover:underline hover:text-gray-600"
										>
											Register
										</Link>
									</div>
									<div className="px-4 pb-2 pt-4">
										<button
											// type="submit"
											className="uppercase w-full p-4 text-lg rounded-full bg-primary hover:bg-indigo-600 focus:outline-none"
										>
											sign in
										</button>
									</div>
									<div className="p-4 debug text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
										<a href="#">
											<svg
												fill="#fff"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
											>
												<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
											</svg>
										</a>
										<a href="#">
											<svg
												fill="#fff"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
											>
												<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
											</svg>
										</a>
										<a href="#">
											<svg
												fill="#fff"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
											>
												<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
											</svg>
										</a>
									</div>
								</form>
								<div className="text-right text-black ">
									<Link
										to={'/'}
										className="hover:underline hover:text-gray-600"
									>
										Forgot your password?
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default Login;
