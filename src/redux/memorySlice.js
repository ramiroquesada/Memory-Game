import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const memorySlice = createSlice({
	name: 'memory',
	initialState: {
		allCards: [],
		allPlayerCards: [],
		backCard: [],
		gameCards: [],
		matchedCards: [],
		clickedCards: [],
		gameOver: false,
		flipCount: 0,
		record: null,
		isWin: false,
		isPlaying: false,
	},

	reducers: {
		onSetAllCards: (state, { payload }) => {
			state.allCards = payload;
		},

		onSetAllPlayerCards: (state, { payload }) => {
			state.allPlayerCards = payload;
		},

		onSetBackcard: (state) => {
			const newArray = [...state.allPlayerCards]
				?.sort(() => Math.random() - 0.5)
				.slice(0, 1);

			state.backCard = newArray;
		},

		onSetGameCards: (state) => {
			state.isWin = false;
			state.isPlaying = false;
			state.flipCount = 0;
			state.matchedCards = [];
			state.clickedCards = [];

			const newArray = [...state.allCards]
				?.sort(() => Math.random() - 0.5)
				.slice(0, 1); //////////////////////////////////////12 EN VEZ DE 1

			const newArray2 = [...newArray, ...newArray];

			const newArray3 = newArray2.map((card) => {
				return {
					...card,
					uuid: uuidv4(),
					flipped: false,
				};
			});

			state.gameCards = newArray3.sort(() => Math.random() - 0.5);

			state.gameOver = false;
		},

		onFlipClickedCard: (state, { payload }) => {
			const updatedGameCards = state.gameCards.map((card) => {
				if (card.uuid === payload.uuid) {
					state.clickedCards.push({
						...card,
						flipped: true,
					});
					return {
						...card,
						flipped: true,
					};
				} else {
					return card;
				}
			});

			state.flipCount = state.flipCount + 1;

			state.gameCards = updatedGameCards;
		},

		onCheckClickedCardsMatchTrue: (state) => {
			const [card1, card2] = state.clickedCards;

			state.matchedCards.push(card1, card2);

			const updatedGameCards = state.gameCards.map((card) => {
				if (card.uuid === card1.uuid || card.uuid === card2.uuid) {
					return {
						...card,
						flipped: true,
						matched: true,
					};
				}
				return card;
			});

			state.gameCards = updatedGameCards;
			state.clickedCards = [];
		},
		onCheckClickedCardsMatchFalse: (state) => {
			const [card1, card2] = state.clickedCards;

			const resetGameCards = state.gameCards.map((card) => {
				if (card.uuid === card1.uuid || card.uuid === card2.uuid) {
					return {
						...card,
						flipped: false,
						matching: false,
					};
				}
				return card;
			});

			state.gameCards = resetGameCards;
			state.clickedCards = [];
		},

		onClickedAddMatchingClass: (state) => {
			const [card1, card2] = state.clickedCards;

			const resetGameCards = state.gameCards.map((card) => {
				if (card.uuid === card1.uuid || card.uuid === card2.uuid) {
					return {
						...card,
						matching: true,
					};
				}
				return card;
			});

			state.gameCards = resetGameCards;
		},

		onStartTimer: (state) => {
			state.isPlaying = true;
		},

		onCheckWin: (state) => {
			state.isWin = true;
			state.isPlaying = false;
		},
	},
});

export const {
	onSetAllCards,
	onSetGameCards,
	onSetAllPlayerCards,
	onSetBackcard,
	onFlipClickedCard,
	onCheckClickedCardsMatchTrue,
	onCheckClickedCardsMatchFalse,
	onStartTimer,
	onCheckWin,
	onClickedAddMatchingClass,
} = memorySlice.actions;
