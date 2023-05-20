import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useMemoryStore } from '../hooks/useMemoryStore';

export default function MyStopwatch(data) {
	const { seconds, minutes, hours, start, pause, reset } =
		useStopwatch({ autoStart: false });

	const { isPlaying, isWin, flipCount } = useMemoryStore();

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

	return (
		<div style={{ textAlign: 'center' }}>
			<p style={{ margin: '0', padding: '0' }}>
				<span>{hours}</span>:<span>{minutes}</span>:
				<span>{seconds}</span>
			</p>
		</div>
	);
}
