import { useQuery } from 'react-query';
import axios from 'axios';
import { Setting } from '../Chart/Chart.service';
import Chart from '../Chart/Chart';

const fetchSettings = async () => {
	const response = await axios.get<Setting[]>('/settings', {
		baseURL: 'http://localhost:8000',
	});
	return response.data;
};

const ChartsContainer = () => {
	const { data: settings, isLoading } = useQuery('settings', fetchSettings, {
		retry: false,
	});

	return (
		<div>
			{isLoading && <div>Loading...</div>}
			{!isLoading && <Chart settings={settings || []} />}
		</div>
	);
};

export default ChartsContainer;
