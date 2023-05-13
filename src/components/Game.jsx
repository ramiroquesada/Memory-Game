import { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { GameCard } from './GameCard';

import { useGameStore } from '../hooks/useGameStore';
import { UiModal } from './UiModal';
import { useUiStore } from '../hooks/useUiStore';

import JSConfetti from 'js-confetti';

export const Game = () => {
	const { isModalOpen, msg } = useUiStore();

	const { gameCards, allCards, startGettingCards, isWin } = useGameStore();

	const [isData, setIsData] = useState(allCards.length > 0 || false);


	const [isWinner, setisWinner] = useState(isWin || false);



	useEffect(() => {
		startGettingCards();
	}, [isData]);

	useEffect(() => {
		if (isWinner ) {
			const jsConfetti = new JSConfetti();

			jsConfetti.addConfetti();
		}
	}, [isModalOpen]);

	return (
		<Container
			maxWidth="sm"
			style={{
				display: 'flex',
				justifyContent: 'center',
				minHeight: 'calc(100dvh - 4rem)',
				// marginTop: '1rem',
				// marginBottom: '1rem',
			}}>
			<Grid
				container
				justifyContent={'center'}
				alignItems={'center'}
				spacing={2}>
				{gameCards.map((card) => (
					<Grid
						justifyContent={'center'}
						alignItems={'center'}
						item
						key={card.uuid}
						xs={4}>
						<GameCard data={card}></GameCard>
					</Grid>
				))}
			</Grid>
			{isModalOpen ? <UiModal /> : ''}
		</Container>
	);
};
