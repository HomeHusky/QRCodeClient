import React, { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const setBreadcrumbsData = (data) => {
        setBreadcrumbs(data);
    };

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs: setBreadcrumbsData }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};

export const useBreadcrumb = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
    }
    return context;
};
