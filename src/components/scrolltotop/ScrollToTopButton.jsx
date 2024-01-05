// ScrollToTopButton.js
import React from 'react';
import { useAppContext } from '../../context/appContext';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

const ScrollToTopButton = () => {
    const { scrollToTop, showScrollButton } = useAppContext();


  return (
    <Tooltip title="Tới đầu trang" arrow>
      <Fab onClick={scrollToTop} size="small" aria-label="scroll back to top" style={{ position: 'fixed', bottom: '20px', right: '20px', display: showScrollButton ? 'flex' : 'none', }}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Tooltip>
  );
};

export default ScrollToTopButton;
