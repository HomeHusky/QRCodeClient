import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import MaterialUISwitch from "../../components/switchUi/SwitchUI";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { getPicPath } from "../../utils";
import { useAppContext } from '../../context/appContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://checkin.cpc.vn/">
        Evn cpc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function checkInputs(data) {
  console.log(data);

  for (const key in data) {
    if (!data[key]) {
      return true; // Nếu bất kỳ giá trị nào là rỗng, trả về true
    }
  }

  return false; // Nếu không có giá trị nào rỗng, trả về false
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  // snackbar
  const { handleOpenSnackbar, handleMessageSnackbar, handleTypeSnackbar } = useAppContext();

  const openSnackbar = (message, type) =>{
    handleOpenSnackbar();
    handleMessageSnackbar(message);
    handleTypeSnackbar(type);
  }

  const { handleOpenBackdrop, handleCloseBackdrop } = useAppContext();


  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputs = ({
      username: data.get('username'),
      password: data.get('password'),
    });
    const hasEmptyInputs = checkInputs(inputs);
    if (hasEmptyInputs) {
      openSnackbar("Vui lòng nhập đầy đủ thông tin!", "error");
      return;
    }
    try {
      handleOpenBackdrop();
      await login(inputs);
      openSnackbar("Đăng nhập thành công. Chào mừng bạn đến với QR EVNCPC", "success");
      navigate("/");
    } catch (err) {
      openSnackbar("Đăng nhập thất bại. Tài khoản hoặc mật khẩu không chính xác!", "error");

      handleCloseBackdrop();
      setErr(err.response.data);
    }
  };

  const logoPath = getPicPath("favicon.png");
  const namePath = getPicPath("cpc.png");

  return (
    <ThemeProvider theme={defaultTheme}>

      {/* snackbar */}

      {/* main */}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpapers.com/images/high/beaming-sun-into-solar-panels-binzlglojeo6nx42.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="EVNCPC"
              src={logoPath}
              sx={{ width: 56, height: 56 }}
            />
            <Avatar alt="EVNCPC" src={namePath} variant="square" sx={{ width: 200 }}/>
            
            <br />
            <Typography component="h1" variant="h5">
              QR EVNCPC
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tài khoản"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid container>
                <Grid item xs>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Nhớ mật khẩu"
                  />
                </Grid>
                <Grid item>
                  <MaterialUISwitch/>
                </Grid>
              </Grid>          
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Bạn chưa có tài khoản? Đăng ký"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}