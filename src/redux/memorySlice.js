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
			state.clickedCards = [];

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

			state.gameCards = updatedGameCards;
		},

		onCheckClickedCardsMatch: (state) => {
			if (state.clickedCards.length === 2) {
				const [card1, card2] = state.clickedCards;

				if (card1.displayName === card2.displayName) {
					state.matchedCards.push(card1, card2);
				} else {
					// Voltear las cartas después de 2 segundos

					const newGameCards = state.gameCards.map((card) => {
						if (
							card.uuid === card1.uuid ||
							card.uuid === card2.uuid
						) {
							return {
								...card,
								flipped: false,
							};
						}
						return card;
					});

					
						state.gameCards = newGameCards;
						state.clickedCards = [];
						
					
				}

				state.clickedCards = [];
			}
		},
	},
});

export const {
	onSetAllCards,
	onSetGameCards,
	onSetAllPlayerCards,
	onSetBackcard,
	onFlipClickedCard,
	onCheckClickedCardsMatch,
} = memorySlice.actions;
