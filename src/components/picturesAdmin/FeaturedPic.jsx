import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import OnePicEdit from './OnePicEdit';

import { getPicPath } from "../../utils";

function FeaturedPic(props) {
  
  const { pic } = props;

  const [open, setOpen] = React.useState(false);
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
  // console.log('FeaturedPic rendered with currentPic:', currentPic);

  const handleUpdate = (updatedData) => {
    // Cập nhật state của FeaturedPic sau khi cập nhật thành công
    setCurrentPic((prevPic) => ({ ...prevPic, ...updatedData }));
    // console.log("Có thay đổi!");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Grid item xs={12} md={6}>
        <CardActionArea component="a" onClick={handleClickOpen}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {(currentPic.title.length < 50) ? currentPic.title : (`${currentPic.title.substring(0, 50)}...`)}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
              {(currentPic.author.length < 50) ? currentPic.author : (`${currentPic.author.substring(0, 50)}...`)}
              </Typography>
              <Typography variant="subtitle1" paragraph>
              {(currentPic.description.length < 130) ? currentPic.description : (`${currentPic.description.substring(0, 130)}...`)}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Chỉnh sửa...
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={imageLoaded ? getPicPath(currentPic.img) : getPicPath("null.png")}
              alt={currentPic.imageLabel}
            />
          </Card>
        </CardActionArea>
        
      </Grid>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
      ><OnePicEdit pic={currentPic} onUpdate={handleUpdate}/></Dialog>
      <br />
      
    </React.Fragment>
  );
}

export default FeaturedPic;