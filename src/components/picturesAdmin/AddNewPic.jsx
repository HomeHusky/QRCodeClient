import Typography from '@mui/material/Typography';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeRequest } from '../../axios';
import { getPicPath } from "../../utils";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import QRCode from 'qrcode.react';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useAppContext } from '../../context/appContext';

const AddNewPic = (({ onAddNewPic }) => {
  const { handleOpenSnackbar, handleMessageSnackbar, handleTypeSnackbar } = useAppContext();

    const pic = {
        title: "",
        description: "",
        author: "",
        img: "null.png",
        imgLabel: "null",
        updator: ""
    }
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(true);
  const [isSubmit, setSubmit] = React.useState(true);
  const [title, setTitle] = useState(pic.title);
  const [description, setDescription] = useState(pic.description);
  const [author, setAuthor] = useState(pic.author);

  const buttonSx = {
    ...(success && {
      bgcolor: blue[800],
      '&:hover': {
        bgcolor: blue[1000],
      },
    }),
  };

//   const buttonCx = {
//     ...(success && {
//       bgcolor: red[800],
//       '&:hover': {
//         bgcolor: red[1000],
//       },
//     }),
//   };

  const openSnackbar = (message, type) =>{
    handleOpenSnackbar();
    handleMessageSnackbar(message);
    handleTypeSnackbar(type);
  }

  const handleSubmitClick = async () => {
    const imgUrl = await handleUpload();
    const insertImageData = {
      author: author,
      title: title,
      description: description,
      img: !file ? "null.png" : imgUrl,
      imgLabel: 'New Label',
      creator: currentUser.id,
      updator: currentUser.id,
    };
    setSuccess(false);
    setLoading(true);
    console.log(insertImageData);
    setSubmit(true);
    try {
      const response = await makeRequest.post("/pics/new", insertImageData );
      // console.log(response.statusText);
      setSuccess(true);
      setLoading(false);
      if(response.statusText === 'Created'){
        openSnackbar("Thêm mới thành công!","success");
        onAddNewPic(response.status);
      }
      
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu insert:', error);
      setSuccess(true);
      setLoading(false);
      openSnackbar("Vui lòng thử lại!", "error");
    }
  };

  const handleChangeImage = (e) => {
    setFile(null);
    setFile(e.target.files[0]);
    setSubmit(false);
    // console.log("Đã đổi ảnh!");
    // console.log(file);
  }
  
  const fileInputRef = useRef(null);
  
  const handleClick = async (e) => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) return;
  
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await makeRequest.post("/upload", formData);

      console.log(response.status);
  
      // console.log("File đã được tải lên:", response.data);
  
      // Gọi callback function và truyền giá trị
      return response.data;

    } catch (error) {
      console.error("Lỗi khi tải lên file:", error);
    }
  };
  
  return (
    <div>
      <DialogTitle>
      <TextField
            id="outlined-multiline-flexible"
            label="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxRows={100}            
          />
      </DialogTitle>
        <DialogContent>
      <Grid container spacing={1}>
        {/* Div 1 */}
        <Grid item xs={12}  style={{ display: 'block', justifyContent: 'center' }} onClick={handleClick}>
          {/* Ảnh */}
          {/* Đặt mã nguồn hình ảnh của bạn ở đây */}
          <img src={!file ? (getPicPath(pic.img)) : URL.createObjectURL(file)} alt={pic.imgLabel} style={{ width: '100%', height: '400px', objectFit: 'contain' }} />

          <div style={{ clear: 'both', float: 'right' }}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={(e) => handleChangeImage(e)}
            />
            {/* <Button
              color={"primary"}
              
            >
              Thay đổi ảnh
            </Button> */}
          </div>
        </Grid>
        {/* <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            Vùng hiện QR
            <div style={{ width: '80%', float: 'right' }}>
              Đặt mã nguồn hiển thị QR của bạn ở đây
              <img src={getPicPath(pic.qrImage)} alt={pic.qrId} style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
            </div>
            
              <QRCode
                id='qrcode'
                value='https://viblo.asia/u/tranchien'
                size={290}
                level={'H'}
                includeMargin={true}
              />
            
        </Grid> */}
      </Grid>
      {/* Div 2 */}
      <br />
      <hr />
      <br />
      <Grid item xs={12}>
        <TextField
            id="outlined-multiline-flexible"
            label="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            maxRows={100}
            fullWidth
          />
      </Grid>
      <br />
      {/* Div 3 */}
      <Grid item xs={12}>
          {/* Tác giả */}
          <Typography variant="h6" align="right">
            <TextField
              id="outlined-multiline-flexible"
              label="Tác giả"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxRows={100}            
            />
          </Typography>
      </Grid>
      </DialogContent>
      
        <DialogActions>
          {/* <Button 
            color={"error"}
            
            // sx={buttonCx}
            // disabled={loading}
            variant="contained" startIcon={<DeleteIcon />}
          >
            Xoá
          </Button> */}
          <Button
            color={"primary"}
            variant="contained" startIcon={<DoneIcon/>}
            sx={buttonSx}
            disabled={loading || isSubmit}
            onClick={handleSubmitClick}
          >
            Xác nhận
          </Button>
          {loading && (
            <CircularProgress
              size={40}
              sx={{
                color: green[500],
                position: 'fixed',
                top: '7%',
                left: '85%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
          
        </DialogActions>
    </div>
  );
});

export default AddNewPic;