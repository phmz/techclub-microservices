import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {StockChartOption, StockUpdate} from "./Chart";
import {getChartOption, updateStockChartOption, updateStockData} from "./Chart.service";

export const useStockMarketData = () => {
	const [data, setData] = useState<Record<string, StockUpdate[]>>({});
	const [stockChartOptions, setStockChartOptions] = useState<StockChartOption[]>([]);

	useEffect(() => {
		const createdSocket = io('http://localhost:3100');
		createdSocket.on('stockUpdate', (stockUpdate: StockUpdate) => {
			setStockChartOptions(prevStockChartOptions => updateStockChartOption(prevStockChartOptions, stockUpdate));
			setData(prevData => updateStockData(prevData, stockUpdate));
		});
	}, []);

	return {
		data,
		stockChartOptions,
		getOption: (symbol: string) => getChartOption(stockChartOptions, data[symbol] || [], symbol),
	}
}