import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAppContext } from '../../context/appContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GlobalSnackbars = () => {
  const { openSnackbar, messageSnackbar, typeSnackbar, handleCloseSnackbar } = useAppContext();

  return (
  <div>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openSnackbar} autoHideDuration={2500} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={typeSnackbar} sx={{ width: '100%' }}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </Stack>
  </div>
    
  );
};


export default GlobalSnackbars;