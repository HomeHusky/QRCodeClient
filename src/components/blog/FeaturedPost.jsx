import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { getPicPath } from '../../utils';

function FeaturedPost(props) {
  
  const { pic } = props;
  const [currentPic, setCurrentPic] = React.useState(pic);
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    // Kiểm tra xem ảnh đã tải lên hay chưa và cập nhật trạng thái tương ứng
    if (getPicPath(currentPic.img)) {
      setImageLoaded(true);
    } else {
      setImageLoaded(false);
    }
  }, [currentPic.img]);
  const handleClickImage = async () => {
    try {
      const response = await makeRequest.get(`/pics/img/${pic.id}/${pic.qrImage}`)
      console.log(response);
      if(response.status === 200){
        console.log(response.status)
        // openSnackbar(response.status,"success");
      }
      else{
        console.log(response.status)
        // openSnackbar(response.status, "error");
      }
    } catch (error) {
      console.error('Có lỗi xảy ra!', error);
      // openSnackbar('Có lỗi xảy ra!', "error");
    }
    return;
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" onClick={handleClickImage}>
        <Card sx={{ display: 'flex' }}>
          
          <CardContent sx={{ flex: 1 }} >
            <Typography component="h2" variant="h5">
              {pic.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {pic.author}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {pic.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              <IconButton>
                Chi tiết
              </IconButton>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={imageLoaded ? getPicPath(pic.img) : getPicPath("null.png")}
            alt={pic.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;