import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import Home from "../../assets/home-button.png"
import Table from "../../assets/table.png";
import Help from "../../assets/help.png";
import Courses from "../../assets/graduation.png";
import { Link } from "react-router-dom";
import "./leftBar.scss";

export const mainListItems = (
  <React.Fragment>
    <Link
    to={`/`}
    style={{ textDecoration: "none", color: "inherit" }}
    >
        <ListItemButton>
            <ListItemIcon >
                <img style={{width: '30px'}} src={Home} alt="" />
            </ListItemIcon>
            <ListItemText primary="Trang chủ" />
        </ListItemButton>
    </Link>
    
    <Link
              to={`/pics`}
              style={{ textDecoration: "none", color: "inherit" }}
              >
        <ListItemButton>
            <ListItemIcon>
                <img style={{width: '30px'}}  src={Table} alt="" />
            </ListItemIcon>
            <ListItemText primary="Quản lý tranh" />
        </ListItemButton>
    </Link>
    
    {/* <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Khác
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <img style={{width: '30px'}}  src={Courses} alt="" />
      </ListItemIcon>
      <ListItemText primary="Hướng dẫn sử dụng" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <img style={{width: '30px'}}  src={Help} alt="" />
      </ListItemIcon>
      <ListItemText primary="Hỗ trợ" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);