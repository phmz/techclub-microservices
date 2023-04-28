import ReactECharts from 'echarts-for-react';
import { useStockMarketData } from './Chart.hook';
import { TwitterPicker } from 'react-color';
import { Setting } from './Chart.service';
import { useMutation } from 'react-query';
import axios from 'axios';

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

const saveSetting = async (setting: Setting) => {
	const response = await axios.post<void>('/settings', setting, {
		baseURL: 'http://localhost:8000',
	});
	return response.data;
};

const Chart = ({ settings }: { settings: Setting[] }) => {
	const { stockChartOptions, getOption, saveColorOption } = useStockMarketData({
		settings,
	});

	const mutation = useMutation(saveSetting);

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			{stockChartOptions.map((option) => {
				const options = getOption(option.symbol);

				if (!options.series?.[0].data.length) {
					return null;
				}

				return (
					<div
						key={option.symbol}
						style={{ display: 'flex', width: '50%', alignItems: 'center' }}
					>
						<ReactECharts
							option={getOption(option.symbol)}
							style={{ height: '300px', width: '80%' }}
						/>
						<TwitterPicker
							styles={{
								default: {
									card: { width: '100px', height: '200px' },
									input: {
										display: 'none',
									},
									hash: {
										display: 'none',
									},
								},
							}}
							triangle="hide"
							color={option.color}
							onChangeComplete={(color) => {
								saveColorOption(option.symbol, color.hex);
								mutation.mutate({
									symbol: option.symbol,
									color: color.hex,
								});
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Chart;
