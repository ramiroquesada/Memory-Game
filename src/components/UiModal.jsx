import Modal from 'react-modal';
import { Button } from '@mui/material';
import { useUiStore } from '../hooks/useUiStore';
import { useGameStore } from '../hooks/useGameStore';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: '50%',
		bottom: '50%',
	},
};

Modal.setAppElement('#root');

export const UiModal = () => {
	const { isModalOpen, msg } = useUiStore();
	const { onNewGame } = useGameStore();

	const onRestartGame = () => {
		onNewGame();
	};

	return (
		<Modal
			isOpen={isModalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}>
			<div className="modalContainer">
				<h2>{msg}</h2>
				<Button variant="contained" onClick={onRestartGame}>
					Jugar de nuevo
				</Button>
			</div>
		</Modal>
	);
};
