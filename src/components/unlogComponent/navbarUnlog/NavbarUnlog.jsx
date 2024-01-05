import "./navbarUnlog.scss";
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
import LoginIcon from '@mui/icons-material/Login';
import { useAppContext } from "../../../context/appContext";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPicPath } from "../../../utils";

const NavbarUnlog = () => {
  const { hideNavbar } = useAppContext();
  
//   const { currentUser } = useContext(AuthContext);
//   const profilePicPath = getPicPath(currentUser.profilePic);
  const navigate = useNavigate()
  const logoPath = getPicPath("favicon.png");
  const namePath = getPicPath("cpc.png");

  const handleNavigateLogin = async (event) => {
    event.preventDefault();
    try {
        navigate("/");
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
        {/* <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>
      <div className="right">
        {/* <div className="user">
          <IconButton>
            <Badge badgeContent={4} color="primary">
              <LoginIcon />
            </Badge>
          </IconButton>
        </div> */}
        
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
          <IconButton onClick={handleNavigateLogin}>
            <LoginIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default NavbarUnlog;
