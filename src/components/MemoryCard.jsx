import { useEffect, useState } from 'react';
import { Card, CardMedia } from '@mui/material';
import { useMemoryStore } from '../hooks/useMemoryStore';

export const MemoryCard = ({ data }) => {

	
	
	const [flipped, setFlipped] = useState(false);
	const { gameCards, allCards, allPlayerCards, backCard, startGettingCards, isWin, startClickCard, clickedCard} = useMemoryStore();


	const onClickCard = () => {
		startClickCard(data);
		if(!data.clicked){
			setFlipped(true)
		}else{
			setFlipped(false)
		}
	};

	// useEffect(() => {

	// 	if(!data.clicked){
	// 		setFlipped(true)
	// 	}else{
	// 		setFlipped(false)
	// 	}
	
	
	// }, [])
	



	return (
		<Card
			onClick={ onClickCard}
			key={data}
			// className="pjCardMemory pjCard"
			className={`pjCardMemory pjCard ${flipped ? 'flipped' : ''}`}
			style={{
				// maxWidth: '8rem',
				maxHeight: '8rem',
				aspectRatio: '1/1',
				backgroundColor: 'transparent',
				border: '1px solid #FFF',
			}}>
			<div className="card-inner">
				<div className="card-front">
					<CardMedia
						component="img"
						image={backCard[0].displayIcon}
						alt={backCard[0].uuid}
						className="imgcard"
					/>
				</div>
				<div className="card-back">
				<CardMedia
						component="img"
						image={data.displayIcon}
						alt={data.displayName}
						className="imgcard"
						sx={{backgroundColor: 'transparent'}}
					/>
				</div>
			</div>
			{/* <CardMedia
				component="img"
				image={data.displayIcon}
				alt={data.displayName}
				className="imgcard"
			/> */}
		</Card>
	);
};
