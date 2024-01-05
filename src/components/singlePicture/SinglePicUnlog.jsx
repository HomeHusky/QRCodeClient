import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPic from './MainFeaturedPic';
import Main from '../blog/Main';
import Sidebar from '../blog/Sidebar';
import Header from '../header/Header';
import { useQuery } from "@tanstack/react-query";
// import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { makeRequest } from "../../axios";
import { useContext, useRef } from "react";
import { AuthContext } from '../../context/authContext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import { getPicPath } from '../../utils';
import Typography from '@mui/material/Typography';
import MediaControlCard from './MediaControlCard';
import TitlebarBelowImageList from './TitlebarBelowImageList';
import NavbarUnlog from '../unlogComponent/navbarUnlog/NavbarUnlog';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const StyledPaper = styled(Paper)({
  width: '100%',  // Đặt chiều rộng là 100%
  overflow: 'hidden',  // Ẩn nội dung vượt qua kích thước của Paper
});

const StyledMain = styled(Paper)({
  width: '100%',  // Đặt chiều rộng là 100%
  overflow: 'auto',  // Ẩn nội dung vượt qua kích thước của Paper
});

const SinglePicUnlog = () => {
  const { id, qrImage } = useParams();
  const [data, setData] = useState(null);
  const imgRef = React.useRef();
  // const location = useLocation();
  // const id = location.state.id;
  // const data = location.state.data;
  // console.log(data);
  const [heightImg, setHeightImg] = useState(0);
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    if (window.innerWidth > 2 * drawerWidth) {
      setOpen(!open);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 2 * drawerWidth) {
        setOpen(false);
      }
    };

    // Đăng ký sự kiện resize
    window.addEventListener('resize', handleResize);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Promise.race([
          makeRequest.get(`/pics/img/${id}/${qrImage}`),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 10000) // 10 seconds timeout
          ),
        ]);

        setData(result.data.result[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [id, qrImage]);

  if (!data) {
    return <p>Loading...</p>;
  }

  console.log(data);
  
  return (
    <div className={`theme-light`}>
          <NavbarUnlog />
          <div style={{ display: "flex" }}>
            {/* <LeftBar /> */}
            <div style={{ flex: 10 }}>
              {/* <KeyboardDoubleArrowLeftOutlinedIcon className="toggle-button" onClick={toggleLeftBar} /> */}

              {data ? (
                <StyledMain>
                <main style={{marginLeft: '10px', marginTop: '10px'}}>
                  {/* <div style={{ display: 'flex', justifyContent: 'left', wordWrap: 'break-word' }}>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom >
                      {data.title}
                    </Typography>
                  </div> */}
                  <Grid container spacing={2} >
                    <Grid item xs={12} md={5} style={{ display: 'block', justifyContent: 'center' }}>
                      <StyledPaper>
                        <img
                          ref={imgRef}
                          src={getPicPath(data.img)}
                          alt="Mô tả ảnh"
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                        <h5 style={{float: 'right', marginRight: '20px'}}>
                            {data.author}
                        </h5>
                      </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={7} style={{ display: 'block', justifyContent: 'center', paddingRight:'20px' }}>
                        <MediaControlCard props={data}/>
                        <StyledPaper>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                            <Typography variant="h6" gutterBottom>
                                {data.title}
                            </Typography>
                            <Typography>
                                {data.description}
                                </Typography>
                            </Paper>
                        </StyledPaper>
                    </Grid>
                  </Grid>
                  <br />
                </main>
              </StyledMain>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            {/* <RightBar /> */}
          </div>
        </div>
    // <ThemeProvider theme={defaultTheme} >
    //   <NavbarUnlog/>
    //   {data ? (
    //     <StyledMain>
    //     <main style={{marginLeft: '10px', marginTop: '10px'}}>
    //       {/* <div style={{ display: 'flex', justifyContent: 'left', wordWrap: 'break-word' }}>
    //         <Typography component="h1" variant="h3" color="inherit" gutterBottom >
    //           {data.title}
    //         </Typography>
    //       </div> */}
    //       <Grid container spacing={2} >
    //         <Grid item xs={12} md={5} style={{ display: 'block', justifyContent: 'center' }}>
    //           <StyledPaper>
    //             <img
    //               ref={imgRef}
    //               src={getPicPath(data.img)}
    //               alt="Mô tả ảnh"
    //               style={{ width: '100%', height: 'auto', display: 'block' }}
    //             />
    //             <h5 style={{float: 'right', marginRight: '20px'}}>
    //                 {data.author}
    //             </h5>
    //           </StyledPaper>
    //         </Grid>
    //         <Grid item xs={12} md={7} style={{ display: 'block', justifyContent: 'center', paddingRight:'20px' }}>
    //             <MediaControlCard props={data}/>
    //             <StyledPaper>
    //                 <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
    //                 <Typography variant="h6" gutterBottom>
    //                     {data.title}
    //                 </Typography>
    //                 <Typography>
    //                     {data.description}
    //                     </Typography>
    //                 </Paper>
    //             </StyledPaper>
    //         </Grid>
    //       </Grid>
    //       <br />
    //     </main>
    //   </StyledMain>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
      
    // </ThemeProvider>
    
  );
}

export default SinglePicUnlog;