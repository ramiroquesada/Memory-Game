import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		allCards: [],
		gameCards:[],
		clickedCards: [],
		gameOver: false,
		record : 0,
	},

	reducers: {

		onSetAllCards: (state, {payload}) => {
			state.allCards =  payload;
		},

		onSelectCard: (state, {payload}) => {
			
			state.clickedCards.push(payload.displayName)
		},

		onGameOver: (state) => {
			state.gameOver = true;
		},

		shuffleCards: (state) => {

			const newArray = [...state.allCards]?.sort(() => Math.random() - 0.5);

			state.gameCards = newArray.slice(0, 9);
		},

		onSetGameCards: (state) => {

			state.clickedCards = [];

			const newArray = [...state.allCards]?.sort(() => Math.random() - 0.5);

			state.gameCards = newArray.slice(0, 9);

			state.gameOver = false;
		},

		onSetNewRecord: (state, {payload}) => {
			state.record = payload
		}

		
	},
})

export const { onSetAllCards, onSelectCard, onGameOver, shuffleCards, onSetGameCards, onSetNewRecord } = gameSlice.actions