import { useEffect, useState } from 'react';
import { UiModal } from './UiModal';
import { Container, Grid } from '@mui/material';
import { GameCard } from './GameCard';

import { useGameStore } from '../hooks/useGameStore';
import { useUiStore } from '../hooks/useUiStore';


export const Game = () => {
	const { isModalOpen } = useUiStore();

	const { gameCards, allCards, startGettingCards, isWin } = useGameStore();

	const [isData, setIsData] = useState(allCards.length > 0 || false);


	useEffect(() => {
		startGettingCards();
	}, [isData]);

	

	return (
		<Container
			maxWidth="sm"
			style={{
				display: 'flex',
				justifyContent: 'center',
				minHeight: 'calc(100dvh - 4rem)',
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
						sx={{backgroundColor: 'transparent'}}>
						<GameCard data={card}></GameCard>
					</Grid>
				))}
			</Grid>
			{isModalOpen && <UiModal data={isWin}/>}
		</Container>
	);
};
