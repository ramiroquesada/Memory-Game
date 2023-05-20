import { Card, CardMedia } from '@mui/material';
import { useMemoryStore } from '../hooks/useMemoryStore';

export const MemoryCard = ({ data }) => {
	const {
		gameCards,
		backCard,
		startClickCard,
		clickedCards,
	} = useMemoryStore();



	
  const isFlipped = gameCards.some((card) => card.uuid === data.uuid && card.flipped);
  const isClicked = clickedCards.some((card) => card.uuid === data.uuid);

	const onClickCard = () => {
		if(clickedCards.length < 2){

			startClickCard(data);
		}
		else{
			return
		}
	};

	return (
		<Card

			onClick={onClickCard}
			key={data}
			className={`pjCardMemory pjCard ${isFlipped || isClicked ? 'flipped' : ''}`}
			style={{
				aspectRatio: '1/1',
				backgroundColor: 'transparent',
				border: '1px solid #FFF',
				maxHeight: '8rem',
			}}
			>
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
						className={`imgcard `}
						sx={{ backgroundColor: 'transparent' }}
					/>
				</div>
			</div>
		</Card>
	);
};
