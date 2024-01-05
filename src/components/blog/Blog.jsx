import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Header from '../header/Header';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import ImageMasonry from './ImageMasonry';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { getPicPath } from '../../utils';
import { useAppContext } from '../../context/appContext';

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://wallpapers.com/images/high/energy-solar-panels-on-field-839dns3yqlonmxxk.webp',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://wallpapers.com/images/high/energy-panels-in-blue-color-zytnfa8zwoy8uir5.webp',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://wallpapers.com/images/high/energy-windmills-gigantic-propellers-e3cam0r76nna86ht.webp',
    imageLabel: 'Image Text',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  // archives: [
  //   { title: 'March 2020', url: '#' },
  //   { title: 'February 2020', url: '#' },
  //   { title: 'January 2020', url: '#' },
  //   { title: 'November 1999', url: '#' },
  //   { title: 'October 1999', url: '#' },
  //   { title: 'September 1999', url: '#' },
  //   { title: 'August 1999', url: '#' },
  //   { title: 'July 1999', url: '#' },
  //   { title: 'June 1999', url: '#' },
  //   { title: 'May 1999', url: '#' },
  //   { title: 'April 1999', url: '#' },
  // ],
  // social: [
  //   { name: 'GitHub', icon: GitHubIcon },
  //   { name: 'X', icon: XIcon },
  //   { name: 'Facebook', icon: FacebookIcon },
  // ],
};



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const { handleOpenSnackbar, handleMessageSnackbar, handleTypeSnackbar } = useAppContext();
  const openSnackbar = (message, type) =>{
    handleOpenSnackbar();
    handleMessageSnackbar(message);
    handleTypeSnackbar(type);
  }
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
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg">
        {/* <Header/> */}
        <br />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
          {/* {error
            ? "Something went wrong!" 
            : isLoading 
            ? "loading" 
            : data
              .map((pic) => <FeaturedPost key={pic.id} pic={pic}/>)
          } */}
          </Grid>
          <br />
          <Grid alignContent={"center"}>
            <ImageMasonry/>
          </Grid>
          
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              // archives={sidebar.archives}
              // social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}