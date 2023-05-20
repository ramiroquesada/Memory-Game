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
	Tooltip,
	Typography,
	createTheme,
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
			<AppBar position="relative" sx={{ maxHeight: '4rem' }}>
				<Toolbar sx={{ justifyContent: 'space-between', padding: 0 }}>
					<Toolbar sx={{ width: '8rem' }}>
						<PsychologyOutlined sx={{ fontSize: '3rem' }} />
					</Toolbar>

					<div className="navMidToggle">
						<p>Cambiar Modo</p>
						<Toolbar sx={{ gap: '0.25rem' }}>
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
											style={{ cursor: 'pointer' }}
										/>
									</Tooltip>
								</div>
							</ClickAwayListener>
							<Switch
								checked={checked}
								onChange={handleSwitchChange}
								inputProps={{ 'aria-label': 'controlled' }}
								color="error"
							/>
							<ClickAwayListener
								onClickAway={handleRTooltipClose}>
								<div>
									<Tooltip
										PopperProps={{
											disablePortal: true,
										}}
										onClose={handleRTooltipClose}
										open={openR}
										disableFocusListener
										disableTouchListener
										title="Encuentra las parejas">
										<HelpIcon
											onClick={handleRTooltipOpen}
											color="white"
											style={{ cursor: 'pointer' }}
										/>
									</Tooltip>
								</div>
							</ClickAwayListener>
						</Toolbar>
					</div>

					
					<Toolbar sx={{ width: '8rem' }}>
						{gameMode === 2 ? (
							<div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', textAlign: 'right'}}>
								<Typography
									marginLeft={'auto'}
									textAlign={'right'}>
									Clicks: {flipCount}
								</Typography>
								<MyStopwatch />
							</div>
						) : (
							<Typography marginLeft={'auto'} textAlign={'right'}>
								Puntaje: {clickedCards.length}
								<br />
								Record:{' '}
								<strong className="record">{record}</strong>
							</Typography>
						)}
					</Toolbar>
				</Toolbar>
			</AppBar>

			{
				gameMode === 1 ? <Game /> : <Memory />
			}

			{isModalOpen && <UiModal />}
		</ThemeProvider>
	);
};
