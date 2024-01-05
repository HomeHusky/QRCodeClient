import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { getPicPath } from '../../utils';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../../context/appContext';
import Tooltip from '@mui/material/Tooltip';

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function ImageMasonry() {

  const { handleOpenBackdrop, handleCloseBackdrop } = useAppContext();

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
  if(!data){
    handleOpenBackdrop();
  }
  return (
    <Box sx={{ width: "100%", minHeight: "100%" }}>
      <Masonry columns={3} spacing={2}>
        {data ? (data.map((item, index) => (
          <div key={index} onClick={() => handleClickImage(item.id, item.qrImage)}>
            <Label>{index + 1}</Label>
            <Tooltip title={item.title} arrow>
            <img
              srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
              // src={`${item.img}?w=162&auto=format`}
              src={getPicPath(item.img)}
              alt={item.title}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width: '100%',
              }}
            />
            </Tooltip>
          </div>
        ))):''}
      </Masonry>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://wallpapers.com/images/high/nv-energy-power-plant-with-windmills-rglct021yyz50bqj.webp',
    title: 'nv-energy-power-plant-with-windmills',
  },
  {
    img: 'https://wallpapers.com/images/high/renewable-energy-3400-x-2267-wallpaper-kd2pljdwxifpmhbh.webp',
    title: 'renewable-energy-3400-x-2267',
  },
  {
    img: 'https://wallpapers.com/images/high/energy-1200-x-1200-picture-dxuecc9j3ch63df0.webp',
    title: 'Mushrooms',
  },
  {
    img: 'https://wallpapers.com/images/high/energy-1105-x-900-picture-q2ic3fr03sutmb30.webp',
    title: 'Tower',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
    title: 'Tree',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
    title: 'Camping Car',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
    title: 'Mountain',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];