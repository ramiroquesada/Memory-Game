import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isModalOpen: false,
		msg: null,
		gameMode: null,
	},

	reducers: {

		onOpenModalWin: (state) => {
			state.msg = 'Felicidades ganaste 😎';
			state.isModalOpen = true;
		},
		onOpenModalLose: (state) => {
			state.msg = 'Lástima perdiste 😂';
			state.isModalOpen = true;
		},
		onCloseModal: (state) => {
			state.isModalOpen = false;
			state.msg = null;
		},

		onSetGameMode: (state, {payload}) => {
			state.gameMode = payload;
			state.isModalOpen = false;

		},

		onOpenModalSelectGameMode: (state) => {
			state.isModalOpen = true;
		},
		

	},
})

export const { onOpenModalWin, onOpenModalLose, onCloseModal, onSetGameMode, onOpenModalSelectGameMode } = uiSlice.actions