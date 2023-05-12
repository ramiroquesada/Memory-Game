import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const GameCard = ( {data} ) => {
	return (
		<Card
		
			sx={{
				display: 'flex',
				flexDirection: 'column',
				
			}}
			style={{
				height: '100%',
				width: '100%',
				maxWidth: '10rem',
				maxHeight: '12rem'				
			}}>
			<CardMedia
				component="img"
				image={data.displayIcon}
				alt={data.displayName}
			/>
			<CardContent
				sx={{
					flexGrow: 1,
					margin: 0.25,
				}}
				style={{ padding: 2 }}>
				<Typography
					variant="h5"
					textAlign="center"
					sx={{
						margin: 0,
						padding: 0,
						fontSize: '1.1rem',
						fontWeight: '500'
					}}>
					{data.displayName}
				</Typography>
			</CardContent>
		</Card>
	);
};
