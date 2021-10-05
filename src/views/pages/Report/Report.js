import React from 'react';

// reac-router-dom
import { useLocation } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import BoardReport from 'ui-component/Board/BoardReport';

//= =============================|| SAMPLE PAGE ||==============================//

const Report = () => {
    const location = useLocation();
    const path = location.pathname.replace('/report/', '');

    return (
        <MainCard>
            <BoardReport numReport={path} />
        </MainCard>
    );
};

export default Report;
