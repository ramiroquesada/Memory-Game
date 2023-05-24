import { useState } from 'react';
import { useUiStore } from '../hooks/useUiStore';
import Modal from 'react-modal';
import JSConfetti from 'js-confetti';
import { Button, Typography } from '@mui/material';
import { useGameStore } from '../hooks/useGameStore';
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
	const { isModalOpen, msg, gameMode, changeGameMode, openModalNewRecord, closeModal } = useUiStore();
	const { onNewGame, isWin, gameOver, clickedCards } = useGameStore();

	const { isWin: isMemoryWin, onNewMemoryGame } = useMemoryStore();

	const [gameModeNull, setGameModeNull] = useState(
		gameMode === null ? true : false
	);

	const onRestartGame = () => {
		if (gameOver) {
			onNewGame();
		} else if (isMemoryWin) {
			onNewMemoryGame();
		}
	};

	if (isWin || isMemoryWin) {
		const jsConfetti = new JSConfetti();

		for (let i = 0; i <= 2; i++) {
			setTimeout(() => {
				jsConfetti.addConfetti();
			}, 1200 * +i);
			jsConfetti.clearCanvas();
		}
	}

	const selectGamemode1 = () => {
		changeGameMode(1);
	};

	const selectGamemode2 = () => {
		changeGameMode(2);
	};

	const onClickNewRecord = () => {
		openModalNewRecord();
	};

	return (
		<Modal
			isOpen={isModalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}>
			{gameModeNull ? (
				<div className="modalContainer">
					<h2>ELIGE UN MODO DE JUEGO</h2>
					<div className="selectGameModeButtonsContainer">
						<div>
							<Typography variant="body1">
								Selecciona sin repetir
							</Typography>
							<Button
								variant="contained"
								fullWidth
								onClick={selectGamemode1}>
								Jugar
							</Button>
						</div>
						<div>
							<Typography variant="body1">
								Encuentra las parejas
							</Typography>
							<Button
								variant="contained"
								fullWidth
								onClick={selectGamemode2}>
								Jugar
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div className="modalContainer">
					<Typography marginTop={'1rem'}>{msg}</Typography>

					<Button variant="contained" onClick={onClickNewRecord}>
						Publicar Record
					</Button>
					<Button variant="outlined" onClick={onRestartGame}>
						Jugar de nuevo
					</Button>
				</div>
			)}
		</Modal>
	);
};
