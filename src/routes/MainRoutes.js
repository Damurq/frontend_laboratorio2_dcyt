import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/pages/Home')));

// sample page routing
const DataList = Loadable(lazy(() => import('views/pages/DataList/DataList')));

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/pensum',
            element: <DataList />
        },
        {
            path: '/program',
            element: <DataList />
        },
        {
            path: '/user',
            element: <DataList />
        }
    ]
};

export default MainRoutes;
