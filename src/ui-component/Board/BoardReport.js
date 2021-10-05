/* eslint-disable */
import './Board.css'
import { getAll, request } from '../../utils/fetch/searchData.js'
import { useEffect, useState } from 'react'
import report from '../../data/reports.json'
import React from 'react'


/**
 *  Pantalla que permite imprimir datos de la api  de Rick y morty -esp
 * @param {schema} permite determinar los datos que se van a imprimir-esp
 * @returns JSX
 */
const BoardReport = ({ numReport }) => {
    //
    const reportObj = report[numReport];
    const [data, setData] = useState([])                        //Datos actuales en pantalla
    const fields = reportObj["fields"]
    useEffect(() => {
        const ac = new AbortController();
        // let url = ((data.currentPage === 1) || (data.currentPage === undefined)) ? `${process.env.REACT_APP_API_URL}/api/${schema}/list` : `${process.env.REACT_APP_API_URL}/api/${schema}/list/?page=` + data.currentPage
        let urlBase = `${process.env.REACT_APP_API_URL}/api/`
        const fetchData = async () => {
            const data = await getAll(urlBase, reportObj["base"]["pathBase"], reportObj["base"]["labels"]);
            let temporalList = []
            data.forEach((obj)=>{
                const fetchData2 = async () => {
                    let pensum = await request(urlBase+reportObj["pathReport"]+"/"+obj["code"])
                    temporalList.push(pensum)
                    setData(temporalList.concat([pensum]));
                }
                fetchData2();
            })
        };
        fetchData();
        return () => ac.abort();
    }, []);
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
                                        console.log(obj)
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