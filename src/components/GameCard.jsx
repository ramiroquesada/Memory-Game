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
			sx={{
				aspectRatio: '1/1',

				border: '1px solid #FFF',
				maxHeight: '9rem',
				backgroundColor: 'transparent',
			}}
			>
			<CardMedia
				component="img"
				image={data.displayIcon}
				alt={data.displayName}
				className="imgcard"
			/>
		</Card>
	);
};
