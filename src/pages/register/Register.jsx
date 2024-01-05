import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPicPath } from "../../utils";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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

export default function Register() {
  const [open, setOpen] = React.useState(false);

  const handleOpenSnackBar = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputs = ({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name')
    })
    const hasEmptyInputs = checkInputs(inputs);
    if (hasEmptyInputs) {
      handleOpenSnackBar();
      return;
    }
    try {
      const result = await axios.post("http://qr-code-sigma-eight.vercel.app:443/api/auth/register", inputs);
      console.log(result);
      if(result.status === 200){
        navigate('/login');
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const logoPath = getPicPath("favicon.png");
  const namePath = getPicPath("cpc.png");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Vui lòng nhập đầy đủ thông tin!
          </Alert>
        </Snackbar>
      </Stack>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Tài khoản"
                  name="username"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Họ và tên"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Tôi muốn nhận những cập nhật mới nhất về EVNCPC qua email."
                />
              </Grid>
              {err && err}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Có sẵn tài khoản? Đăng nhập"}
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}