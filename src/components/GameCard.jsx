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
			className="pjCard"
			style={{
				height: '100%',
				width: '100%',
				maxWidth: '8rem',
				maxHeight: '8rem',
			}}>
			<CardMedia
				component="img"
				image={data.displayIcon}
				alt={data.displayName}
				className="imgcard"
			/>
		</Card>
	);
};