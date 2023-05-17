import { useEffect, useState } from 'react';
import { useMemoryStore } from '../hooks/useMemoryStore';
import { Container, Grid } from '@mui/material';
import { GameCard } from './GameCard';
import { useUiStore } from '../hooks/useUiStore';

export const Memory = () => {


	const { isModalOpen } = useUiStore();

	const { gameCards, allCards, startGettingCards, isWin } = useMemoryStore();

	const [isData, setIsData] = useState(allCards.length > 0 || false);

	useEffect(() => {
		startGettingCards();
	}, [isData]);

	

	return (
		<Container
			// maxWidth="xl"
			style={{
				display: 'flex',
				justifyContent: 'center',
				minHeight: 'calc(100dvh - 4rem)',
			}}>
			<Grid
				container
				// justifyContent={'center'}
				alignItems={'center'}
				spacing={1}
				>
				{gameCards.map((card) => (
					<Grid
						justifyContent={'center'}
						alignItems={'center'}
						item
						key={card.uuid}
						
						>
						<GameCard data={card}></GameCard>
					</Grid>
				))}
			</Grid>
			{isModalOpen && <UiModal data={isWin}/>}
		</Container>
	)
}
