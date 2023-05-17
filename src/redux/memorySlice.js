import { createSlice } from '@reduxjs/toolkit'

export const memorySlice = createSlice({
	name: 'memory',
	initialState: {
		allCards: [],
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

		onSetGameCards: (state) => {
			state.isWin = false;

			state.matchedCards = [];
			state.clickedCards = [];

			const newArray = [...state.allCards]?.sort(
				() => Math.random() - 0.5
			);

			state.gameCards = newArray ;

			state.gameOver = false;
		},

		
	},
})

export const { onSetAllCards, onSetGameCards } = memorySlice.actions