import React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { useAppContext } from "../../context/appContext";
import { Link } from "react-router-dom";

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

const Navbar = () => {
  // Your existing code...

  return (
    <div className={`navbar `}>
      <Topbar>
        <Toolbar>
          {/* Add your custom icon for opening the sidebar here */}
          <IconButton color="inherit" onClick={handleDrawerToggle}>
            {/* Your icon here */}
          </IconButton>

          {/* Your existing code... */}

          <div className="user">
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
          </div>

          <div className="user">
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={profilePicPath} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* Your existing menu items... */}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </Topbar>
    </div>
  );
};

export default Navbar;
