import { QueryClient, QueryClientProvider } from 'react-query';
import ChartsContainer from './components/ChartsContainer/ChartsContainer';

const App = () => {
	const queryClient = new QueryClient();

	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<ChartsContainer />
			</QueryClientProvider>
		</div>
	);
};

export default App;
