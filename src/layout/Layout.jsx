import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import {
	AppBar,
	CssBaseline,
	Toolbar,
	Typography,
	createTheme,
} from '@mui/material';
import { PsychologyOutlined } from '@mui/icons-material';
import { useGameStore } from '../hooks/useGameStore';

const theme = createTheme();

export const Layout = ({ children }) => {


	const { clickedCards, record, onNewRecord } = useGameStore();
	
	useEffect(() => {
		const lsRecord = localStorage.getItem('record');

		if (lsRecord > 0){
			onNewRecord(lsRecord) 
		}
	}, [])
	
	

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position="relative">
				<Toolbar sx={{ justifyContent: 'space-between', padding:0 }}>
					<Toolbar sx={{padding: 1}}>
						<PsychologyOutlined sx={{ mr: 1, fontSize: '2.25rem' }} />
						<Typography variant='h4' color="inherit" noWrap fontSize={'1rem'}>
							Memory Challenge
						</Typography>
					</Toolbar>
					<Toolbar>
						<Typography marginLeft={'auto'} textAlign={'right'} marginRight={'1rem'}>
							Puntaje: {clickedCards.length}
							<br />
							Record: <strong className='record'>{record}</strong>
						</Typography>
					</Toolbar>
				</Toolbar>
			</AppBar>
			{children}
		</ThemeProvider>
	);
};
