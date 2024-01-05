import React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Define your drawerWidth variable or import it from wherever it is defined
const drawerWidth = 240;

// Styled AppBar component
const Topbar = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(!open && {
      marginLeft: theme.spacing(7),
      width: `calc(100% - ${theme.spacing(7)}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

// Your Topbar component
const TopbarComponent = ({ open, handleDrawerOpen }) => {
  return (
    // <ThemeProvider theme={theme}>
      <Topbar open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            {/* Add your custom icon here, e.g., MenuIcon */}
          </IconButton>
          {/* Add other components/icons for the topbar */}
          <IconButton color="inherit" edge="end">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </Topbar>
    // </ThemeProvider>
  );
};

export default TopbarComponent;
