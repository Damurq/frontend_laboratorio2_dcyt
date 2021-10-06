// assets
import { IconHome2 } from '@tabler/icons';

// constant
const icons = {
    IconHome2
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
    id: 'home',
    title: 'Home',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Home',
            type: 'item',
            url: '/home',
            icon: icons.IconHome2,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
