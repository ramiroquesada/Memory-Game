import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModalLose, onOpenModalSelectGameMode, onOpenModalWin, onSetGameMode } from "../redux/uiSlice";

export const useUiStore = () => {

	const dispatch = useDispatch();
	const {isModalOpen, msg, gameMode} = useSelector(state => state.ui);



	

	const openModalWin = () => {
		console.log('modalwin')
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

	return {
		isModalOpen,
		msg,
		gameMode,

		openModalWin,
		openModalLose,
		closeModal,
		changeGameMode,		
		openModalSelectGameMode,
		
	};
};