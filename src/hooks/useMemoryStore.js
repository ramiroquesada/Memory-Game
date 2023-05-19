import { useDispatch, useSelector } from 'react-redux';
import { valoApi, playerCardsApi } from '../api/valoApi';
import {
	onSetAllCards,
	onSetAllPlayerCards,
	onSetBackcard,
	onSetGameCards,
	onFlipClickedCard,
	
	onCheckClickedCardsMatch,
} from '../redux/memorySlice';

// import {
// 	onCloseModal,
// 	onOpenModalWin,
// 	onOpenModalLose,
// } from '../redux/uiSlice';

export const useMemoryStore = () => {
	const dispatch = useDispatch();

	const { allCards, gameCards, matchedCards, allPlayerCards, backCard, clickedCards, flipCount  } = useSelector(
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
		if (card.flipped) {return;}
		else{


			dispatch(onFlipClickedCard(card));

			setTimeout(() => {
				
				dispatch( onCheckClickedCardsMatch())
			}, 2000);
			
			
			
			
		}
	};

	

	return {
		allCards,
		gameCards,
		allPlayerCards,
		backCard,
		clickedCards,
		matchedCards,
		flipCount,

		startGettingCards,
		startClickCard,
	};
};
