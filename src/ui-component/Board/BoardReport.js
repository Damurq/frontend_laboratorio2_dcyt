/* eslint-disable */
import React from 'react';
import { useEffect, useState } from 'react';

// project imports
import { getAll, request } from '../../utils/searchData.js';
import report from '../../data/reports.json';

// style
import './Board.css';

const BoardReport = ({ numReport }) => {
    // Variables
    const reportObj = report[numReport];                        // Objeto que contiene información del reporte
    const fields = reportObj["fields"]                          // Nombre en español que se le asignará em el head de la tabla
    // Estados
    const [data, setData] = useState([])                        // Datos actuales en pantalla

    useEffect(() => {
        const ac = new AbortController();
        let urlBase = `${process.env.REACT_APP_API_URL}/api/`
        const fetchData = async () => {
            const dat = await getAll(urlBase, reportObj["base"]["pathBase"], reportObj["base"]["labels"]);
            let temporalList = []
            console.log(dat,temporalList)
            dat.forEach((obj,i)=>{
                const fetchData2 = async () => {
                    let pensum = await request(urlBase+reportObj["pathReport"]+"/"+obj["code"])
                    if (dat.length-1>i){temporalList.push(pensum);}
                    setData(temporalList.concat([pensum]))
                }
                fetchData2();
            })
        };
        fetchData();
        return () => ac.abort();
    }, [numReport]);
    
    return (
        <div>
            <div id='board' className='board'>
                <div className="header-content-section">
                    <h2 className="title-section">Reporte</h2>
                </div>
                {data.length > 0 ?
                    (<React.Fragment>
                        <div className='data'>
                            <table>
                                <thead>
                                    <tr>
                                        {Object.keys(fields).map((val, i) => {
                                            return (
                                                <th key={val + '--' + i}>{fields[val]}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((obj, index) => {
                                        return (
                                            <tr key={'obj--' + index}>
                                                {Object.keys(fields).map((camp, ndx2) => {
                                                    return <td key={'camp--' + ndx2 + camp}>{obj[camp]}</td>;
                                                    }
                                                )}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        
                    </React.Fragment>)
                    : <p className='error'>NOT FOUND - 404</p>}
            </div>
        </div>
    );
}

export default BoardReport;