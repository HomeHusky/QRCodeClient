// ShowLeftBarButton.js
import React from 'react';
import { useAppContext } from '../../context/appContext';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Fab from '@mui/material/Fab';
import "./showleftbarbutton.scss";
import Tooltip from '@mui/material/Tooltip';

const ShowLeftBarButton1 = () => {
  const { hideNavbar } = useAppContext();
  const { showLeftBarButton, handleLeftBarButton, showLeftbar, toggleLeftbar } = useAppContext();

  const handleClick = () =>{
    handleLeftBarButton();
    toggleLeftbar();
  }

  return (
    <div className={`${!showLeftBarButton ? 'hiddenLeftbarButton' : ''}`} >
      <Tooltip title="Mở rộng" arrow onClick={handleClick}>
        <Fab size="small" aria-label="scroll back to top" style={{ position: 'fixed', top: hideNavbar ? '10px' : '80px', left: '10px', display: 'flex' }}>
          <KeyboardArrowRightIcon />
        </Fab>
      </Tooltip>
    </div>
    
  );
};

export default ShowLeftBarButton1;
