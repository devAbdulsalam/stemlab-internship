import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';
import LeftImage from '../components/LeftImage';
import { useState } from 'react';
import { programs } from './data';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getError from '../hooks/getError';
import axios from 'axios';
import Swal from 'sweetalert2';

const Interns = () => {
	const [selectedProgram, setSelectedProgram] = useState('');
	const [user, setUser] = useState('');
	const [programInfo, setProgramInfo] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const apiUrl = import.meta.env.VITE_API_URL;
	const phoneRegExp = /^(\+\d{1,4})?\d{10,11}$/;
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const submitHandler = async (formValues) => {
		setLoading(true);
		axios
			.post(`${apiUrl}/students/register/internship`, formValues)
			.then((res) => {
				if (res.data) {
					toast.success('Registration successful');
					setUser(res.data?.name);
					setShowModal(true);
				}
			})
			.catch((error) => {
				const message = getError(error);
				toast.error(message);
				return Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: message || 'Something went wrong!',
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const showProgramInfo = (event) => {
		const selectedProgramName = event.target.value;
		setSelectedProgram(selectedProgramName);
		// console.log(selectedProgramName);

		// Find the selected program in the programs array
		const selectedProgramData = programs.find(
			(program) => program.name === selectedProgramName
		);

		if (selectedProgramData) {
			// Display information for the selected program
			setProgramInfo(selectedProgramData.courses);
		} else {
			setProgramInfo([]);
		}
	};
	return (
		<>
			<section className="min-h-screen flex items-stretch text-green-600 relative overflow-y-auto  ">
				<LeftImage />

				<div className="lg:w-1/2 w-full md:flex justify-center items-center bg-primary/30 ">
					<div className="w-full font-josefin items-center justify-center flex flex-col h-full p-3 md:p-0">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8 }}
						>
							<div className="lg:w-[70%] justify-center items-center lg:mx-auto lg:my-[20px] pt-[20px] lg:shadow-lg bg-white rounded-sm">
								<div className="px-3">
									<div className="relative sm:pt-[30px] sm:pb-[24px] rounded-[16px] bg-white-100 lg:px-[40px]">
										<motion.div
											initial={{ x: 50 }}
											animate={{ x: 0 }}
											transition={{ ease: 'easeOut', duration: 2, delay: 0.4 }}
										>
											<div className="justify-center items-center w-full h-auto mb-3 flex">
												<img
													src="/Stem.png"
													alt="logo"
													className="md:w-3/12 h-auto w-4/12"
												/>
											</div>
										</motion.div>
										<h1
											className={`font-montserrat text-center font-[600] mt-3 text-blue-950 text-lg md:text-[28px]`}
										>
											Internship Registration
										</h1>
										<span
											className={`font-josefin block text-center font-[400] text-[16px] text-dark-400 `}
										>
											Fill the form to continue the Registration
										</span>

										<hr className="my-4" />

										<form
											className="flex flex-col mt-4 z-10"
											onSubmit={handleSubmit(submitHandler)}
										>
											<label
												htmlFor="fullName"
												className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
											>
												Full Name
											</label>
											<input
												type="text"
												id="fullName"
												name="fullName"
												placeholder="Enter Full Name"
												className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
												{...register('name', {
													required: 'Please enter your name',
												})}
											/>
											{errors.name && (
												<div className="text-red-500">
													{errors.name.message}
												</div>
											)}
											<label
												htmlFor="phoneNumber"
												className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
											>
												Phone Number
											</label>
											<input
												type="text"
												id="phoneNumber"
												name="phoneNumber"
												placeholder="Enter Phone Number"
												className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
												{...register('phone', {
													required: 'Phone number is required',
													pattern: {
														value: phoneRegExp,
														message: 'Enter a valid 11-digit phone number',
													},
												})}
											/>
											{errors.phone && (
												<div className="text-red-500">
													{errors.phone.message}
												</div>
											)}

											<label
												htmlFor="email"
												className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
											>
												Email
											</label>
											<input
												placeholder="Enter Email"
												id="email"
												name="email"
												className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
												{...register('email', {
													required: 'Please enter email',
													pattern: {
														value:
															/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
														message: 'Please enter valid email',
													},
												})}
											/>
											{errors.email && (
												<div className="text-red-500">
													{errors.email.message}
												</div>
											)}

											<div className="md:flex w-full items-center gap-3">
												<div className="w-full">
													<label
														htmlFor="email"
														className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
													>
														Date of Birth
													</label>
													<input
														id="dob"
														type="date"
														name="dob"
														className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
														{...register('dob', {
															required: 'Please enter your date of birth',
														})}
													/>
													{errors.dob && (
														<div className="text-red-500">
															{errors.dob.message}
														</div>
													)}
												</div>
												<div className="w-full">
													<label
														htmlFor="gender"
														className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
													>
														Gender
													</label>
													<select
														className={` mt-1 mb-3 text-md p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
														id="gender"
														{...register('gender', {
															required: 'Please select your gender',
														})}
													>
														<option value="">Select Gender</option>
														<option value="male">Male</option>
														<option value="female">Female</option>
													</select>
													{errors.gender && (
														<div className="text-red-500">
															{errors.gender.message}
														</div>
													)}
												</div>
											</div>
											<div>
												<label
													htmlFor="school"
													className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
												>
													College or Institution
												</label>
												<input
													placeholder="Enter College/Institution"
													id="school"
													name="school"
													{...register('school', {
														required: 'Please Enter your school',
													})}
													className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
												/>
												{errors.school && (
													<div className="text-red-500">
														{errors.school.message}
													</div>
												)}
											</div>
											<label
												htmlFor="courseOfStudy"
												className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
											>
												Course of Studies (Optional)
											</label>
											<input
												placeholder="Enter Course of Studies"
												id="courseOfStudy"
												name="courseOfStudy"
												{...register('courseOfStudy')}
												className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
											/>
											<label
												htmlFor="regNumber"
												className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
											>
												School Registration No. (Optional)
											</label>
											<input
												placeholder="school reg Number"
												id="regNumber"
												name="regNumber"
												{...register('regNumber')}
												className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
											/>
											<div className="md:flex w-full items-center gap-3">
												<div className="w-full">
													<label
														htmlFor="email"
														className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
													>
														Start Date
													</label>
													<select
														id="startMonth"
														name="startMonth"
														className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
														{...register('startMonth', {
															required: 'Please enter your start Month',
														})}
													>
														<option value="January">January</option>
														<option value="February">February</option>
														<option value="March">March</option>
														<option value="April">April</option>
														<option value="May">May</option>
														<option value="June">June</option>
														<option value="July">July</option>
														<option value="August">August</option>
														<option value="September">September</option>
														<option value="October">October</option>
														<option value="November">November</option>
														<option value="December">December</option>
													</select>
													{errors.startMonth && (
														<div className="text-red-500">
															{errors.startMonth.message}
														</div>
													)}
												</div>
												<div className="w-full">
													<label
														htmlFor="duration"
														className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
													>
														Duration
													</label>
													<select
														className={` mt-1 mb-3 text-md p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
														id="duration"
														{...register('duration', {
															required: 'Please select your duration',
														})}
													>
														<option
															value="3 month"
															className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														>
															3 month
														</option>
														<option
															value="4 month"
															className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														>
															4 month
														</option>
														<option
															value="6 month"
															className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														>
															6 month
														</option>
														<option
															value="12 month"
															className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														>
															12 month
														</option>
													</select>
													{errors.duration && (
														<div className="text-red-500">
															{errors.duration.message}
														</div>
													)}
												</div>
											</div>
											<label
												htmlFor="Program"
												className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
											>
												Program
											</label>
											<select
												id="course"
												{...register('course', {
													required: 'Please select a programme',
												})}
												onChange={showProgramInfo}
												className={` mt-1 mb-3 text-md p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
											>
												<option value="">Select Program</option>
												{programs.map((program) => (
													<option key={program.name} value={program.name}>
														{program.name}
													</option>
												))}
											</select>
											{errors.programe && (
												<div className="text-red-500">
													{errors.programe.message}
												</div>
											)}
											{selectedProgram && (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
												>
													<div
														className={`mt-2 mb-3 show-program-info shadow p-3 text-gray-700`}
													>
														<h2 className="text-primary font-semibold text-lg">{`${selectedProgram} Program Info:`}</h2>
														<ul className="list-disc  ml-6">
															{programInfo.map((program, index) => (
																<li key={index} className="mt-2 text-md">
																	{program}
																</li>
															))}
														</ul>
													</div>
												</motion.div>
											)}
											<motion.button
												whileTap={{ scale: 0.9 }}
												className="font-montserrat p-3 bg-blue-950 hover:bg-blue-900 text-white w-full rounded-md my-3 text-[16px] bg-success"
												disabled={loading}
												type="submit"
											>
												{loading ? 'Loading' : 'Continue'}
											</motion.button>
										</form>
									</div>
									<hr className="my-2" />
									<span
										className={`font-josefin block text-center font-[400] text-[16px] text-black pb-4`}
									>
										Go back to{' '}
										<Link to="/" className="text-blue-500 font-semibold">
											Home
										</Link>
									</span>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
			<ConfirmModal
				show={showModal}
				setShow={setShowModal}
				user={user}
				setUser={setUser}
			/>
			{loading && <Loader />}
		</>
	);
};

export default Interns;
