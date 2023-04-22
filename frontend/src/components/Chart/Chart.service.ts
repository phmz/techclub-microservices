import {StockChartOption, StockUpdate} from "./Chart";

export const updateStockChartOption = (stockChartOptions: StockChartOption[], stockUpdate: StockUpdate) => {
	const stockChartOption = stockChartOptions.find(option => option.symbol === stockUpdate.symbol);
	if (stockChartOption) {
		return stockChartOptions.map(option => {
			if (option.symbol === stockUpdate.symbol) {
				return {
					...option,
					min: Math.min(option.min, Math.round(stockUpdate.price / 100 * 0.95)),
					max: Math.max(option.max, Math.round(stockUpdate.price / 100 * 1.05)),
				};
			}

			return option;
		});
	}

	return [
		...stockChartOptions,
		{
			symbol: stockUpdate.symbol,
			color: '#' + Math.floor(Math.random() * 16777215).toString(16),
			min: Math.round(stockUpdate.price / 100 * 0.95),
			max: Math.round(stockUpdate.price / 100 * 1.05),
		},
	];
}

export const updateStockData = (data: Record<string, StockUpdate[]>, stockUpdate: StockUpdate) => {
	return {
		...data,
		[stockUpdate.symbol]: [...(data[stockUpdate.symbol] || []), {
			...stockUpdate,
			price: stockUpdate.price / 100,
		}],
	};
}

export const getChartOption = (stockChartOptions: StockChartOption[], stockData: StockUpdate[],symbol: string) => {
	const stockChartOption = stockChartOptions.find(option => option.symbol === symbol);

	if (!stockChartOption) {
		return {};
	}

	return {
		title: {
			text: symbol,
		},
		xAxis: {
			type: 'time',
		},
		yAxis: {
			type: 'value',
			min: stockChartOption.min,
			max: stockChartOption.max,
		},
		series: [
			{
				data: stockData.map(stock => [stock.timestamp, stock.price]) || [],
				type: 'line',
				smooth: true,
				symbol: 'none',
				areaStyle: {},
				color: stockChartOption.color,
			},
		],
	}};