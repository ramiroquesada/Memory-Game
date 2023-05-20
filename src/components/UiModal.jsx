import { useState } from 'react';
import { useUiStore } from '../hooks/useUiStore';
import Modal from 'react-modal';
import { Button, Typography } from '@mui/material';
import { useGameStore } from '../hooks/useGameStore';
import JSConfetti from 'js-confetti';
import { useMemoryStore } from '../hooks/useMemoryStore';

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
	const { isModalOpen, msg, gameMode, changeGameMode } = useUiStore();
	const { onNewGame, isWin } = useGameStore();

	const { isWin : isMemoryWin } = useMemoryStore()

	const [gameModeNull, setGameModeNull] = useState(
		gameMode === null ? true : false
	);

	const onRestartGame = () => {
		onNewGame();
	};

	if (isWin || isMemoryWin) {
		const jsConfetti = new JSConfetti();

		jsConfetti.addConfetti();
	}

	const selectGamemode1 = () => {
		changeGameMode(1)
	}

	const selectGamemode2 = () => {
		changeGameMode(2)

	}


	return (
		<Modal
			isOpen={isModalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}>
			{gameModeNull ? (
				<div className="modalContainer">
					<h2>Selecciona el Modo de Juego</h2>
					<div className='selectGameModeButtonsContainer'>
						<div>
						<Typography variant='body1'>Selecciona sin repetir</Typography>
						<Button variant="contained" onClick={selectGamemode1}>
							Jugar
						</Button>
						</div>
						<div>
						<Typography variant='body1'>Encuentra las parejas</Typography>
						<Button variant="contained" onClick={selectGamemode2}>
							Jugar
						</Button>
						</div>
					</div>
				
				</div>
			) : (
				<div className="modalContainer">
					<h2>{msg}</h2>
					<Button variant="contained" onClick={onRestartGame}>
						Jugar de nuevo
					</Button>
				</div>
			)}
		</Modal>
	);
};
