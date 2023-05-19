import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isModalOpen: false,
		msg: null,
		lastView: null,
		gamemode: null,
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
			state.gamemode = payload;
			state.lastView = payload;

		}
		

	},
})

export const { onOpenModalWin, onOpenModalLose, onCloseModal, onSetGameMode } = uiSlice.actions