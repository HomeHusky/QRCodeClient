import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import { useBreadcrumb } from '../../context/breadCrumbContext';
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function Header(props) {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography component="h2" variant="h5" color="inherit" align="left" noWrap sx={{ flex: 1 }}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs.map((breadcrumb, index) => (
                <Link key={index} underline="none" color="inherit" to={breadcrumb.path}>
                  {breadcrumb.label}
                </Link>
              ))}
            </Breadcrumbs>
          </div>
        </Typography>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;