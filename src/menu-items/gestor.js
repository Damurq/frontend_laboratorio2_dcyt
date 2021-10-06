// assets
import { IconFileCertificate } from '@tabler/icons';

// constant
const icons = {
    IconFileCertificate
};

const gestor = {
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
        }
    ]
};

export default gestor;
