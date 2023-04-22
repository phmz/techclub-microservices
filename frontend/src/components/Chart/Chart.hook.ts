import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {StockChartOption, StockUpdate} from "./Chart";
import {getChartOption, changeColorOption, updateStockChartOption, updateStockData} from "./Chart.service";

export const useStockMarketData = () => {
	const [data, setData] = useState<Record<string, StockUpdate[]>>({});
	const [stockChartOptions, setStockChartOptions] = useState<StockChartOption[]>([]);

	useEffect(() => {
		const socket = io('http://localhost:8000');
		socket.on('stockUpdate', (stockUpdate: StockUpdate) => {
			setStockChartOptions(prevStockChartOptions => updateStockChartOption(prevStockChartOptions, stockUpdate));
			setData(prevData => updateStockData(prevData, stockUpdate));
		});
	}, []);

	const saveColorOption = (symbol: string, color: string) => {
		setStockChartOptions(prevStockChartOptions => changeColorOption(prevStockChartOptions, symbol, color));
	}

	return {
		stockChartOptions,
		getOption: (symbol: string) => getChartOption(stockChartOptions, data[symbol] || [], symbol),
		saveColorOption
	}
}