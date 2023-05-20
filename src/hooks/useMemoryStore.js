import { useDispatch, useSelector } from 'react-redux';
import { valoApi, playerCardsApi } from '../api/valoApi';
import {
	onSetAllCards,
	onSetAllPlayerCards,
	onSetBackcard,
	onSetGameCards,
	onFlipClickedCard,
	onStartTimer,
	onCheckWin,
	onCheckClickedCardsMatchTrue,
	onCheckClickedCardsMatchFalse,
} from '../redux/memorySlice';
import { onCloseModal } from '../redux/uiSlice';

export const useMemoryStore = () => {
	const dispatch = useDispatch();

	const {
		allCards,
		gameCards,
		matchedCards,
		allPlayerCards,
		backCard,
		clickedCards,
		flipCount,
		isPlaying,
		isWin,
	} = useSelector((state) => state.memory);

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
		if (!isPlaying) {
			dispatch(onStartTimer());
		}

		if (card.flipped) {
			return;
		} else {
			dispatch(onFlipClickedCard(card));

			const isWinner = () => {
				return (
					gameCards.length ===
					matchedCards.length + 1 + clickedCards.length
				);
			};

			const win = isWinner();

			if (win) {
				dispatch(onCheckWin());
				return;
			}

			dispatch(onCheckClickedCardsMatchTrue());

			setTimeout(() => {
				dispatch(onCheckClickedCardsMatchFalse());
			}, 2000);
		}
	};

	const onNewMemoryGame = () => {
		dispatch(onCloseModal());
		dispatch(onSetGameCards());
		dispatch(onSetBackcard());
	};

	return {
		allCards,
		gameCards,
		allPlayerCards,
		backCard,
		clickedCards,
		matchedCards,
		flipCount,
		isPlaying,
		isWin,

		startGettingCards,
		startClickCard,
		onNewMemoryGame,
	};
};
