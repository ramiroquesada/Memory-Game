import { useEffect, useLayoutEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useMemoryStore } from '../hooks/useMemoryStore';

export default function MyStopwatch(data) {
	const { seconds, minutes, isRunning, start, pause, reset } =
		useStopwatch({ autoStart: false });

	const { isPlaying, isWin, flipCount } = useMemoryStore();

	const [ secondClass, setSecondClass ] = useState(false)

	useEffect(() => {
		if (flipCount < 1) {
			reset();
			pause();
		}

		if (isPlaying && flipCount > 0) {
			reset();
			start();
		}

		if (isWin) {
			pause();
		}

		if (!isWin && !isPlaying) {
			reset();
			pause();
		}
	}, [isPlaying, isWin]);

	useLayoutEffect(() => {
		
		if (isRunning){
			setSecondClass(!secondClass)
		}
		
	}, [seconds])

	return (
		<div style={{ textAlign: 'center', height: '1.25rem', display: `${isRunning ? 'flex' : 'none'}`, alignItems: 'center', justifyContent: 'center' }}>
			<p style={{ margin: '0', padding: '0'  }}>
				{minutes > 0 && <span className={`seconds ${secondClass ? '' : 'change'}`}>{minutes} : </span>}
				<span className={`seconds ${secondClass ? '' : 'change'}`}>{seconds}</span>
			</p>
		</div>
	);
}
