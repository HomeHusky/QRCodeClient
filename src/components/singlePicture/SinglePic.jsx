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
import TitlebarBelowImageList from './TitlebarBelowImageList';

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

const SinglePic = () => {
  const { id, qrImage } = useParams();
  const [data, setData] = useState(null);
  const imgRef = React.useRef();
  // const location = useLocation();
  // const id = location.state.id;
  // const data = location.state.data;
  // console.log(data);
  const [heightImg, setHeightImg] = useState(0);
  const { currentUser } = useContext(AuthContext);

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
    <ThemeProvider theme={defaultTheme} >
      {data ? (
        <StyledMain>
        <main style={{marginLeft: '10px', marginTop: '10px'}}>
          {/* <div style={{ display: 'flex', justifyContent: 'left', wordWrap: 'break-word' }}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom >
              {data.title}
            </Typography>
          </div> */}
          <Grid container spacing={2} >
            <Grid item xs={12} md={8} style={{ display: 'block', justifyContent: 'center' }}>
              <StyledPaper>
                <img
                  ref={imgRef}
                  // src= {error
                  //   ? "Something went wrong!"
                  //   : isLoading
                  //   ? "loading"
                  //   : getPicPath(data.img)}
                  src={getPicPath(data.img)}
                  alt="Mô tả ảnh"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <h5 style={{float: 'right', marginRight: '20px'}}>
                  {/* {error
                    ? "Something went wrong!"
                    : isLoading
                    ? "loading"
                    : data.author} */}
                    {data.author}
                </h5>
                
                {/* <br />
                <div style={{marginLeft: '50px'}}>
                  <h2>{data.title}</h2>
                  <p>{data.description}</p>
                </div> */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                  <Typography variant="h6" gutterBottom>
                    {/* {error
                      ? "Something went wrong!"
                      : isLoading
                      ? "loading"
                      : data.title} */}
                      {data.title}
                  </Typography>
                  <Typography>
                    {/* {error
                      ? "Something went wrong!"
                      : isLoading
                      ? "loading"
                      : data.description} */}
                      {data.description}
                    </Typography>
                </Paper>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <TitlebarBelowImageList heightImg={heightImg} currentImageId={id}/>
              </StyledPaper>
            </Grid>
          </Grid>
          <br />
        </main>
      </StyledMain>
      ) : (
        <p>Loading...</p>
      )}
      
    </ThemeProvider>
    
  );
}

export default SinglePic;