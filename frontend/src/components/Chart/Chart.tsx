import ReactECharts from 'echarts-for-react';
import {useStockMarketData} from "./Chart.hook";

export type StockUpdate = {
	symbol: string;
	price: number;
	timestamp: string;
};

export type StockChartOption = {
	symbol: string;
	color: string;
	min: number;
	max: number;
};

const Chart = () => {
	const {stockChartOptions, getOption}
		= useStockMarketData()


	return (
		<div className='App'>
			{stockChartOptions.map(option => (
				<ReactECharts
					key={option.symbol}
					option={getOption(option.symbol)}
					style={{height: '300px', width: '100%'}}
				/>
			))}
		</div>
	);
};

export default Chart;
