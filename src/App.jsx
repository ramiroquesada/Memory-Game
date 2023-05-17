import { Provider } from 'react-redux';
import { Layout } from './layout/Layout';
import { Game } from './components/Game';
import { store } from './redux/store';
import { Memory } from './components/Memory';

export const App = () => {


	return (
		<Provider store={store}>
			<Layout>
				{/* <Game /> */}
				<Memory />
			</Layout>
		</Provider>
	);
};
