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
		clickedCard: [],
		gameOver: false,
		record: null,
		isWin: false,
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

			state.matchedCards = [];
			state.clickedCard = [];

			const newArray = [...state.allCards]
				?.sort(() => Math.random() - 0.5)
				.slice(0, 10);

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

		onClickCard: (state, { payload }) => {
			if (state.clickedCard.length === 2) {
				const newGameCards = state.gameCards.map((card) => {
					if (card.flipped && state.matchedCards.includes(card)) {
						console.log('2');
						return card;
					} else {
						return {
							...card,
							flipped: false,
						};
					}
				});
				state.clickedCard = [];
				state.gameCards = newGameCards;
			} else if (
				state.clickedCard.length === 1 &&
				state.clickedCard[0].displayName === payload.displayName
			) {
				state.matchedCards.push(...state.clickedCard[0], {
					...payload,
					flipped: true,
				});
			} else {
				const newCards = state.gameCards.map((card) => {
					if (card.uuid != payload.uuid) {
						return card;
					} else {
						return {
							...card,
							flipped: true,
						};
					}
				});

				state.clickedCard.push({
					...payload,
					flipped: true,
				});

				state.gameCards = newCards;
			}
		},
	},
});

export const {
	onSetAllCards,
	onSetGameCards,
	onSetAllPlayerCards,
	onSetBackcard,
	onClickCard,
} = memorySlice.actions;
