import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		allCards: [],
		gameCards: [],
		clickedCards: [],
		gameOver: false,
		record: 0,
		isWin: false,
	},

	reducers: {
		onSetAllCards: (state, { payload }) => {
			state.allCards = payload;
		},

		onSelectCard: (state, { payload }) => {
			state.clickedCards.push(payload);
		},

		onGameOver: (state) => {
			state.gameOver = true;
		},

		shuffleCards: (state) => {
			const allCards = state.allCards;
			const clickedCards = state.clickedCards;

			const nonClickedCards = allCards.filter(
				(card) => !clickedCards.includes(card)
			);

			let gameCards = [...allCards]
				.sort(() => Math.random() - 0.5)
				.slice(0, 9);

			while (!nonClickedCards.some((card) => gameCards.includes(card))) {
				gameCards = [...allCards]
					.sort(() => Math.random() - 0.5)
					.slice(0, 9);
			}

			state.gameCards = gameCards;
		},

		onSetGameCards: (state) => {
			state.isWin = false;

			state.clickedCards = [];

			const newArray = [...state.allCards]?.sort(
				() => Math.random() - 0.5
			);

			state.gameCards = newArray.slice(0, 9);

			state.gameOver = false;
		},

		onSetNewRecord: (state, { payload }) => {
			state.record = payload;
		},

		onWin: (state) => {
			state.isWin = true;
		},

		onLose: (state) => {
			state.isWin = false;
		},
	},
});

export const {
	onSetAllCards,
	onSelectCard,
	onGameOver,
	shuffleCards,
	onSetGameCards,
	onSetNewRecord,
	onWin,
	onLose,
} = gameSlice.actions;
