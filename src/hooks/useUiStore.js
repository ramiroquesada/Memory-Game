import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModalLose, onOpenModalWin, onSetGameMode } from "../redux/uiSlice";

export const useUiStore = () => {

	const dispatch = useDispatch();

	const {isModalOpen, msg, lastView, gameMode} = useSelector(state => state.ui);


	const startGettingGameMode = () => {
		let localStorageLastView = localStorage.getItem('lastView')

		if (localStorageLastView == null) {
			
			dispatch(onSetGameMode(null));
			localStorage.setItem('lastView', null);

		}else{
			dispatch(onSetGameMode(localStorageLastView));

		}
		
		

	};
	

	const openModalWin = () => {
		dispatch( onOpenModalWin() )
	}
	const openModalLose = () => {
		dispatch( onOpenModalLose() )
	}

	const closeModal = () => {
		dispatch( onCloseModal() )
	}

	const changeGameMode = (mode) => {
		

		
		dispatch( onSetGameMode(mode) );
		localStorage.setItem('lastView', mode);
	}

	return {
		isModalOpen,
		msg,
		gameMode,
		lastView,

		openModalWin,
		openModalLose,
		closeModal,
		changeGameMode,
		startGettingGameMode,
		
	};
};