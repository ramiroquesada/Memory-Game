import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import PsychologyOutlined from '@mui/icons-material/PsychologyOutlined';
import HelpIcon from '@mui/icons-material/Help';
import {
	AppBar,
	ClickAwayListener,
	CssBaseline,
	Switch,
	Toolbar,
	Typography,
	IconButton,
	createTheme,
	Tooltip,
} from '@mui/material';

import { useGameStore } from '../hooks/useGameStore';
import { useMemoryStore } from '../hooks/useMemoryStore';
import { useUiStore } from '../hooks/useUiStore';
import { UiModal } from '../components/UiModal';
import MyStopwatch from '../components/Stopwatch';
import { Memory } from '../components/Memory';
import { Game } from '../components/Game';

const theme = createTheme();




export const Layout = () => {
	const { gameMode, changeGameMode, isModalOpen, openModalSelectGameMode } =
		useUiStore();
	const { clickedCards, record, onNewRecord } = useGameStore();
	const { flipCount } = useMemoryStore();

	const [open, setOpen] = useState(false);
	const [openR, setOpenR] = useState(false);

	const [checked, setChecked] = useState(gameMode == 2 ? true : false);

	const handleSwitchChange = () => {
		if (!checked) {
			changeGameMode(2);
			setChecked(true);
			return;
		} else if (checked) {
			changeGameMode(1);
			setChecked(false);
			return;
		}
	};

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};
	const handleRTooltipClose = () => {
		setOpenR(false);
	};

	const handleRTooltipOpen = () => {
		setOpenR(true);
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
			<AppBar position="relative" sx={{ minHeight: '5rem', justifyContent: 'center', background:'linear-gradient(0deg, #3c3a4c, #f94555)' }}>
				<Toolbar sx={{ justifyContent: 'space-between', padding: 0 }}>
					<Toolbar sx={{maxWidth: {xs:'9rem', md:'11rem'}}}>
						<PsychologyOutlined sx={{ fontSize: '3rem' }} />
					</Toolbar>

					<div className="navMidToggle" >
						
						<Toolbar sx={{ gap: {xs:'0', md:'1rem'}}}>
							<ClickAwayListener onClickAway={handleTooltipClose}>
								<div>
									<Tooltip
										PopperProps={{
											disablePortal: true,
										}}
										onClose={handleTooltipClose}
										open={open}
										disableFocusListener
										disableTouchListener
										title="Selecciona sin repetir">
										<HelpIcon
											onClick={handleTooltipOpen}
											color="white"
											sx={{
												cursor: 'pointer',
												fontSize: {xs:'1.4rem', md:'2rem'},
											}}
										/>
									</Tooltip>
								</div>
							</ClickAwayListener>
							

							<Switch
								checked={checked}
								onChange={handleSwitchChange}
								color='default'
							/>
							<ClickAwayListener onClickAway={handleRTooltipClose}>
								<div>
									
									<Tooltip
										PopperProps={{
											disablePortal: false,
										}}
										onClose={handleRTooltipClose}
										open={openR}
										disableFocusListener
										disableTouchListener
										title="Encuentra las parejas"
										>
										<HelpIcon
											onClick={handleRTooltipOpen}
											color="white"
											sx={{
												cursor: 'pointer',
												fontSize: {xs:'1.4rem', md:'2rem'},
											}}
										/>
									</Tooltip>
								</div>
								</ClickAwayListener>
						</Toolbar>
					</div>

					<Toolbar sx={{ maxWidth: {xs:'7rem', md: '8rem'} }} style={{paddingRight:'1rem' ,paddingLeft:'0'}}>
						{gameMode === 2 ? (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}>
								<Typography
								fontSize={{xs:'1rem', md: '1.2rem'}}
									textAlign={'right'}>
									Clicks:{' '}
									<strong className="record">
										{flipCount}
									</strong>
								</Typography>
								<MyStopwatch />
							</div>
						) : (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}>
							<Typography textAlign={'right'} fontSize={{xs:'0.85rem', md: '1.1rem'}} >
								Puntaje: {clickedCards.length}
								<br />
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
