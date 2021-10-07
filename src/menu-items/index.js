import dashboard from './dashboard';
import other from './other';
import gestor from './gestor';
import reports from './reports';

// ===========================|| MENU ITEMS ||=========================== //

const role = localStorage.getItem('role');

const menuItems = {
    items: role === 'A' ? [dashboard, other, reports] : [dashboard, gestor]
};

export default menuItems;
