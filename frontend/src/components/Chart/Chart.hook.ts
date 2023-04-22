import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { StockChartOption, StockUpdate } from './Chart';
import {
	getChartOption,
	changeColorOption,
	updateStockChartOption,
	updateStockData,
	Setting,
} from './Chart.service';

export const useStockMarketData = ({ settings }: { settings: Setting[] }) => {
	const [data, setData] = useState<Record<string, StockUpdate[]>>({});
	const [stockChartOptions, setStockChartOptions] = useState<
		StockChartOption[]
	>([]);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const createdSocket = io('http://localhost:8000');
		setSocket(createdSocket);

		return () => {
			createdSocket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on('stockUpdate', (stockUpdate: StockUpdate) => {
				setStockChartOptions((prevStockChartOptions) =>
					updateStockChartOption(prevStockChartOptions, stockUpdate, settings)
				);
				setData((prevData) => updateStockData(prevData, stockUpdate));
			});

			return () => {
				socket.off('stockUpdate');
			};
		}
	}, [socket]);

	const saveColorOption = (symbol: string, color: string) => {
		setStockChartOptions((prevStockChartOptions) =>
			changeColorOption(prevStockChartOptions, symbol, color)
		);
	};

	return {
		stockChartOptions,
		getOption: (symbol: string) =>
			getChartOption(stockChartOptions, data[symbol] || [], symbol),
		saveColorOption,
	};
};
