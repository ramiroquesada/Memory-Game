import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isModalOpen: false,
		msg: null,
		lastView: 'game1'
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
		

	},
})

export const { onOpenModalWin, onOpenModalLose, onCloseModal, msg, isModalOpen } = uiSlice.actions