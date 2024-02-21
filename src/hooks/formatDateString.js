const formatDateString = (dateStr) => {
	const date = new Date(dateStr);
	const options = { month: 'short', day: 'numeric', year: 'numeric' };
	return date.toLocaleDateString('en-US', options);
};

export default formatDateString;
export const convertToDuration = (timeslot) => {
	const hours = Math.floor(timeslot / 60); // Calculate the number of hours
	const minutes = timeslot % 60; // Calculate the remaining minutes

	// Construct the duration string
	let duration = '';
	if (hours > 0) {
		duration += `${hours} hour${hours > 1 ? 's' : ''}`; // Add hours
		if (minutes > 0) {
			duration += ` ${minutes} minute${minutes > 1 ? 's' : ''}`; // Add minutes
		}
	} else {
		duration = `${minutes} minute${minutes > 1 ? 's' : ''}`; // Only minutes
	}

	return duration;
};
export function compareTime(scheduleTime) {
	// Get the current time in milliseconds since the Unix epoch
	const currentTime = Date.now();

	// Parse the schedule time
	const parsedScheduleTime = Date.parse(scheduleTime);

	// Compare the schedule time with the current time
	if (parsedScheduleTime > currentTime) {
		// Schedule time is greater than the current time
		return false;
	} else {
		// Schedule time is not greater than the current time
		return true;
	}
}
export function checkTime(scheduleTime, duration) {
	// Parse the schedule time
	const parsedScheduleTime = Date.parse(scheduleTime);

	// Get the current time
	const currentTime = Date.now();

	// Calculate the end time based on schedule time and duration
	const endTime = parsedScheduleTime + Number(duration);
	// Check the status
	if (currentTime < parsedScheduleTime) {
		return 'scheduled';
	} else if (currentTime >= parsedScheduleTime && currentTime <= endTime) {
		return 'ongoing';
	} else {
		return 'expired';
	}
}
