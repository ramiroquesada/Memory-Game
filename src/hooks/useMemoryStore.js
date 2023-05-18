import { useDispatch, useSelector } from 'react-redux';
import { valoApi, playerCardsApi } from '../api/valoApi';
import {
	onSetAllCards,
	onSetAllPlayerCards,
	onSetBackcard,
	onSetGameCards,
	onClickCard,
} from '../redux/memorySlice';

// import {
// 	onCloseModal,
// 	onOpenModalWin,
// 	onOpenModalLose,
// } from '../redux/uiSlice';

export const useMemoryStore = () => {
	const dispatch = useDispatch();

	const { allCards, gameCards, allPlayerCards, backCard, clickedCard } = useSelector(
		(state) => state.memory
	);

	const startGettingCards = async () => {
		let localStorageCards = JSON.parse(localStorage.getItem('allCards'));

		let localStoragePlayerCards = JSON.parse(
			localStorage.getItem('allPlayerCards')
		);

		if (!localStorageCards || !localStoragePlayerCards) {
			const newCards = await valoApi();

			const newPlayerCards = await playerCardsApi();

			dispatch(onSetAllCards(newCards));

			dispatch(onSetAllPlayerCards(newPlayerCards));

			localStorage.setItem('allCards', JSON.stringify(newCards));
			localStorage.setItem(
				'allPlayerCards',
				JSON.stringify(newPlayerCards)
			);
		} else {
			dispatch(onSetAllCards(localStorageCards));
			dispatch(onSetAllPlayerCards(localStoragePlayerCards));
		}

		dispatch(onSetGameCards());
		dispatch(onSetBackcard());
	};

	const startClickCard = (card) => {
		dispatch(onClickCard(card));
	};

	const startCheckMatch = () => {
		// if (clicked)
	}

	return {
		allCards,
		gameCards,
		allPlayerCards,
		backCard,

		startGettingCards,
		startClickCard,
	};
};
