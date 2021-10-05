import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import routes from './path';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    // const { isAuthenticated } = useSelector((state) => state.auth);

    return useRoutes(routes());
}
