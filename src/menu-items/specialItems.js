import { IconBoxMultiple, IconCertificate, IconApps } from '@tabler/icons';

// constant
const icons = {
    IconBoxMultiple,
    IconCertificate,
    IconApps
};

// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const specialItems = {
    id: 'pages',
    title: 'Listas desplegables',
    caption: 'Listas especiales',
    type: 'group',
    children: [
        {
            id: 'special',
            title: 'CRUDS',
            type: 'collapse',
            icon: icons.IconBoxMultiple,
            children: [
                {
                    id: 'programas_pensum',
                    title: 'Programas y sus pensums',
                    type: 'item',
                    url: '/program_pensum',
                    icon: icons.IconCertificate,
                    breadcrumbs: false
                },
                {
                    id: 'comisión_pensum',
                    title: 'Comición y sus pensums',
                    type: 'item',
                    url: '/comission',
                    icon: icons.IconApps,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default specialItems;
