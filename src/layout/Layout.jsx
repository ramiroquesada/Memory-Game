import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import PsychologyOutlined from '@mui/icons-material/PsychologyOutlined';
import {
	AppBar,
	CssBaseline,
	Switch,
	Toolbar,
	Typography,
	createTheme,
	IconButton,
	Backdrop,
	styled,
	Paper,
} from '@mui/material';

import { useGameStore } from '../hooks/useGameStore';
import { useMemoryStore } from '../hooks/useMemoryStore';
import { useUiStore } from '../hooks/useUiStore';
import { UiModal } from '../components/UiModal';
import { Memory } from '../components/Memory';
import { Game } from '../components/Game';
import { Cronometro } from '../components/Cronometro';

const theme = createTheme({ palette: { mode: 'light' } });

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body1,
	textAlign: 'center',
	color: theme.palette.text.secondary,
	paddingLeft: '2rem',
	paddingRight: '2rem',
	height: '8rem',
	display: 'flex',
	alignItems: 'center',
	borderRadius: '1rem',
}));

export const Layout = () => {
	const { gameMode, changeGameMode, isModalOpen, openModalSelectGameMode } =
		useUiStore();
	const { record, onNewRecord } = useGameStore();
	const { flipCount } = useMemoryStore();

	const [open, setOpen] = useState(false);

	const [checked, setChecked] = useState(gameMode == 2 ? true : false);

	const handleSwitchChange = () => {
		if (!checked) {
			changeGameMode(2);
			setChecked(true);
			setOpen(true);

			return;
		} else if (checked) {
			changeGameMode(1);
			setChecked(false);
			setOpen(true);
			return;
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const lsRecord = localStorage.getItem('record');

		if (lsRecord > 0) {
			onNewRecord(lsRecord);
		}

		if (gameMode == null) {
			openModalSelectGameMode();
		} else if (gameMode == 1) {
			setChecked(false);
		} else if (gameMode == 2) {
			setChecked(true);
		}
	}, [gameMode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar
				position="relative"
				sx={{
					minHeight: '5rem',
					justifyContent: 'center',
					background: 'linear-gradient(0deg, #3c3a4c, #f94555)',
				}}>
				<Toolbar sx={{ justifyContent: 'space-between', padding: 0 }}>
					<Toolbar
						sx={{ width: { xs: '5.5rem', sm: '7rem', md: '8rem' } }}
						style={{ paddingRight: '0', paddingLeft: '0rem' }}>
						<IconButton color="white">
							<PsychologyOutlined
								sx={{ fontSize: '3rem', color: 'white' }}
							/>
						</IconButton>
					</Toolbar>

					<div
						className="navMidToggle"
						style={{ marginLeft: 'auto', marginRight: 'auto' }}>
						<Switch
							checked={checked}
							onChange={handleSwitchChange}
							color="info"
							value="Hola"
						/>
						<Backdrop
							sx={{
								color: '#fff',
								zIndex: (theme) => theme.zIndex.drawer + 1,
							}}
							open={open}
							onClick={handleClose}>
							<Item elevation={24}>
								<Typography
									fontWeight={800}
									fontSize={'1.25rem'}>
									{checked
										? 'Memoriza las posiciones'
										: 'No repitas al mismo'}
								</Typography>
							</Item>
						</Backdrop>
					</div>

					<Toolbar
						sx={{ width: { xs: '6rem', sm: '7rem', md: '9rem' } }}
						style={{
							paddingRight: '0',
							paddingLeft: '0',
							marginRight: '1rem',
						}}>
						{gameMode === 2 ? (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									minWidth: '6rem',
								}}>
								<Typography
									fontSize={{ xs: '1rem', sm: '1.2rem' }}
									textAlign={'right'}>
									Record:{' '}
									<strong className="record">{'??'}</strong>
								</Typography>
							</div>
						) : (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									minWidth: '6rem',
								}}>
								<Typography
									fontSize={{ xs: '1rem', sm: '1.2rem' }}
									textAlign={'right'}>
									Record:{' '}
									<strong className="record">{record}</strong>
								</Typography>
							</div>
						)}
					</Toolbar>
				</Toolbar>
			</AppBar>

			{gameMode === 1 ? <Game /> : <Memory />}

			{isModalOpen && <UiModal />}
		</ThemeProvider>
	);
};
