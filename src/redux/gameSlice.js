import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		cards: [],
		clickedCards: [],
		gameOver: false
	},

	reducers: {

		onSetCards: (state, {payload}) => {
			state.cards =  payload;
		},

		onSelectCard: (state, {payload}) => {
			if (state.clickedCards.includes(payload)) {
				state.gameOver = true;
				return
			}

			state.clickedCards = clickedCards.push(payload)
		}

		
	},
})

export const { onSetCards, onSelectCard } = gameSlice.actions