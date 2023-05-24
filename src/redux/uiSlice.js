import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isModalOpen: false,
		msg: null,
		gameMode: null,
		isRecordsModalOpen: false,
		isNewRecordModalOpen: false,
		onlineRecords: null,
	},

	reducers: {

		onOpenModalWin: (state) => {
			state.msg = 'Felicidades, ganaste 😎😎😎';
			state.isModalOpen = true;
		},
		onOpenModalLose: (state) => {
			state.msg = 'Lástima, perdiste 😂😂😂';
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
		},
		onOpenModalNewRecord: (state) => {
			state.isNewRecordModalOpen = true;
		},

		onCloseModalNewRecord: (state) => {
			state.isNewRecordModalOpen = false;
		},
		
		onSetOnlineRecords: (state, {payload}) => {
			state.onlineRecords = payload
		}
		

	},
})

export const { onOpenModalWin, onOpenModalLose, onCloseModal, onSetGameMode, onOpenModalSelectGameMode, onOpenModalOnlineRecords, onCloseModalOnlineRecords, onOpenModalNewRecord, onCloseModalNewRecord, onSetOnlineRecords } = uiSlice.actions