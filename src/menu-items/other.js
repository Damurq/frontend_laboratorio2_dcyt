// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconCertificate, IconFileCertificate, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    IconCertificate,
    IconFileCertificate,
    IconUsers
};

// ===========================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||=========================== //

const other = {
    id: 'sample-docs-roadmap',
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
        }
    ]
};

export default other;
