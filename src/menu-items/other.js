/* eslint-disable */
// assets
import { IconApps, IconCertificate, IconFileCertificate, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconApps,
    IconCertificate,
    IconFileCertificate,
    IconUsers
};

// ===========================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||=========================== //

const other = {
    id: 'cruds',
    type: 'group',
    children: [
        {
            id: 'pensums',
            title: 'Pensums',
            type: 'item',
            url: '/pensum',
            icon: icons.IconFileCertificate,
            breadcrumbs: false
        },
        {
            id: 'programas',
            title: 'Programas',
            type: 'item',
            url: '/program',
            icon: icons.IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'usuarios',
            title: 'Usuarios',
            type: 'item',
            url: '/user',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'comisión',
            title: 'Comición',
            type: 'item',
            url: '/commission',
            icon: icons.IconApps,
            breadcrumbs: false
        }
    ]
};

export default other;
