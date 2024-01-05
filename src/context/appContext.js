// ScrollToTopContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();
const drawerWidth = 240;
export const AppProvider = ({ children }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [showLeftBarButton, setLeftbarButton] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [showLeftbar, setShowLeftbar] = useState(false);
    const [hideNavbar, setHideNavbar] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [typeSnackbar, setTypeSnackbar] = useState("");

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleMessageSnackbar = (message) => {
        setMessageSnackbar(message);
    }

    const handleTypeSnackbar = (type) => {
        setTypeSnackbar(type);
    }

    const handleLeftBarButton = () => {
        setLeftbarButton(!showLeftBarButton);
    }

    const toggleLeftbar = () => {
        if (window.innerWidth > 2 * drawerWidth) {
            setShowLeftbar(!showLeftbar);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Hiển thị nút scroll khi cuộn hết 5% màn hình
        setShowScrollButton(scrollY > windowHeight / 20);

        // Ẩn thanh navbar khi cuộn
        setHideNavbar(scrollY > 0);
    };

    const handleOpenBackdrop = () => {
        setOpenBackdrop(true);
    }

    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AppContext.Provider value={{
            showScrollButton, scrollToTop,
            hideNavbar,
            openBackdrop, handleOpenBackdrop, handleCloseBackdrop,
            showLeftBarButton, handleLeftBarButton,
            showLeftbar, toggleLeftbar,
            openSnackbar, handleOpenSnackbar, handleCloseSnackbar,
            messageSnackbar, handleMessageSnackbar,
            typeSnackbar, handleTypeSnackbar
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
