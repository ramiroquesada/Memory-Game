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

const theme = createTheme();

export const Layout = ({ children }) => {
	
	const { clickedCards, record, onNewRecord } = useGameStore();
	const { flipCount } = useMemoryStore();
	const { gameMode, lastView, changeGameMode, startGettingGameMode } = useUiStore();

	const [open, setOpen] = useState(true);
	const [openR, setOpenR] = useState(false);

	const lastViewFalse = (lastView == 'game1' ? false : true);

	const [checked, setChecked] = useState(lastViewFalse )

	const handleSwitchChange = () => {
		if (checked) {
			changeGameMode('game1')
			setChecked(false)
			return
		}

		else if(!checked ){
			changeGameMode('game2')
			setChecked(true)
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

		startGettingGameMode();
		

		const lsLastView = localStorage.getItem('lastView');
		if (!!lsLastView  ) {
			changeGameMode('game1');
			if (lastView == 'game1'){
				setChecked(false)
				return;
			}
			else if (lastView == 'game2' ){
				setChecked(true)
				return;
			}else{
				return
			}
			}
	}, []);

	

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position="relative">
				<Toolbar sx={{ justifyContent: 'space-between', padding: 0 }}>
					<Toolbar sx={{ padding: 1 }}>
						<PsychologyOutlined
							sx={{ mr: 1, fontSize: '2.25rem' }}
						/>
						<Typography
							variant="h4"
							color="inherit"
							noWrap
							fontSize={'1rem'}>
							Memory Challenge
						</Typography>
					</Toolbar>

					<Toolbar>
						<ClickAwayListener onClickAway={handleTooltipClose}>
							<div>
								<Tooltip
									PopperProps={{
										disablePortal: false,
									}}
									onClose={handleTooltipClose}
									open={open}
									disableFocusListener
									disableTouchListener
									title="Memoriza a medida que das click">
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

						<ClickAwayListener onClickAway={handleRTooltipClose}>
							<div>
								<Tooltip
									PopperProps={{
										disablePortal: true,
									}}
									onClose={handleRTooltipClose}
									open={openR}
									disableFocusListener
									disableTouchListener
									title="Selecciona sin repetir para ganar">
									<HelpIcon
										onClick={handleRTooltipOpen}
										color="white"
										style={{ cursor: 'pointer' }}
									/>
								</Tooltip>
							</div>
						</ClickAwayListener>
					</Toolbar>
					<Toolbar>
						<Typography
							marginLeft={'auto'}
							textAlign={'right'}
							marginRight={'1rem'}>
							Puntaje: {clickedCards.length}
							<br />
							{flipCount}
							<br />
							Record: <strong className="record">{record}</strong>
						</Typography>
					</Toolbar>
				</Toolbar>
			</AppBar>
			{children}
		</ThemeProvider>
	);
};
