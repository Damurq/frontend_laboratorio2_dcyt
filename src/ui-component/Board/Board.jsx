/* eslint-disable */
import './Board.css'
import { filterDataTable, request } from '../../utils/fetch/searchData.js'
import { requestDB } from '../../utils/requestDB'
import { useEffect, useState } from 'react'
import schemas from '../../data/filterData.json'
import Pagination from '../Pagination/Pagination'
import DraggableDialog from '../DraggableDialog/DraggableDialog'
import React from 'react'
import { IconEdit, IconTrash, IconRefresh } from '@tabler/icons';
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
    const [totalRecords, setTotalRecords] = useState(11)    //Total de registros actuales           -esp
    const [pageLimit, setPageLimit] = useState(10)
    //otras
    const [change, setChange] = useState(false)

    const onPageChanged = data => {
        if (totalData.length === 0) {
            //console.log(data)
            setCurrentPage(data.currentPage);
            let url = ((data.currentPage === 1) || (data.currentPage === undefined)) ? `${process.env.REACT_APP_API_URL}/api/${schema}/list` : `${process.env.REACT_APP_API_URL}/api/${schema}/list/?page=` + data.currentPage
            request(url)
                .then((response) => {
                    //console.log(response,2)
                    setTotalRecords(response['count']);
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

    const onDelete = (event,code) => {
        console.log(code);
        let url = `${process.env.REACT_APP_API_URL}/api/${schema}/detail/${code}`
        requestDB("DELETE",url)
            .then((response) => {
                if(response.status === 200){
                    setChange(change?false:true)
                }
                else{
                }
            })
    }

    useEffect(() => {
        if (totalData.length===0) {
            const ac = new AbortController();
            if (Object.keys(schemas).includes(schema)) {
                let url = ((currentPage === 1) || !(currentPage === undefined)) ? `${process.env.REACT_APP_API_URL}/api/${schema}/list` : `${process.env.REACT_APP_API_URL}/api/${schema}/list/?page=` + data.currentPage
                request(url)
                    .then((response) => {
                        //console.log(response)
                        setTotalRecords(response['count']);
                        if (response.results.length > 0) {
                            setPageLimit(response.results.length);
                            let fdt = filterDataTable(schemas[schema]["data"], response.results);
                            setData(fdt);
                        }
                    })
            }
            return () => ac.abort();
        } 
        else {
            setTotalRecords(totalData.length);
            let final = totalData.length >= 10 ? 9 : totalData.length
            setData(totalData.slice(0,final));
            setCurrentPage(1);
            let btn = document.querySelector('button.page-link')
            if (btn) {
                btn.click();
            }
        }
    }, [schema, totalData,change]);

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
                                        let status
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
                                                                status = !status ? "is_active" : status
                                                            case "status":
                                                                status = !status ? "status" : status
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
                                                <td><button className="btn--circle" id={obj["code"]+"-update"}>
                                                    <IconEdit/>
                                                </button></td>
                                                <td><button onClick={(e)=>onDelete(e,obj["code"])} className="btn--circle" id={obj["code"]+"-changeStatus"}>
                                                    { obj[status] ? <IconTrash/> : <IconRefresh/>}
                                                </button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>
                        <div className=''>
                            <div id='totalRecords' className='none' name={totalRecords} >{totalRecords}</div>

                            {totalRecords > 10 ?
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