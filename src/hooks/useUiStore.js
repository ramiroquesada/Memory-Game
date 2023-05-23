import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModalLose, onOpenModalSelectGameMode, onOpenModalWin, onSetGameMode, onOpenModalOnlineRecords, onCloseModalOnlineRecords } from "../redux/uiSlice";
import { rankingApi } from "../api/rankingApi";

export const useUiStore = () => {

	const dispatch = useDispatch();
	const {isModalOpen, msg, gameMode, isRecordsModalOpen} = useSelector(state => state.ui);



	

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

	const startGettingOnlineRecords = async() => {
		try {
			const resp = await rankingApi.get('/leaderboard');
			const {data} = resp
			console.log(data)
			return data
		} catch (error) {
			console.log({error})
		}
	}

	return {
		isModalOpen,
		msg,
		gameMode,
		isRecordsModalOpen,

		openModalWin,
		openModalLose,
		closeModal,
		changeGameMode,		
		openModalSelectGameMode,
		startGettingOnlineRecords,
		openModalRecords,
		closeModalRecords
		
	};
};