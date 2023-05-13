import { useDispatch, useSelector } from 'react-redux';
import { valoApi } from '../api/valoApi';
import {
	onGameOver,
	onSelectCard,
	onSetAllCards,
	onSetGameCards,
	shuffleCards,
	onSetNewRecord,
} from '../redux/gameSlice';
import { onCloseModal, onOpenModal } from '../redux/uiSlice';

export const useGameStore = () => {
	const dispatch = useDispatch();

	const {
		allCards,
		clickedCards,
		record,
		gameCards,
		gameOver,
		
	} = useSelector((state) => state.game);

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

	const onAddToClicked = (card) => {
		if (clickedCards.includes(card.displayName)) {
			dispatch(onGameOver());


			if (clickedCards.length > record) {
				console.log('aaaaaa')
				localStorage.setItem('record', clickedCards.length);
				dispatch(onSetNewRecord(localStorage.getItem('record')));
			}

			dispatch(onOpenModal());
		} else {
			dispatch(onSelectCard(card));
			dispatch(shuffleCards());
		}
	};

	const onShuffleCards = () => {
		dispatch(shuffleCards());
	};

	const onNewGame = () => {
		dispatch(onCloseModal());
		dispatch(onSetGameCards());
	};

	const onNewRecord = (val) => {
		dispatch(onSetNewRecord(val));
	};

	return {
		allCards,
		clickedCards,
		gameCards,
		record,
		gameOver,

		startGettingCards,
		onAddToClicked,
		onShuffleCards,
		onNewGame,
		onNewRecord,
	};
};
