import axios from 'axios';
import { useQuery } from 'react-query';

type HealthStatus = 'OK' | 'KO' | 'UNKNOWN';
type HealthKey = 'SMS' | 'SMP';

const fetchHealth = async () => {
	const response = await axios.get<Record<HealthKey, HealthStatus>>('/health', {
		baseURL: 'http://localhost:8000',
	});
	return response.data;
};

const getStatusColor = (status: HealthStatus): string => {
	switch (status) {
		case 'OK':
			return 'green';
		case 'KO':
			return 'red';
		case 'UNKNOWN':
		default:
			return 'orange';
	}
};

const HealthCheck = () => {
	const { data: healths, isError } = useQuery('healths', fetchHealth, {
		refetchInterval: 1000,
	});

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<p style={{ marginRight: '10px', marginTop: 0, marginBottom: 0 }}>
					SMS:
				</p>
				<div
					style={{
						width: '20px',
						height: '20px',
						backgroundColor: getStatusColor(
							isError ? 'KO' : healths?.SMS || 'UNKNOWN'
						),
						borderRadius: '5px',
					}}
				></div>
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<p style={{ marginRight: '10px', marginTop: 0, marginBottom: 0 }}>
					SMP:
				</p>
				<div
					style={{
						width: '20px',
						height: '20px',
						backgroundColor: getStatusColor(
							isError ? 'KO' : healths?.SMP || 'UNKNOWN'
						),
						borderRadius: '5px',
					}}
				></div>
			</div>
		</div>
	);
};

export default HealthCheck;
