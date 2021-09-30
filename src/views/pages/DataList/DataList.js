import React from 'react';

// reac-router-dom
import { useLocation } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Board from 'ui-component/Board/Board';
import ModalForm from 'ui-component/modalForm/ModalForm';
import forms from 'data/forms.json';
//= =============================|| SAMPLE PAGE ||==============================//

const DataList = () => {
    const location = useLocation();
    const path = location.pathname.replace('/', '');
    const fomrs = forms[path];
    return (
        <MainCard>
            <div className="header-content-section">
                <h2 className="title-section">{fomrs.title}</h2>
                <ModalForm schema={path} type="add" />
            </div>
            <Board schema={path} urlBase="http://127.0.0.1:8000" />
        </MainCard>
    );
};

export default DataList;
