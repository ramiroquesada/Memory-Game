import { Card, CardMedia } from '@mui/material';
import { useGameStore } from '../hooks/useGameStore';

export const GameCard = ({ data }) => {
	const { onAddToClicked } = useGameStore();

	const onClickCard = () => {
		onAddToClicked(data);
	};

	
	return (
		<Card
			onClick={onClickCard}
			key={data}
			className="pjCard gameCard2"
			
			style={{
				alignContent: 'center',

				maxWidth: '10rem',
				aspectRatio: '1/1',
				border: '1px solid #FFF',
				borderRadius: '0.85rem',	
				background: `linear-gradient(0deg, #${data.gradient.join(', #')})`,
				marginLeft: 'auto',
				marginRight: 'auto'		
			}}			
			>
			<div className="card-innerr">
				<CardMedia
					component="img"
					image={data.displayIcon}
					alt={data.displayName}
					className="imgcard"
				/>
			</div>
		</Card>
	);
};
