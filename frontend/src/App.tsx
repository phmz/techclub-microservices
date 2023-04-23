import { QueryClient, QueryClientProvider } from 'react-query';
import ChartsContainer from './components/ChartsContainer/ChartsContainer';
import HealthCheck from './components/HealthCheck/HealthCheck';

const App = () => {
	const queryClient = new QueryClient();

	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<HealthCheck />
				<ChartsContainer />
			</QueryClientProvider>
		</div>
	);
};

export default App;
