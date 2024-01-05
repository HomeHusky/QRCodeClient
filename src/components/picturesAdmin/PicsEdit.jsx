import * as React from 'react';
import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from '../blog/MainFeaturedPost';
import FeaturedPic from './FeaturedPic';
import Main from '../blog/Main';
import Sidebar from '../blog/Sidebar';
import Header from '../header/Header';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from '../../context/authContext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AddNewPic from './AddNewPic';
import AddIcon from '@mui/icons-material/Add';
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function PicsEdit() {
  
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(1);
  const picsPerPage = 6;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data, refetch  } = useQuery(["pics"], () =>
    makeRequest.get("/pics/all").then((res) => {
      return res.data.result;
    }),
    {
      onSuccess: () => {
        // Khi dữ liệu đã được tải xong, gọi lại refetch sau một khoảng thời gian
        setTimeout(() => {
          refetch();
        }, 1000); // Thời gian chờ 1000 miligiây (1 giây)
      },
    }
  );

  // Khi bạn muốn gọi lại query "pics"
  const reloadData = () => {
    refetch();
  };

  const handleAddNewPic = (res) => {
    // Cập nhật danh sách ảnh khi có ảnh mới được thêm vào
    setOpen(false);
    reloadData();
    // console.log(res);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg">
        <br />
        <main>
        
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button onClick={handleClickOpen} color="primary" variant="contained" startIcon={<AddIcon />}>
              Thêm mới
            </Button>
            <Pagination count={Math.ceil((data) ? (data.length / picsPerPage):(0))}
              page={page}
              onChange={(event, value) => setPage(value)} />
          </Stack>
          <br />
          <hr />
          <br />
          {/* <MainFeaturedPic pic={mainFeaturedPic} /> */}
          <Grid container spacing={4}>
            {error
            ? "Something went wrong!" 
            : isLoading 
            ? "loading" 
            : data
              .slice((page - 1) * picsPerPage, page * picsPerPage)
              .map((pic) => <FeaturedPic key={pic.id} pic={pic} />)
          }
          </Grid>
          <br />
        </main>
      </Container>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
      ><AddNewPic onAddNewPic={handleAddNewPic}/></Dialog>
    </ThemeProvider>
    
  );
}