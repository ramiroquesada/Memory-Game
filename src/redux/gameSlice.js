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
		isPlaying: false,
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
			state.isPlaying = false;
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
			state.isPlaying = false;
			state.gameOver = false;

			state.clickedCards = [];

			const newArray = [...state.allCards]?.sort(
				() => Math.random() - 0.5
			);

			state.gameCards = newArray.slice(0, 9);

		},

		onSetNewRecord: (state, { payload }) => {
			state.record = payload;
		},

		onWin: (state) => {
			state.isWin = true;
			state.isPlaying = false;

		},

		
		onStartTimer: (state) => {
			state.isPlaying = true;
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
	onStartTimer
} = gameSlice.actions;
