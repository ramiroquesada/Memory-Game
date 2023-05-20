import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useMemoryStore } from '../hooks/useMemoryStore';

export default function MyStopwatch() {
	const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
		useStopwatch({ autoStart: false });

	const {isPlaying, isWin} = useMemoryStore()

	useEffect(() => {
		if (isPlaying){
			start()
		}
		if(isWin){
			pause()
		}
	}, [isPlaying])
	


	return (
		<div style={{ textAlign: 'center' }}>
			<p style={{margin: '0', padding: '0'}}>
				<span>{hours}</span>:<span>{minutes}</span>:
				<span>{seconds}</span>
			</p>
			{/* <button onClick={start}>Start</button>
			<button onClick={pause}>Pause</button>
			<button onClick={reset}>Reset</button> */}
		</div>
	);
}

