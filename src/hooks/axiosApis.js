import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchSite = async () => {
	try {
		const { data } = await axios.get(`${apiUrl}/general`);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchDashboard = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/general/dashboard`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchStudent = async (prop) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${prop?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/students/student`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchQuizzes = async (prop) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${prop?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/quiz/my-quiz`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchQuiz = async (prop) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${prop?.token}`,
			},
		};
		const { data } = await axios.get(
			`${apiUrl}/quiz/my-quiz/${prop.id}`,
			config
		);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
