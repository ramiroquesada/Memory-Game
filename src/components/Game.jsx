import { Container, Grid } from '@mui/material';
import { GameCard } from './GameCard';


import { useGameStore } from '../redux/useGameStore';
import { useEffect } from 'react';

export const Game = () => {

	const {cards, onGetCards} = useGameStore();


	useEffect(() => {
		
		onGetCards()

	
	}, [])
	



	return (
		<main
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: 'calc(100vh - 70px)',
				width: '100%',
			}}>
			<Container maxWidth="md" style={{ margin: '1rem 0' }}>
				<Grid container spacing={2} padding={'2rem 0 1rem 0'} >
					{cards.map((card) => (
						<Grid item key={card.uuid} xs={4} md={2} >
							<GameCard data={card}></GameCard>
						</Grid>
					))}
				</Grid>
			</Container>
		</main>
	);
};
