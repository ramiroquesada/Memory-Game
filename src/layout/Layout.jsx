
import { ThemeProvider } from '@emotion/react';
import { AppBar, CssBaseline, Toolbar, Typography, createTheme } from '@mui/material';
import { PsychologyOutlined } from '@mui/icons-material';


const theme = createTheme();

export const Layout = ({children}) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position="relative">
				<Toolbar>
					<PsychologyOutlined sx={{ mr: 2, fontSize: '2rem' }} />
					<Typography variant="h6" color="inherit" noWrap>
						Memory Challenge
					</Typography>
				</Toolbar>
			</AppBar>
			{children}
			
		</ThemeProvider>
	);
};
