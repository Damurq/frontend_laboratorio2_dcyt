import React from 'react';

// reac-router-dom
import { useLocation } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import BoardList from 'ui-component/Board/BoardList';
//= =============================|| SAMPLE PAGE ||==============================//

const DataListEspecial = () => {
    const location = useLocation();
    const path = location.pathname.replace('/', '');
    console.log('here');

    return (
        <MainCard>
            <BoardList schema={path} />
        </MainCard>
    );
};

export default DataListEspecial;
