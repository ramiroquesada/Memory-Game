import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModalLose, onOpenModalSelectGameMode, onOpenModalWin, onSetGameMode, onOpenModalOnlineRecords, onCloseModalOnlineRecords, onOpenModalNewRecord, onCloseModalNewRecord, onSetOnlineRecords } from "../redux/uiSlice";
import { rankingApi } from "../api/rankingApi";

export const useUiStore = () => {

	const dispatch = useDispatch();
	const {isModalOpen, msg, gameMode, isRecordsModalOpen, isNewRecordModalOpen, onlineRecords} = useSelector(state => state.ui);



	

	const openModalWin = () => {
		dispatch( onOpenModalWin() )
	}
	const openModalLose = () => {
		dispatch( onOpenModalLose() )
	}

	const openModalSelectGameMode = () => {
		dispatch( onOpenModalSelectGameMode() )
	}

	const closeModal = () => {
		dispatch( onCloseModal() )
	}

	const changeGameMode = (mode) => {
			
		dispatch( onSetGameMode(mode) );
	}

	const openModalRecords = () => {
		dispatch(onOpenModalOnlineRecords());
	}

	const closeModalRecords = () => {
		dispatch(onCloseModalOnlineRecords())
	}

	const openModalNewRecord = () => {
		dispatch(onOpenModalNewRecord());
	}

	const closeModalNewRecord = () => {
		dispatch(onCloseModalNewRecord())
	}



	const startGettingOnlineRecords = async() => {
		try {
			const resp = await rankingApi.get('/all');
			const {data} = resp
			dispatch( onSetOnlineRecords(data) )
		} catch (error) {
			console.log({error})
		}
	}

	const startPostingNewRecord = async( newRecord) => {
		try {

			const resp = await rankingApi.post('/new', newRecord);

			const {data} = resp

			if (data !== onlineRecords){
				dispatch(onSetOnlineRecords(null))
			}


			return data

		} catch (error) {
			console.log(error)
		}
	}

	return {
		isModalOpen,
		msg,
		gameMode,
		isRecordsModalOpen,
		isNewRecordModalOpen,
		onlineRecords,

		openModalWin,
		openModalLose,
		closeModal,
		changeGameMode,		
		openModalSelectGameMode,
		startGettingOnlineRecords,
		openModalRecords,
		closeModalRecords,
		startPostingNewRecord,
		openModalNewRecord,
		closeModalNewRecord
		
	};
};