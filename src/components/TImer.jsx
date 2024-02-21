/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Timer = ({time}) => {
	const [timeRemaining, setTimeRemaining] = useState(time); // 10 minutes in seconds

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
			event.returnValue = ''; // Prompt message when trying to close the tab
			localStorage.setItem('remainingTime', timeRemaining.toString());
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [timeRemaining]);

	return (
		<div>
			<h1>
				Quiz Timer: {Math.floor(timeRemaining / 60)}:
				{(timeRemaining % 60).toString().padStart(2, '0')}
			</h1>
			{/* Display quiz questions/components */}
		</div>
	);
};

export default Timer;
