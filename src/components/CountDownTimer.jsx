/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const CountDownTimer = ({ scheduleTime, timeslot }) => {
	const [remainingTime, setRemainingTime] = useState(0);

	useEffect(() => {
		const calculateRemainingTime = () => {
			const currentTime = new Date().getTime(); // Current time in milliseconds
			const endTime = new Date(scheduleTime).getTime() + timeslot * 60000; // End time in milliseconds
			const timeDifference = endTime - currentTime; // Difference between end time and current time
			setRemainingTime(Math.max(timeDifference, 0)); // Ensure remaining time is not negative
		};

		const timer = setInterval(calculateRemainingTime, 1000); // Update remaining time every second

		// Clear interval when component unmounts
		return () => clearInterval(timer);
	}, [scheduleTime, timeslot]);

	// Convert remaining time from milliseconds to hours, minutes, and seconds
	const hours = Math.floor(remainingTime / (1000 * 60 * 60));
	const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

	return (
		<div>
			<span className="font-semibold">Quiz ends in:</span> {hours} hours,{' '}
			{minutes} minutes, {seconds} seconds
		</div>
	);
};

export default CountDownTimer;
