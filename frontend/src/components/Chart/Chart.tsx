import ReactECharts from 'echarts-for-react';
import { useStockMarketData } from './Chart.hook';
import { TwitterPicker } from 'react-color';

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
	const { stockChartOptions, getOption, saveColorOption } =
		useStockMarketData();

	return (
		<div className="App">
			{stockChartOptions.map((option) => (
				<div key={option.symbol} style={{ display: 'flex' }}>
					<ReactECharts
						option={getOption(option.symbol)}
						style={{ height: '300px', width: '100%' }}
					/>
					<TwitterPicker
						styles={{ default: { card: { width: '100px', height: '300px' } } }}
						color={option.color}
						onChangeComplete={(color) =>
							saveColorOption(option.symbol, color.hex)
						}
					/>
				</div>
			))}
		</div>
	);
};

export default Chart;
