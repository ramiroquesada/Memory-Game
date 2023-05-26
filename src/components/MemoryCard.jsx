import { Card, CardMedia } from '@mui/material';
import { useMemoryStore } from '../hooks/useMemoryStore';

export const MemoryCard = ({ data }) => {
	const { gameCards, backCard, clickedCards, startClickCard } =
		useMemoryStore();

	const isFlipped = gameCards.some(
		(card) => card.uuid === data.uuid && card.flipped
	);
	const isClicked = clickedCards.some((card) => card.uuid === data.uuid);

	const isMatching = gameCards.some(
		(card) => card.uuid === data.uuid && card.matching
	);

	const onClickCard = () => {
		if (clickedCards.length < 2) {
			startClickCard(data);
		} else {
			return;
		}
	};

	return (
		<Card
			onClick={onClickCard}
			key={data}
			className={`pjCardMemory pjCard ${
				isFlipped  ? 'flipped' : ''
			} ${isMatching ? 'matching' : ''} ${isClicked ? 'clicked' : ''}`}
			style={{
				aspectRatio: '1/1',
				background: `linear-gradient(180deg, #${data.gradient.join(
					', #'
				)})`,
				maxHeight: '7rem',
				maxWidth: '7rem',
				borderRadius: '0.75rem',
				alignContent: 'center',
				marginLeft: 'auto',
				marginRight: 'auto'	
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
					/>
				</div>
			</div>
		</Card>
	);
};
