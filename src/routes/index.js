import { useRoutes } from 'react-router-dom';

// routes
import routes from './path';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    return useRoutes(routes());
}
