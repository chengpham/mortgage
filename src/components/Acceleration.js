import { formatter } from "../lib/helpers";

const Acceleration = ({ payments, data }) => {
    
    return(
        <table className="table table-striped table-sm">
            <thead>
                <tr>
                    <th style={{ width: "15%" }}>Payment Date</th>
                    <th>Payment</th>
                    <th>Principle</th>
                    <th>Interest</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
            {data.map((data, i)=>{
                if (i%12===0){
                    return (
                        <tr key={i} style={{ backgroundColor: "#ffa" }} >
                            <td><strong>{data.name}</strong></td>
                            <td><strong>{formatter.format(payments)}</strong></td>
                            <td><strong>{formatter.format(data.principle)}</strong></td>
                            <td><strong>{formatter.format(data.interest)}</strong></td>
                            <td><strong>{formatter.format(data.balance)}</strong></td>
                        </tr>
                    )
                } else {
                    return (
                        <tr key={i}>
                            <td>{data.name}</td>
                            <td>{formatter.format(payments)}</td>
                            <td>{formatter.format(data.principle)}</td>
                            <td>{formatter.format(data.interest)}</td>
                            <td>{formatter.format(data.balance)}</td>
                        </tr>
                    )
                }
            })}
            </tbody>
        </table>
     )
   }
   
   export default Acceleration;
