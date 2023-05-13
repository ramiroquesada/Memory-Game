import { Provider } from 'react-redux';
import { Layout } from './layout/Layout';
import { Game } from './components/Game';
import { store } from './redux/store';

export const App = () => {


	return (
		<Provider store={store}>
			<Layout>
				<Game />
			</Layout>
		</Provider>
	);
};
