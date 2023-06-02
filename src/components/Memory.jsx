import { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { MemoryCard } from './MemoryCard';
import { useMemoryStore } from '../hooks/useMemoryStore';
import { useUiStore } from '../hooks/useUiStore';
import { InfoBar } from './InfoBar';

export const Memory = () => {
	const { openModalWin } = useUiStore();

	const { gameCards, allCards, startGettingCards, isWin } = useMemoryStore();

	const [isData, setIsData] = useState(allCards.length > 0 || false);

	useEffect(() => {
		startGettingCards();
	}, [isData]);

	useEffect(() => {
		if (isWin) {
			openModalWin();
		}
	}, [isWin]);

	return (
		<Container maxWidth="lg">
			<InfoBar />

			<Container
				maxWidth="lg"
				style={{
					display: 'flex',
					justifyContent: 'center',
					minHeight: 'calc(100dvh - 8rem)',
					marginBottom: '2rem',
					paddingTop: '1rem',
				}}>
				<Grid
					container
					justifyContent={'center'}
					alignItems={'center'}
					spacing={2}>
					{gameCards?.map((card) => (
						<Grid
							justifyContent={'center'}
							alignItems={'center'}
							item
							key={card.uuid}
							xs={3}
							md={2}
							sx={{
								backgroundColor: 'transparent',
								placeContent: 'center',
							}}>
							<MemoryCard data={card} />
						</Grid>
					))}
				</Grid>
			</Container>
		</Container>
	);
};
