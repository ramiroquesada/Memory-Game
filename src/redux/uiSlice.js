import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isModalOpen: false,
		msg: null,
		gameMode: null,
		isRecordsModalOpen: false,
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

		onOpenModalOnlineRecords: (state) => {
			state.isRecordsModalOpen = true;
		},

		onCloseModalOnlineRecords: (state) => {
			state.isRecordsModalOpen = false;
		}
		

	},
})

export const { onOpenModalWin, onOpenModalLose, onCloseModal, onSetGameMode, onOpenModalSelectGameMode, onOpenModalOnlineRecords, onCloseModalOnlineRecords } = uiSlice.actions