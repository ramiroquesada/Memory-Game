import Modal from 'react-modal';

import {
	Button,
	FormControl,
	Input,
	InputLabel,
	TextField,
	Typography,
} from '@mui/material';
import { useUiStore } from '../hooks/useUiStore';
import { useCronometroStore } from '../hooks/useCronometroStore';
import { useForm } from '../hooks/useForm';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: '50%',
		bottom: '50%',
	},
};

Modal.setAppElement('#root');

const formData = {
	name: '',
};

export const NuevoRecordModal = () => {
	
	const { isNewRecordModalOpen, gameMode, closeModalNewRecord, closeModal } =
	useUiStore();
	
	const {minutos, segundos, milisegundos} = useCronometroStore()
	const { name, onInputChange, formState } = useForm(formData);

	const handleCloseRankingModal = () => {
		closeModalNewRecord();
	};

	const handleRecordSubmit = () => {
		console.log(formState);
	};

	return (
		<Modal
			isOpen={isNewRecordModalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
			onRequestClose={handleCloseRankingModal}>
			<div className="modalContainer">
				<form onSubmit={handleRecordSubmit} style={{margin: '2rem 1rem 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
					<TextField
						name="name"
						onChange={onInputChange}
						label="Nombre"
						placeholder="Tu nombre"
						type="text"
						value={name}
						/>

					<Typography>
					
					
					Tu tiempo:  <strong>{`${minutos}:${segundos}:${milisegundos}`}</strong>
					Clicks: <strong></strong>
					
					</Typography>
					
					<Button variant="contained" fullWidth onClick={handleRecordSubmit}>Publicar</Button>
				</form>
			</div>
		</Modal>
	);
};
