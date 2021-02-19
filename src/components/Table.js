const Table = ({ M, T, I }) => {
    
    return(
        <table className="table table-striped table-sm">
            <thead>
                <tr>
                    <th>Visability</th>
                    <th>Monthly Payments</th>
                    <th>Terms</th>
                    <th>Interest</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Visability</td>
                    <td>{M.toFixed(2)}</td>
                    <td>{T}</td>
                    <td>{I}</td>
                </tr>          
            </tbody>
        </table>
     )
   }
   
   export default Table;