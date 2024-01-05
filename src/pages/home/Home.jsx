import * as React from 'react';
import { useEffect } from 'react';
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import Blog from "../../components/blog/Blog";
import { useState } from "react";
import "./home.scss";
import GlobalBackdrop from '../../components/backdrop/Backdrop';
import { useAppContext } from '../../context/appContext';
import { useBreadcrumb } from '../../context/breadCrumbContext';
const Home = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  const { handleOpenBackdrop, handleCloseBackdrop } = useAppContext();
  useEffect(() => {
    // Update breadcrumbs when the component mounts
    // setBreadcrumbs([
    //   { label: 'Trang chủ', path: '/' },
    // ]);
  
    // Close the backdrop when the component mounts
    handleCloseBackdrop();
  }, [handleCloseBackdrop]);
  return (
    <div className="home">
      {/* <Stories/> */}
      <Blog/>
      
      {/* <Share/> */}
      {/* <Posts/>  */}
    </div>
  )
}

export default Home