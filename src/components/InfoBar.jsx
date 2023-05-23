import { useMemo, useState } from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { Cronometro } from './Cronometro';
import { useMemoryStore } from '../hooks/useMemoryStore';
import { useUiStore } from '../hooks/useUiStore';

export const InfoBar = () => {
	const { allCards, clickedCards } = useGameStore();

	const { flipCount, matchedCards, gameCards } = useMemoryStore();

	const { gameMode } = useUiStore();

	const gameRestantes = useMemo(() => allCards.length - clickedCards.length);

	const memoryRestantes = useMemo(
		() => (gameCards.length - matchedCards.length) / 2
	);

	if (gameMode == 2) {
		return (
			<div className="infobar">
				<div>
					Restantes: <strong>{memoryRestantes}</strong>
				</div>

				<div>
					Clicks: <strong>{flipCount}</strong>
				</div>

				<Cronometro />
			</div>
		);
	} else {
	}

	return (
		<div className="infobar">
			
			<div>Restantes:  <strong>{gameRestantes}</strong></div>

			<div>
				Puntaje: <strong>{clickedCards.length}</strong>
			</div>
			<Cronometro />
		</div>
	);
};
