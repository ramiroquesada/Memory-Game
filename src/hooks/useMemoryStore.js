import { useDispatch, useSelector } from 'react-redux';
import { valoApi } from '../api/valoApi';
import { onSetAllCards, onSetGameCards } from '../redux/memorySlice';

// import {
// 	onCloseModal,
// 	onOpenModalWin,
// 	onOpenModalLose,
// } from '../redux/uiSlice';

export const useMemoryStore = () => {
	const dispatch = useDispatch();

	const { allCards, gameCards } =
		useSelector((state) => state.memory);

	const startGettingCards = async () => {
		let localStorageCards = JSON.parse(localStorage.getItem('allCards'));

		if (!localStorageCards) {
			const newCards = await valoApi();

			dispatch(onSetAllCards(newCards));

			localStorage.setItem('allCards', JSON.stringify(newCards));
		} else {
			dispatch(onSetAllCards(localStorageCards));
		}

		dispatch(onSetGameCards());
	};

	

	return {
		allCards,
		gameCards,

		startGettingCards,
	};
};
