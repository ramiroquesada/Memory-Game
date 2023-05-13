import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useGameStore } from '../hooks/useGameStore';
import { useUiStore } from '../hooks/useUiStore';

export const GameCard = ({ data }) => {
	const { onAddToClicked } = useGameStore();

	const {isModalOpen, openModal} = useUiStore();


	const onClickCard = () => {
		onAddToClicked(data)
	};

	return (
		<Card
		onClick={onClickCard}
			key={data}
			className="pjCard"
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
			style={{
				height: '100%',
				width: '100%',
				maxWidth: '10rem',
				maxHeight: '10rem',
			}}>
			<CardMedia
				component="img"
				image={data.displayIcon}
				alt={data.displayName}
			/>
			
		</Card>
	);
};
