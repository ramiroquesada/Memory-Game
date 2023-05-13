import { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { GameCard } from './GameCard';

import { useGameStore } from '../hooks/useGameStore';
import { UiModal } from './UiModal';
import { useUiStore } from '../hooks/useUiStore';

export const Game = () => {

	const { isModalOpen } = useUiStore()

	const { gameCards, allCards, startGettingCards } = useGameStore();

	const [isData, setIsData] = useState(allCards.length > 0 || false);

	useEffect(() => {
		startGettingCards();
	}, [isData]);

	return (
		<>
			<main
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: 'calc(100vh - 70px)',
					width: '100%',
				}}>
				<Container maxWidth="md" style={{ margin: '1rem 0' }}>
					<Grid

						container
						spacing={{ xs: 2, md: 3 }}
						padding={'2rem 0 1rem 0'}>
						{gameCards.map((card) => (
							<Grid item key={card.uuid} xs={4} md={4}>
								<GameCard data={card}></GameCard>
							</Grid>
						))}
					</Grid>
				</Container>
			{(isModalOpen) ? <UiModal /> : <p></p>}
			</main>

		</>
	);
};
