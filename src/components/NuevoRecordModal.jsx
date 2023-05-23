import Modal from 'react-modal';

import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useUiStore } from '../hooks/useUiStore';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: '50%',
		bottom: '50%',
	},
};

Modal.setAppElement('#root');

export const NuevoRecordModal = () => {
	const {
		isNewRecordModalOpen,
		gameMode,
		closeModalNewRecord,
	} = useUiStore();

	const handleCloseRankingModal = () => {
		closeModalNewRecord();
	};

	return (
		<Modal
			isOpen={isNewRecordModalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
			onRequestClose={handleCloseRankingModal}>
				<div className='modalContainer'>
					<FormControl >
				<InputLabel aria-label='Nombre'>Nombre</InputLabel>
				<Button variant='outlined'></Button>
			</FormControl>
				</div>
			
		</Modal>
	);
};
