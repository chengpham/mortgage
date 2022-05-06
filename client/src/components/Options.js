import { Rates } from '../requests';
import { useState, useEffect } from 'react';
import { timeAgo } from '../lib/helpers';

const Options = () => {
    const [rate, setRate] = useState([])
    useEffect(()=> {
        Rates.index()
            .then((rates)=> setRate(rates))
    }, [])

    return(
        <table className="table table-striped table-sm">
            <thead>
                <tr>
                    <th>Provider</th>
                    <th>Five Year Variable</th>
                    <th>Five Year Fixed</th>
                    <th>Three Year Fixed</th>
                    <th>Updated</th>
                </tr>
            </thead>
            <tbody>
            {rate.map((data, i)=>{
                return (
                    <tr key={i*2}>
                        <td>{data.provider}</td>
                        <td>{data.fiveYearVariable+"%"}</td>
                        <td>{data.fiveYearFixed+"%"}</td>
                        <td>{data.threeYearFixed+"%"}</td>
                        <td>{timeAgo(data.updated)}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
     )
   }
   
   export default Options;