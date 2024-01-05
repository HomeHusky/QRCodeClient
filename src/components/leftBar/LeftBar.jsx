import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import { mainListItems } from './itemList';
import { secondaryListItems } from './itemList';
// Define your drawerWidth variable or import it from wherever it is defined
const drawerWidth = 240;

// Styled Drawer component
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// Leftbar component
const Leftbar = () => {

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    if (window.innerWidth > 2 * drawerWidth) {
      setOpen(!open);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 2 * drawerWidth) {
        setOpen(false);
      }
    };

    // Đăng ký sự kiện resize
    window.addEventListener('resize', handleResize);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Drawer variant="permanent" open={!open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {open ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
      </List>
    </Drawer>
  );
};

export default Leftbar;
