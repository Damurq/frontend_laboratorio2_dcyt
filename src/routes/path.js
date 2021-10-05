import { Navigate, Outlet } from 'react-router-dom';
import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/pages/Home')));

// sample page routing
const DataList = Loadable(lazy(() => import('views/pages/DataList/DataList')));
const Report = Loadable(lazy(() => import('views/pages/Report/Report')));

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/Login')));

const routes = () => {
    const token = localStorage.getItem('token');

    return [
        {
            path: '/',
            element: token ? <MainLayout /> : <Navigate to="/login" />,
            children: [
                { path: '/home', element: <DashboardDefault /> },
                { path: '/pensum', element: <DataList /> },
                { path: '/program', element: <DataList /> },
                { path: '/user', element: <DataList /> },
                { path: '/report/1', element: <Report /> },
                { path: '/', element: <Navigate to="/home" /> }
            ]
        },
        {
            path: '/',
            element: !token ? <MinimalLayout /> : <Navigate to="/home" />,
            children: [
                { path: 'login', element: <AuthLogin /> },
                { path: '/', element: <Navigate to="/login" /> }
            ]
        }
    ];
};

export default routes;
