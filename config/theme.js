import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#000000',
			paper: '#000000',
		},
	},
	typography: {
		fontSize: 24,
	},
});

export default theme;
