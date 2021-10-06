import dashboard from './dashboard';
import other from './other';
import gestor from './gestor';
import reports from './reports';
import specialItems from './specialItems';

// ===========================|| MENU ITEMS ||=========================== //

const role = localStorage.getItem('role');

const menuItems = {
    items: role === 'A' ? [dashboard, other, specialItems, reports] : [dashboard, gestor]
};

export default menuItems;
