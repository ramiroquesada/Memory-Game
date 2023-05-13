import Modal from 'react-modal';
import { useUiStore } from '../hooks/useUiStore';
import { Button } from '@mui/material';
import { useGameStore } from '../hooks/useGameStore';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

export const UiModal = () => {

	const { isModalOpen } = useUiStore();
	const { onNewGame} = useGameStore();
	
	const onRestartGame = () => {
		onNewGame()

	}

	return (
		<Modal
			isOpen={isModalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}>
			<div>
				<Button
					onClick={onRestartGame}
				>Restart</Button>
			</div>
		</Modal>
	);
};
