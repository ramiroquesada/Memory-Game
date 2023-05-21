import { useEffect, useLayoutEffect, useState } from 'react';
import { useMemoryStore } from '../hooks/useMemoryStore';
import { useCronometroStore } from '../hooks/useCronometroStore';

export const Cronometro = () => {

	const { minutos, segundos, milisegundos, corriendo, handleIniciar, handleParar, handleReiniciar } = useCronometroStore()

	const { isPlaying, isWin, flipCount } = useMemoryStore();

	const [ secondClass, setSecondClass ] = useState(false)

	useEffect(() => {
		if (flipCount < 1) {
			// reset();
			// pause();
			handleReiniciar();
		}

		if (isPlaying && flipCount > 0) {
			// reset();
			// start();
			handleIniciar();
		}

		if (isWin) {
			// pause();
			handleParar();
		}

		if (!isWin && !isPlaying) {
			handleParar();
		}
	}, [isPlaying, isWin]);

	useLayoutEffect(() => {
		
		if (corriendo){
			setSecondClass(!secondClass)
		}
		
	}, [minutos])

	return (
		<div style={{ textAlign: 'center', height: '1.25rem', display: `${segundos > 0 || milisegundos > 0 ? 'flex' : 'none'}`, alignItems: 'center', justifyContent: 'center' }}>
			<p style={{ margin: '0', padding: '0'  }}>
			{minutos > 0 && <span>{minutos.toString().padStart(2, '0')} : </span>}
				<span >{segundos.toString().padStart(2, '0')} : </span>
				<span >{milisegundos.toString().padStart(2, '0')}</span>
			</p>
		</div>
	);
}
