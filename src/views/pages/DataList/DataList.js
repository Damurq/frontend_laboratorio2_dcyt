import React from 'react';

// reac-router-dom
import { useLocation } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Board from 'ui-component/Board/Board';
import ModalForm from 'ui-component/modalForm/ModalForm';
//= =============================|| SAMPLE PAGE ||==============================//

const DataList = () => {
    const location = useLocation();
    const path = location.pathname.replace('/', '');
    return (
        <MainCard>
            <Board schema={path} />
        </MainCard>
    );
};

export default DataList;
