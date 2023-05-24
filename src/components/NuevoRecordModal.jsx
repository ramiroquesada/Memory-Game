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
import { useMemo } from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { useMemoryStore } from '../hooks/useMemoryStore';
import Swal from 'sweetalert2';

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
	const { isNewRecordModalOpen, gameMode, closeModalNewRecord, closeModal, startPostingNewRecord } =
		useUiStore();

	const { minutos, segundos, milisegundos } = useCronometroStore();

	const { onNewGame, gameOver, clickedCards } = useGameStore();

	const { isWin: isMemoryWin, onNewMemoryGame, flipCount } = useMemoryStore();

	const { name, onInputChange, formState } = useForm(formData);

	const recordData = useMemo(() => {
		const time = {
			minutes: minutos,
			seconds: segundos,
			miliseconds: milisegundos,
		};

		if (isMemoryWin) {
			const clicks = flipCount;
			const date = new Date().getTime();
			const gameMode = { modeName: 'Memory Match', modeId: 2 };

			return {
				clicks,
				date,
				gameMode,
				time
			}

		}else if(gameOver){
			const clicks = clickedCards.length;
			const date = new Date().getTime();
			const gameMode = { modeName: 'Memory All', modeId: 1 };

			return {
				clicks,
				date,
				gameMode,
				time
			}
		}

		
	});

	const handleCloseRankingModal = () => {
		closeModalNewRecord();
	};

	const handleRecordSubmit = async() => {
		const newRecord = { ...formState, ...recordData };
		const recordPosted = await startPostingNewRecord(newRecord);
		if(recordPosted){
			Swal.fire('Record posteado!', 'Revisa el ranking para ver si eres de los mejores', 'success')
			closeModalNewRecord()
		if( isMemoryWin ){
			onNewMemoryGame();
		}else if(gameOver){
			onNewGame()
		}
		}
		
	};

	return (
		<Modal
			isOpen={isNewRecordModalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modalNuevoRecord-fondo"
			closeTimeoutMS={200}
			onRequestClose={handleCloseRankingModal}>
			<div className="modalContainer">
				<form
					onSubmit={handleRecordSubmit}
					style={{
						margin: '2rem 1rem 1rem 1rem',
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
					}}>
					

					<Typography textAlign={'center'}>
						Tu tiempo: <strong>{recordData.time.minutes} : {recordData.time.seconds} : {recordData.time.miliseconds}</strong>
						<br />
						Clicks: <strong>{recordData.clicks}</strong>
					</Typography>
					<TextField
						name="name"
						onChange={onInputChange}
						label="Tu nombre"
						placeholder="Nombre"
						type="text"
						value={name}
					/>
					<Button
						style={{marginTop: '1rem'}}
						variant="contained"
						fullWidth
						onClick={handleRecordSubmit}>
						Publicar Record
					</Button>
				</form>
			</div>
		</Modal>
	);
};
