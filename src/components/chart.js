
import { AreaChart, Area, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const Chart = ({data})=> {
    return (
        <div className='chart card p-3 my-3'>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={730} height={250} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="principle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="interest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="balance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis  allowDataOverFlow={true} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
            <Legend />
            <Area type="monotone" dataKey="principle" stroke="#8884d8" fillOpacity={1} fill="url(#principle)" />
            <Area type="monotone" dataKey="interest" stroke="#82ca9d" fillOpacity={1} fill="url(#interest)" />
            <Area type="monotone" dataKey="balance" stroke="#ffc658" fillOpacity={1} fill="url(#balance)" />
        </AreaChart>
        </ResponsiveContainer>
        </div>
    )
}

export default Chart;