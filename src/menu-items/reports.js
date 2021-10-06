import { IconDeviceAnalytics, IconReport } from '@tabler/icons';

// constant
const icons = {
    IconDeviceAnalytics,
    IconReport
};

// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const reports = {
    id: 'reports',
    title: 'Reportes',
    caption: 'Reportes personalizados',
    type: 'group',
    children: [
        {
            id: 'report',
            title: 'Reportes',
            type: 'collapse',
            icon: icons.IconDeviceAnalytics,
            children: [
                {
                    id: 'program report',
                    title: 'Reporte de programas',
                    type: 'item',
                    url: '/report/1',
                    icon: icons.IconReport,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default reports;
