import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModalLose, onOpenModalWin } from "../redux/uiSlice";

export const useUiStore = () => {

	const dispatch = useDispatch();

	const {isModalOpen, msg} = useSelector(state => state.ui);


	const openModalWin = () => {
		dispatch( onOpenModalWin() )
	}
	const openModalLose = () => {
		dispatch( onOpenModalLose() )
	}

	const closeModal = () => {
		dispatch( onCloseModal() )
	}

	return {
		isModalOpen,
		msg,

		openModalWin,
		openModalLose,
		closeModal,
	};
};