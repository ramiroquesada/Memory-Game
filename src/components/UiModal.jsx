import { useMemo, useEffect } from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { useUiStore } from '../hooks/useUiStore';
import JSConfetti from 'js-confetti';
import { Button, Typography } from '@mui/material';
import { useGameStore } from '../hooks/useGameStore';
import { useMemoryStore } from '../hooks/useMemoryStore';
import { useCronometroStore } from '../hooks/useCronometroStore';
import { timeToMs } from '../helpers/timeToMs';

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
	const { minutos, segundos, milisegundos } = useCronometroStore();

	const { isModalOpen, msg, gameMode, changeGameMode, openModalNewRecord } =
		useUiStore();
	const { onNewGame, isWin, gameOver, clickedCards } = useGameStore();

	const { isWin: isMemoryWin, onNewMemoryGame, flipCount } = useMemoryStore();

	const [gameModeNull, setGameModeNull] = useState(
		gameMode === null ? true : false
	);

	const [isNewRecord, setIsNewRecord] = useState(false);

	const recordData = useMemo(() => {
		const time = {
			minutes: minutos,
			seconds: segundos,
			miliseconds: milisegundos,
		};

		if (isMemoryWin) {
			const clicks = flipCount;

			return {
				clicks,
				time,
			};
		} else if (gameOver) {
			const clicks = clickedCards.length;

			return {
				clicks,
				time,
			};
		}
	});

	const onRestartGame = () => {
		if (gameOver) {
			onNewGame();
		} else if (isMemoryWin) {
			onNewMemoryGame();
		}
	};

	useEffect(() => {
		if (isWin || isMemoryWin) {
			const jsConfetti = new JSConfetti();

			for (let i = 0; i <= 2; i++) {
				setTimeout(() => {
					jsConfetti.addConfetti();
				}, 1200 * +i);
				jsConfetti.clearCanvas();
			}
		}

		const lsMemoryRecord = JSON.parse(localStorage.getItem('memoryRecord'));
		const lsGameRecord = JSON.parse(localStorage.getItem('gameRecord'));

		if (isMemoryWin) {
			const currentMs = timeToMs(recordData.time);

			if (!lsMemoryRecord) {
				setIsNewRecord(true);
			} else {
				const lsMemoryMs = timeToMs(lsMemoryRecord.time);
				if (currentMs < lsMemoryMs) {
					setIsNewRecord(true);
				} else if (
					recordData.clicks <= lsMemoryRecord.clicks &&
					currentMs <= lsMemoryMs
				) {
					setIsNewRecord(true);
				}
			}
		} else if (gameOver) {
			const currentMs = timeToMs(recordData.time);
			if (!lsGameRecord) {
				setIsNewRecord(true);
			} else {
				const lsGameMs = timeToMs(lsGameRecord.time);
				if (recordData.clicks > lsGameRecord.clicks) {
					setIsNewRecord(true);
				} else if (
					recordData.clicks >= lsGameRecord.clicks &&
					currentMs <= lsGameMs
				) {
					setIsNewRecord(true);
				}
			}
		}
	}, [isWin, isMemoryWin]);

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
					<h2 style={{ margin: '1rem 0 0 0' }}>{msg}</h2>
					<Typography textAlign={'center'}>
						Tu tiempo:{' '}
						<strong>
							{recordData.time.minutes} :{' '}
							{recordData.time.seconds} :{' '}
							{recordData.time.miliseconds}
						</strong>
						<br />
						Clicks: <strong>{recordData.clicks}</strong>
					</Typography>

					{isNewRecord && (
						<>
							<Typography
								textAlign={'center'}
								className="newRecordMsg">
								<strong>NUEVO RECORD</strong>
							</Typography>
							<Button
								variant="contained"
								onClick={onClickNewRecord}>
								Publicar Record
							</Button>
						</>
					)}

					<Button variant="outlined" onClick={onRestartGame}>
						Jugar de nuevo
					</Button>
				</div>
			)}
		</Modal>
	);
};
