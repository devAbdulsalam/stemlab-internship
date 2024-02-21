// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchQuiz } from '../hooks/axiosApis';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import Questions from '../components/Questions';
import CountDownToScheduleTime from './../components/CountDownToScheduleTime';
import CountDownTimer from './../components/CountDownTimer';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
// import { Dialog, Transition } from '@headlessui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import getError from '../hooks/getError';
import { convertToDuration, checkTime } from '../hooks/formatDateString';
import moment from 'moment';
import Swal from 'sweetalert2';
const Quiz = () => {
	const { user, setSelectedProduct } = useContext(AuthContext);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const apiUrl = import.meta.env.VITE_API_URL;
	const { id } = useParams();
	const info = { token: user.token, id };
	const { data, isLoading, error } = useQuery(['quiz', id], async () =>
		fetchQuiz(info)
	);
	const [loading, setLoading] = useState(false);
	const [answers, setAnswers] = useState('');
	const [quiz, setQuiz] = useState('');

	useEffect(() => {
		if (data) {
			// console.log(data);
			setQuiz(data?.quiz);
			// navigate('/');/
		}
		if (error) {
			console.log(error);
			toast.error(error?.message);
		}
	}, [data, error]);
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
		},
	};
	const checkQuizStatus = checkTime(data?.scheduleTime, data?.timeslot);
	const handleResult = async (data) => {
		return Swal.fire({
			title: 'Success',
			icon: 'success',
			text: `You scored ${data.totalMark} in the quiz`,
		});
	};
	const handleSubmit = async (quiz) => {
		if (checkQuizStatus === 'expired') {
			return Swal.fire({
				title: 'Error!',
				icon: 'warning',
				text: 'Expired quiz',
			});
		}
		console.log(answers);
		// if (checkQuizStatus === 'scheduled') {
		// 	return Swal.fire({
		// 		title: 'Error!',
		// 		icon: 'Warning',
		// 		text: 'Be patient it is not yet Time for the quiz',
		// 	});
		// }
		setLoading(true);
		const data = {
			// clean and sanitize by ensuring you send only id of question and answer
			// eg: answers: [{ _id, answer }, {_id, answer}]
			answers: quiz.questions,
			quizId: id,
			submissionTime: Date.now(),
			note: 'user submission',
		};
		// console.log(info);
		axios
			.post(`${apiUrl}/quiz/submit`, data, config)
			.then((res) => {
				if (res.data) {
					toast.success('Answer submit successfully');
				}
				queryClient.invalidateQueries(['quiz']);
				navigate('/my-quiz');
			})
			.catch((error) => {
				const message = getError(error);
				toast.error(message);
			})
			.finally(() => {
				setLoading(false);
				setSelectedProduct('');
			});
	};
	const handleSetAnswer = (questionIndex, optionIndex) => {
		const updatedQuestions = [...quiz.questions];
		// Set the answer of the question to the index of the selected option
		updatedQuestions[questionIndex].answer = optionIndex;
		updatedQuestions[questionIndex].error = '';
		setAnswers(updatedQuestions);
	};

	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Student</h3>
						<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
							<li className="breadcrumb-item text-muted">
								<Link to={'/'} className="text-hover-primary">
									{' '}
									Home
								</Link>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">
								<Link to={'/my-quiz'} className="text-hover-primary">
									{' '}
									My Quizzes
								</Link>
							</li>
						</ul>
					</div>
				</div>
				{/* <!-- table --> */}
				<section className="header">
					<div className="mb-6 bg-white px-8 py-8 rounded-md">
						<div className="flex justify-between">
							<h4 className="text-[24px] mb-4 ">Take Quiz</h4>
							<div>
								{data?.answer && (
									<button
										onClick={() => handleResult(data.answer)}
										type="button"
										className="tp-btn px-5 py-2 bg-success"
									>
										View result
									</button>
								)}
							</div>
						</div>
						<label>Title: </label>
						<input
							type="text"
							value={quiz?.title}
							disabled
							className="input w-full h-[49px] rounded-md border border-gray pl-6 text-base"
						/>
						<label>Instructions: </label>
						<textarea
							value={quiz?.instructions}
							className="input w-full h-[49px] rounded-md border border-gray pl-6 text-base"
							disabled
						></textarea>
						<div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
							<div className="">
								<label>
									Schedule Time:{' '}
									<span
										className={`${
											checkQuizStatus === 'expired'
												? 'text-red-500'
												: checkQuizStatus === 'scheduled'
												? 'text-yellow-500'
												: 'text-green-500'
										} text-sm ml-5`}
									>
										{checkTime(quiz?.scheduleTime, quiz?.timeslot)}
									</span>
								</label>
								<input
									value={moment
										.utc(quiz?.scheduleTime)
										.format('YYYY-MM-DD HH:mm A')}
									disabled
									className="input w-full h-[49px] rounded-md border border-gray pl-6 text-base"
								/>
							</div>
							<div>
								<label>Time Slot: </label>
								<input
									value={convertToDuration(quiz?.timeslot)}
									disabled
									className="input w-full h-[49px] rounded-md border border-gray pl-6 text-base"
								/>
							</div>
							<div>
								<label>Mark: </label>
								<input
									type="number"
									value={quiz?.mark}
									disabled
									className="input w-full h-[49px] rounded-md border border-gray pl-6 text-base"
								/>
							</div>
							<div>
								<label htmlFor="tquestions" name="tquestions">
									Total Questions:{' '}
								</label>
								<div className="flex gap-2">
									<input
										type="number"
										id="tquestions"
										name="tquestions"
										value={quiz?.totalQuestions}
										disabled
										className="input w-full h-[49px] rounded-md border border-gray pl-6 text-base"
									/>
								</div>
							</div>
						</div>
						<div>
							{checkQuizStatus === 'scheduled' && (
								<CountDownToScheduleTime scheduleTime={quiz?.scheduleTime} />
							)}
							{checkQuizStatus === 'ongoing' && (
								<CountDownTimer
									scheduleTime={quiz?.scheduleTime}
									timeslot={quiz?.timeslot}
								/>
							)}
						</div>
					</div>
					<Questions
						questions={quiz?.questions}
						handleSetAnswer={handleSetAnswer}
					/>
					<div className="mt-3 md:mt-6 w-full md:w-1/2 mx-auto flex gap-2 justify-between">
						{!data?.answer ? (
							<button
								onClick={() => handleSubmit(data)}
								type="button"
								className="tp-btn px-5 py-2 bg-success w-full text-center flex justify-center"
							>
								Submit Quiz
							</button>
						) : (
							<button
								onClick={() => handleResult(data.answer)}
								type="button"
								className="tp-btn px-5 py-2 bg-success w-full text-center flex justify-center"
							>
								View result
							</button>
						)}
					</div>
				</section>
			</div>
			{isLoading || loading ? <Loader /> : ''}
		</>
	);
};

export default Quiz;
