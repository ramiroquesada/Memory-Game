import Modal from 'react-modal';
import { useUiStore } from '../hooks/useUiStore';
import { Button, Typography } from '@mui/material';
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
				<h2>{msg}</h2>
			<Button onClick={onRestartGame}>Jugar de nuevo</Button>
		</Modal>
	);
};
