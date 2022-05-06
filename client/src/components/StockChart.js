import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockChart = ({ stockData }) => {
    return (
    <div className='chart card p-2 my-3'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={400} data={stockData} margin={{ top: 0, right: 0, left: 0, bottom: 0, }} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="symbol" />
          <YAxis yAxisId='left' type="number" domain={[0, 100]} tickFormatter={n=>`${n}%`} />
          <YAxis yAxisId='right' type="number" orientation='right' tickFormatter={n => `$${n}`} domain={[0, dataMax => Math.ceil(dataMax * 1.2)]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="percentage" yAxisId='left' fill="#8884d8" />
          <Bar dataKey="price" yAxisId='right' fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    );
}

export default StockChart