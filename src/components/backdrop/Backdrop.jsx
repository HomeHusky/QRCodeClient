import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppContext } from '../../context/appContext';

const GlobalBackdrop = () => {
  const { openBackdrop, handleOpenBackdrop, handleCloseBackdrop } = useAppContext();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackdrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalBackdrop;
