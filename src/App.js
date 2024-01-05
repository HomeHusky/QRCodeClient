import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import PicsEdit from "./pages/pictures/PicsEdit";
import SinglePic from "./pages/pictures/SinglePic";
import SinglePicUnlog from "./components/singlePicture/SinglePicUnlog";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { createContext, useContext } from "react";
import React, { useState, useEffect } from 'react';
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTopButton from "./components/scrolltotop/ScrollToTopButton";
import GlobalBackdrop from "./components/backdrop/Backdrop";
import { AppProvider } from "./context/appContext";
import { BreadcrumbProvider } from "./context/breadCrumbContext";
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import Toolbar from '@mui/material/Toolbar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import GlobalSnackbars from "./components/snackbar/Snackbar";
// import TemporaryDrawer from "./components/navbar/Topbar";
import TopbarComponent from "./components/navbar/Topbar";
const App = () => {
  const isLoginPage = window.location.pathname === "/login";
  const isRegisterPage = window.location.pathname === "/register";

  const { currentUser } = useContext(AuthContext);

  const queryClient = new QueryClient();

  const Layout = () => {


    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-light`}>
          <Navbar />
          {/* <TopbarComponent /> */}
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 10 }}>
              {/* <KeyboardDoubleArrowLeftOutlinedIcon className="toggle-button" onClick={toggleLeftBar} /> */}

              <Outlet />
            </div>
            {/* <RightBar /> */}
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {

    if (!currentUser) {
      // Nếu không phải là người dùng hiện tại và đang ở trang login hoặc register,
      // Chuyển hướng về trang login
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/pics",
          element: <PicsEdit />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/singleImage/:id/:qrImage",
          element: <SinglePic />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/singleImage/unLog/:id/:qrImage",
      element: <SinglePicUnlog />,
    }
  ]);

  return (
    <div>
      <AppProvider>
        <BreadcrumbProvider>
          <RouterProvider router={router} />

          {!isLoginPage && !isRegisterPage && <ScrollToTopButton />}

          <GlobalBackdrop />
          <GlobalSnackbars />
        </BreadcrumbProvider>
      </AppProvider>
    </div >
  );
}

export default App;
