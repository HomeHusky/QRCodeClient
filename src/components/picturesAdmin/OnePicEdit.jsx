import Typography from '@mui/material/Typography';
import { useContext, useEffect } from "react";
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
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import QRCode from 'qrcode.react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useAppContext } from '../../context/appContext';

const OnePicEdit = React.memo((props) => {
  const { handleOpenSnackbar, handleMessageSnackbar, handleTypeSnackbar } = useAppContext();
  const openSnackbar = (message, type) =>{
    handleOpenSnackbar();
    handleMessageSnackbar(message);
    handleTypeSnackbar(type);
  }
  
  const { pic } = props;
  
  useEffect(() => {
    console.log('OnePicEdit received new pic:', pic);
  }, [pic]);
  const { currentUser, domainClient } = useContext(AuthContext);
  // console.log(currentUser);
  // console.log(domainClient);
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [title, setTitle] = useState(pic.title);
  const [description, setDescription] = useState(pic.description);
  const [author, setAuthor] = useState(pic.author);
  const buttonSx = {
    ...(success && {
      bgcolor: green[800],
      '&:hover': {
        bgcolor: green[1000],
      },
    }),
  };

  const buttonCx = {
    ...(success && {
      bgcolor: red[800],
      '&:hover': {
        bgcolor: red[1000],
      },
    }),
  };

  const downloadQR = () => {
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    console.log('pngUrl', pngUrl);
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = "qrCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDeleteImage = async () => {
    const imageIdToDelete = pic.id;
    const deleteData = {
      img: pic.img,
    };
    setSuccess(false);
    setLoading(true);
    try {
      const response = await makeRequest.delete(`/pics/deleteImage/${imageIdToDelete}`);
      // onDelete(id);
      console.log(response);
      setIsEdit(false);
      if(response.status === 200){
        setSuccess(true);
        setLoading(false);
        openSnackbar("Xoá thành công!","success");

      }
      
    } catch (error) {
      console.error('Error deleting image:', error);
      setSuccess(true);
      setLoading(false);
      openSnackbar("Xoá thất bại!", "error");

    }
  }

  const handleSubmitClick = async () => {
    if(isEdit === false) {
      alert("Chưa có thay đổi.")
      return;
    }
    const imgUrl = await handleUpload();
    const imageIdToUpdate = pic.id;
    const updatedImageData = {
      author: author,
      title: title,
      description: description,
      img: !file ? pic.img : imgUrl,
      imgLabel: 'New Label',
      updator: currentUser.id
    };
    setSuccess(false);
    setLoading(true);
    try {
      const response = await makeRequest.put("/pics/update", { imageId: imageIdToUpdate, updatedData: updatedImageData });
      // console.log(response);
      setIsEdit(false);
      if(response.status === 200){
        setSuccess(true);
        setLoading(false);
        openSnackbar(response.data.message,"success");
        
      } else if(response.status === 201){
        setSuccess(true);
        setLoading(false);
        openSnackbar(response.data.message,"success");
      } else {
        setSuccess(true);
        setLoading(false);
        openSnackbar(response.data.message,"error");
      }
      if (props.onUpdate) {
        props.onUpdate(updatedImageData);
      }
    } catch (error) {
      console.error('Error updating image:', error);
      openSnackbar("Cập nhật thất bại!", "error");

    }
  };

  const handleChangeImage = (e) => {
    setFile(null);
    setFile(e.target.files[0]);
    setIsEdit(true);
    // console.log("Đã đổi ảnh!");
    // console.log(file);
  }

  function handleChangeTitle(params) {
    setTitle(params);
    setIsEdit(true);
  }

  function handleChangeDescription(params) {
    setDescription(params);
    setIsEdit(true);
  }

  function handleChangeAuthor(params) {
    setAuthor(params);
    setIsEdit(true);
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
            onChange={(e) => handleChangeTitle(e.target.value)}
            maxRows={100}            
          />
      </DialogTitle>
        <DialogContent>
      <Grid container spacing={2}>
        {/* Div 1 */}
        <Grid item xs={12} md={8} style={{ display: 'block', justifyContent: 'center' }} onClick={handleClick}>
          {/* Ảnh */}
          {/* Đặt mã nguồn hình ảnh của bạn ở đây */}
          <img src={!file ? (getPicPath(pic.img)) : URL.createObjectURL(file)} alt={pic.imageLabel} style={{ width: '100%', height: '400px', objectFit: 'contain' }} />
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
        <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            {/* Vùng hiện QR */}
            {/* <div style={{ width: '80%', float: 'right' }}>
              Đặt mã nguồn hiển thị QR của bạn ở đây
              <img src={getPicPath(pic.qrImage)} alt={pic.qrId} style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
            </div> */}
            
            <Stack spacing={2}>
              <QRCode
                  id='qrcode'
                  value={`http://qr-code-sigma-eight.vercel.app:3000/singleImage/unLog/${pic.id}/${pic.qrImage}`}
                  size={290}
                  level={'H'}
                  includeMargin={true}
                />
              <br />
              <Button
                color={"success"}
                onClick={downloadQR}
                
              >
                Download QR
              </Button>
            </Stack>
             
        </Grid>
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
            onChange={(e) => handleChangeDescription(e.target.value)}
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
              onChange={(e) => handleChangeAuthor(e.target.value)}
              maxRows={100}            
            />
          </Typography>
      </Grid>
      </DialogContent>
      
        <DialogActions>
          <Button 
            color={"error"}
            sx={buttonCx}
            disabled={loading}
            variant="contained" startIcon={<DeleteIcon />}
            onClick={handleDeleteImage}
          >
            Xoá
          </Button>
          <Button
            color={"success"}
            variant="contained" startIcon={<SaveIcon/>}
            sx={buttonSx}
            disabled={loading || !isEdit}
            onClick={handleSubmitClick}
          >
            Lưu
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

export default OnePicEdit;