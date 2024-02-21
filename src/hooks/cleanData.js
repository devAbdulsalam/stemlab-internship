import { getRandomRGBColor } from './getRandomColor';
export function cleanData(data) {
	// Extract unique dates and categories
	const uniqueDates = [...new Set(data.map((item) => item.date))];
	const uniqueCategories = [...new Set(data.map((item) => item.category))];

	// Create labels array
	const labels = uniqueDates;

	// Create datasets array
	const datasets = uniqueCategories.map((category) => {
		const dataPoints = uniqueDates.map((date) => {
			const matchingItem = data.find(
				(item) => item.date === date && item.category === category
			);
			return matchingItem ? matchingItem.totalSales : 0;
		});
		const color = getRandomRGBColor();
		return {
			label: category,
			name: category,
			data: dataPoints,
			backgroundColor: `rgba(${color}, 0.2)`,
			borderColor: `rgb(${color})`,
			borderWidth: 1,
		};
	});

	return {
		labels: labels,
		datasets: datasets,
	};
}
export function cleanSuppliesData(data) {
	// Extract unique dates and categories
	const uniqueDates = [...new Set(data.map((item) => item.date))];
	const uniqueItems = [...new Set(data.map((item) => item.name))];

	// Create labels array
	const labels = uniqueDates;

	// Create datasets array
	const datasets = uniqueItems.map((name) => {
		const dataPoints = uniqueDates.map((date) => {
			const matchingItem = data.find(
				(item) => item.date === date && item.name === name
			);
			return matchingItem ? matchingItem.totalCost : 0;
		});
		const color = getRandomRGBColor();
		return {
			label: name,
			name: name,
			data: dataPoints,
			backgroundColor: `rgba(${color}, 0.2)`,
			borderColor: `rgb(${color})`,
			borderWidth: 1,
		};
	});

	return {
		labels: labels,
		datasets: datasets,
	};
}
export const cleanSumarryData = (data) => {
	if (data.length > 0) {
		const labels = data.map((item) => item.category);
		const datasets = [
			{
				label: 'Cost',
				data: data.map((item) => item.cost),
				backgroundColor: `rgba(${getRandomRGBColor()}, 0.2)`,
				borderColor: `rgb(${getRandomRGBColor()})`,
			},
			{
				label: 'Expense',
				data: data.map((item) => item.totalExpense),
				backgroundColor: `rgba(${getRandomRGBColor()}, 0.2)`,
				borderColor: `rgb(${getRandomRGBColor()})`,
			},
			{
				label: 'Total',
				data: data.map((item) => item.totalCost),
				backgroundColor: `rgba(${getRandomRGBColor()}, 0.2)`,
				borderColor: `rgb(${getRandomRGBColor()})`,
			},
		];
		// const datasets = data.map((item) => {

		// 	return (data = {
		// 		label: item.category,
		// 		data: [item.cost, item.totalExpense, item.totalCost],
		// 		backgroundColor: `rgba(${color}, 0.2)`,
		// 		borderColor: `rgb(${color})`,
		// 		borderWidth: 1,
		// 	});
		// });

		return { labels, datasets };
	}
};
export const cleanTransactionsData = (data) => {
	if (data.length > 0) {
		const labels = data.map((item) => item.createdAt);
		const datasets = [
			{
				label: 'amount',
				data: data.map((item) => item.amount),
			},
		];

		return { labels, datasets };
	}
};
