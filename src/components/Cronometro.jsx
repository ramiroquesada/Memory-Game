import { useEffect, useLayoutEffect, useState } from 'react';
import { useMemoryStore } from '../hooks/useMemoryStore';
import { useCronometroStore } from '../hooks/useCronometroStore';
import { useGameStore } from '../hooks/useGameStore';

export const Cronometro = () => {

	const { minutos, segundos, milisegundos, corriendo, handleIniciar, handleParar, handleReiniciar } = useCronometroStore()

	const { isPlaying: isMemoryPlaying, isWin: isMemoryWin, flipCount: memoryFlipCount } = useMemoryStore();

	const { isPlaying : isGamePlaying, isWin: isGameWin, clickedCards: gameClickedCards } = useGameStore();

	const [ secondClass, setSecondClass ] = useState(false)

	useEffect(() => {
		if (memoryFlipCount < 1 ) {
			// reset();
			// pause();
			handleReiniciar();
		}

		if (isMemoryPlaying && memoryFlipCount > 0) {
			// reset();
			// start();
			handleIniciar();
		}

		if (isMemoryWin) {
			// pause();
			handleParar();
		}

		if (!isMemoryWin && !isMemoryPlaying) {
			handleParar();
		}
	}, [isMemoryPlaying, isMemoryWin]);

	useEffect(() => {
		if (gameClickedCards.length < 1 ) {
			// reset();
			// pause();
			handleReiniciar();
		}

		if (isGamePlaying && gameClickedCards.length > 0) {
			// reset();
			// start();
			handleIniciar();
		}

		if (isGameWin) {
			// pause();
			handleParar();
		}

		if (!isGameWin && !isGamePlaying) {
			handleParar();
		}
	}, [isGamePlaying, isGameWin, gameClickedCards]);

	useLayoutEffect(() => {
		
		if (corriendo){
			setSecondClass(!secondClass)
		}
		
	}, [minutos])

	return (
		<div style={{ textAlign: 'right', height: '1.25rem', display: `${segundos > 0 || milisegundos > 0 ? 'block' : 'none'}`, alignItems: 'center', justifyContent: 'center' }}>
			<p style={{ margin: '0', padding: '0' }}>
			{minutos > 0 && <span>{minutos.toString().padStart(2, '0')} : </span>}
				<span >{segundos.toString().padStart(2, '0')} : </span>
				<span >{milisegundos.toString().padStart(2, '0')}</span>
			</p>
		</div>
	);
}
