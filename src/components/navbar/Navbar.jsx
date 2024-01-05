import "./navbar.scss";
import * as React from 'react';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { useAppContext } from "../../context/appContext";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPicPath } from "../../utils";

const settings = ['Hồ sơ', 'Tài khoản', 'Bảng điều khiển', 'Đăng xuất'];

const Navbar = () => {
  const { hideNavbar } = useAppContext();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const { currentUser } = useContext(AuthContext);
  const profilePicPath = getPicPath(currentUser.profilePic);
  const navigate = useNavigate()
  const logoPath = getPicPath("favicon.png");
  const namePath = getPicPath("cpc.png");

  const handleLogout = async (event) => {
    event.preventDefault();
    handleCloseUserMenu();
    try {
      await axios.post("http://qr-code-sigma-eight.vercel.app:443/api/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
  
      localStorage.clear();
      handleCloseUserMenu();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={`navbar ${hideNavbar ? 'hidden' : 'visible'} `} >
      <div className="left">
        <Stack direction="row" spacing={2}>
          <Link
            to={`/`}
            style={{ textDecoration: "none", color: "inherit", display:"flex" }}
            >
              <Avatar alt="" src={logoPath} />
              <Avatar alt="EVNCPC" src={namePath} variant="square" sx={{ width: 200 }}/>
          </Link>
          

        </Stack>
        {/* <GridViewOutlinedIcon /> */}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <div className="user">
          <IconButton>
            <Badge badgeContent={4} color="primary">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </div>
        
        {/* <div className="user">
          
          <Link
          to={`/profile/${currentUser.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
            src={profilePicPath}
            alt=""
          />
          </Link>
        </div> */}
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
              <MenuItem>
                
                <Link onClick={handleCloseUserMenu}
                  to={`/profile/${currentUser.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">Hồ sơ</Typography>
                </Link>

              </MenuItem>
              <MenuItem>
                
                <Link onClick={handleCloseUserMenu}
                  to={`/account`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">Tài khoản</Typography>
                </Link>

              </MenuItem>
              <MenuItem>
                
                <Link onClick={handleCloseUserMenu}
                  to={`/security`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">Bảo mật</Typography>
                </Link>

              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </div>
        {/* <div className="user">
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
