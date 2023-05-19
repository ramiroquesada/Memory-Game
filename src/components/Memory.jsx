import { useEffect, useState } from 'react';
import { useMemoryStore } from '../hooks/useMemoryStore';
import { Container, Grid } from '@mui/material';
import { useUiStore } from '../hooks/useUiStore';
import { MemoryCard } from './MemoryCard';

export const Memory = () => {


	const { isModalOpen } = useUiStore();

	const { gameCards, allCards, startGettingCards, isWin } = useMemoryStore();

	const [isData, setIsData] = useState(allCards.length > 0 || false);

	useEffect(() => {
		startGettingCards();
	}, [isData]);

	

	return (
		<Container
			maxWidth="md"
			style={{
				display: 'flex',
				justifyContent: 'center',
				minHeight: 'calc(100dvh - 4rem)',
			}}>
			<Grid
				container
				justifyContent={'center'}
				alignItems={'center'}
				spacing={1}
				>
				{gameCards?.map((card) => (
					<Grid
						justifyContent={'center'}
						alignItems={'center'}
						item
						key={card.uuid}
						xs={3}
						sx={{backgroundColor: 'transparent'}}
						>
						<MemoryCard data={card} />
					</Grid>
				))}
			</Grid>
			{isModalOpen && <UiModal data={isWin}/>}
		</Container>
	)
}
