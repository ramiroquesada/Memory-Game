import { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { UiModal } from './UiModal';
import { GameCard } from './GameCard';

import { useGameStore } from '../hooks/useGameStore';
import { useUiStore } from '../hooks/useUiStore';
import { InfoBar } from './InfoBar';

export const Game = () => {
	const { isModalOpen } = useUiStore();

	const { gameCards, allCards, startGettingCards, isWin } = useGameStore();

	const [isData, setIsData] = useState(allCards.length > 0 || false);

	useEffect(() => {
		startGettingCards();
	}, [isData]);

	return (
		<Container>
			<InfoBar />
		<Container
			maxWidth="lg"
			style={{
				display: 'flex',
				justifyContent: 'center',
				minHeight: 'calc(100dvh - 7rem)',
				paddingBottom: '2rem',
				paddingTop: '2rem',
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
						xs={4}
						sx={{ backgroundColor: 'transparent', placeContent: 'center'  }}>
						<GameCard data={card}></GameCard>
					</Grid>
				))}
			</Grid>
			{isModalOpen && <UiModal />}
		</Container>
		</Container>
	);
};
