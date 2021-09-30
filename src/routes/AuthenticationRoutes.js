import React, { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// project imports
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/Login')));

// ===========================|| AUTHENTICATION ROUTING ||=========================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        }
    ]
};

export default AuthenticationRoutes;
