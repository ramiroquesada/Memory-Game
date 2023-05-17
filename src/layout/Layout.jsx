import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { PsychologyOutlined } from '@mui/icons-material';
import HelpIcon from '@mui/icons-material/Help';
import {
	AppBar,
	ClickAwayListener,
	CssBaseline,
	Toolbar,
	Tooltip,
	Typography,
	createTheme,
} from '@mui/material';
import { useGameStore } from '../hooks/useGameStore';

const theme = createTheme();

export const Layout = ({ children }) => {
	const { clickedCards, record, onNewRecord } = useGameStore();

	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	useEffect(() => {
		const lsRecord = localStorage.getItem('record');

		if (lsRecord > 0) {
			onNewRecord(lsRecord);
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
								title="Selecciona sin repetir para ganar">
								<HelpIcon
									onClick={handleTooltipOpen}
									color="white"
									style={{ cursor: 'pointer' }}
								/>
							</Tooltip>
						</div>
					</ClickAwayListener>

					<Toolbar>
						<Typography
							marginLeft={'auto'}
							textAlign={'right'}
							marginRight={'1rem'}>
							Puntaje: {clickedCards.length}
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
