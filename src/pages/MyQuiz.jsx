// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchQuizzes } from '../hooks/axiosApis';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
// import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import getError from '../hooks/getError';
import moment from 'moment';
import formatDateString, { checkTime } from '../hooks/formatDateString';
import CountDownToScheduleTime from '../components/CountDownToScheduleTime';
import CountDownTimer from '../components/CountDownTimer';
const Quiz = () => {
	const { user } = useContext(AuthContext);
	const { data, isLoading, error } = useQuery(['quizzes'], async () =>
		fetchQuizzes(user)
	);
	// const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (data) {
			console.log(data);
			// navigate('/');/
		}
		if (error) {
			const message = getError(error);
			toast.error(message);
		}
	}, [data, error]);

	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Student name</h3>
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
								<Link to={'/quizzes'} className="text-hover-primary">
									{' '}
									Quizzes
								</Link>
							</li>
						</ul>
					</div>
				</div>
				{/* <!-- table --> */}
				<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-2">
						{data?.map((quiz) => {
							const checkQuizStatus = checkTime(
								quiz?.scheduleTime,
								quiz?.timeslot
							);
							return (
								<Link
									to={`/my-quiz/${quiz._id}`}
									key={quiz._id}
									className="rounded-md bg-white border-gray border p-4"
								>
									<div>Quiz title: {quiz?.title}</div>
									<div>Quiz Mark: {quiz?.mark}</div>
									<div>Quiz duration: {quiz?.timeslot} minutes</div>
									<div>
										Quiz date: {formatDateString(quiz?.scheduleTime)}
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
									</div>
									<div>
										Quiz time: {moment.utc(quiz?.scheduleTime).format('h:mm A')}
									</div>
									<div>
										{checkQuizStatus === 'scheduled' && (
											<CountDownToScheduleTime
												scheduleTime={quiz?.scheduleTime}
											/>
										)}
										{checkQuizStatus === 'ongoing' && (
											<CountDownTimer
												scheduleTime={quiz?.scheduleTime}
												timeslot={quiz?.timeslot}
											/>
										)}
									</div>
								</Link>
							);
						})}
					</div>
				</div>
				{isLoading ? <Loader /> : ''}
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default Quiz;
