import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { makeRequest } from "../../axios";
import { getPicPath } from '../../utils';
import { useNavigate } from "react-router-dom";

const TitlebarBelowImageList = ({ heightImg, currentImageId }) => {

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

  const navigate = useNavigate()

  const handleClickImage = async (id, qrImage) => {
    try {
      navigate(`/singleImage/${id}/${qrImage}`);
      
    } catch (error) {
      console.error('Có lỗi xảy ra!', error);
      // openSnackbar('Có lỗi xảy ra!', "error");
    }
    return;
  }

  console.log('Chiều cao của ảnh:', heightImg);
  console.log(data);
  console.log(currentImageId);
  console.log(data)
  const filteredData = data ? data.filter(item => item.id !== currentImageId) : [];
  console.log(filteredData);
  return (
    <ImageList sx={{ width: 470, height: ((heightImg>10) ? heightImg:"100") }}>
      {error
        ? "Something went wrong!" 
        : isLoading 
        ? "loading" 
        : data.map((item) => (
          <ImageListItem key={item.id}>
            <img
              onClick={() => handleClickImage(item.id, item.qrImage)}
              style={{height: '220px', width: '220px'}}
              srcSet={`${getPicPath(item.img)}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${getPicPath(item.img)}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={(item.title.length<25)?item.title : (`${item.title.substring(0, 25)}...`)}
              subtitle={<span>by: {item.author}</span>}
              position="below"
            />
          </ImageListItem>
        ))
      }
    </ImageList>
  );
}


export default TitlebarBelowImageList;