/* eslint-disable */
import './Board.css'
import { filterDataTable, request } from '../../utils/fetch/searchData'
import { useEffect, useState } from 'react'
import schemas from '../../data/filterData.json'
import Pagination from '../Pagination/Pagination'
import React from 'react'
import { IconEdit } from '@tabler/icons';
import ModalForm from '../../ui-component/modalForm/ModalForm'

/**
 *  Pantalla que permite imprimir datos de la api  de Rick y morty -esp
 * @param {schema} permite determinar los datos que se van a imprimir-esp
 * @returns JSX
 */
const Board = ({ schema, urlBase }) => {
    //
    const fields = schemas[schema]["data"].filter(f=>!schemas[schema]["ignore"].includes(f))
    const [data, setData] = useState([])                        //Datos actuales en pantalla
    //pagination
    const [totalData, setTotalData] = useState([])          //Lista de datos que han sido filtrados -esp
    const [currentPage, setCurrentPage] = useState(1) //currentPage
    const [totalRecords, setTotalRecords] = useState(21)    //Total de registros actuales           -esp
    const [pageLimit, setPageLimit] = useState(20)
    //otras



    const onPageChanged = data => {
        if (totalData.length === 0) {
            setCurrentPage(data.currentPage);
            let url = data.currentPage === 1 ? urlBase + schema : urlBase + schema + '?page=' + data.currentPage
            request(url)
                .then((response) => {
                    setTotalRecords(response['info']['count']);
                    if (response.results.length > 0) {
                        setPageLimit(response.results.length);
                        let fdt = filterDataTable(schemas[schema]['data'], response.results);
                        setData(fdt);
                    }
                })
        } else {
            const offset = (data.currentPage - 1) * pageLimit;
            setTotalRecords(totalData.length);
            setData(totalData.slice(offset, offset + pageLimit));
            setCurrentPage(data.currentPage);
        }
    }

    useEffect(() => {
        if (totalData.length === 0) {
            const ac = new AbortController();
            if (Object.keys(schemas).includes(schema)) {
                // let url = data.currentPage === 1 ? urlBase + schema : urlBase + schema + '?page=' + data.currentPage
                let url = urlBase + "/api/" + schema + "/list/"
                request(url)
                    .then((response) => {
                        setTotalRecords(response.length);
                        if (response.length > 0) {
                            setPageLimit(response.length);
                            let fdt = filterDataTable(schemas[schema]['data'], response);
                            setData(fdt);
                        }
                    })
            }
            return () => ac.abort();
        }
        else {
            setTotalRecords(totalData.length);
            let final = totalData.length >= 20 ? 19 : totalData.length
            setData(totalData.slice(0, final));
            setCurrentPage(1);
            let btn = document.querySelector('button.page-link')
            if (btn) {
                btn.click();
            }
        }
    }, [data.currentPage, schema, totalData]);

    return (
        <div>
            <div id='board' className='board'>

                {data.length > 0 ?
                    (<React.Fragment>
                        <div className='data'>
                            <table>
                                <thead>
                                    <tr>
                                        {fields.map((val, i) => {
                                            return (
                                                <th key={val + '--' + i}>{schemas[schema]["labels"][val]}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((obj,index) => {
                                        return (
                                            <tr key={'obj--' + index}>
                                                {fields.map((camp, ndx2) => {
                                                    switch (camp) {
                                                            case "photo":
                                                                return (<td key={'camp--' + ndx2 + camp}>
                                                                    <div className="user-perfile">
                                                                        <img className="user-perfile__img" src={urlBase+obj[camp]} alt={obj["first_name"]+obj["last_name"]} />
                                                                    </div>
                                                                    </td>)
                                                            case "is_active":
                                                            case "status":
                                                                if (obj[camp]){
                                                                return (<td key={'camp--' + ndx2 + camp}>
                                                                    <div className="div--active">
                                                                        <span>Activo</span>
                                                                    </div>
                                                                    </td>)}
                                                                else {
                                                                    return (<td key={'camp--' + ndx2 + camp}>
                                                                        <div className="div--inactive">
                                                                            <span>Inactivo</span>
                                                                        </div>
                                                                        </td>)}
                                                            default:
                                                                return <td key={'camp--' + ndx2 + camp}>{obj[camp]}</td>;
                                                        }
                                                })}
                                                <td><button className="btn--circle" id={obj["code"]+"-"+schema}>
                                                    <IconEdit/>
                                                </button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className=''>
                            <div id='totalRecords' className='none' name={totalRecords} >{totalRecords}</div>

                            {totalRecords > 20 ?
                                <Pagination totalRecords={totalRecords} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={onPageChanged} />
                                : <p></p>
                            }
                        </div>
                    </React.Fragment>)
                    : <p className='error'>NOT FOUND - 404</p>}

            </div>
        </div>

    );


}

export default Board;