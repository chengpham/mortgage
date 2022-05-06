import { AreaChart, Area, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatter } from '../lib/helpers';

const Chart = ({ data }) => {
  return (
    <div className='chart card p-2 my-3'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          width={730}
          height={400}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='principle' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='interest' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='balance' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#ffc658' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#ffc658' stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis
            width={50}
            yAxisId='left'
            tick={{ fontSize: 10 }}
            type='number'
            tickFormatter={(n) => Math.ceil(n)}
          />
          <YAxis
            width={50}
            yAxisId='right'
            orientation='right'
            tick={{ fontSize: 10 }}
            type='number'
            domain={[0, 'dataMax + 1000']}
            tickFormatter={(n) => Math.ceil(n)}
          />
          <Tooltip formatter={(v) => formatter.format(v)} />
          <Legend />
          <Area
            yAxisId='right'
            type='monotone'
            dataKey='principle'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#principle)'
          />
          <Area
            yAxisId='right'
            type='monotone'
            dataKey='interest'
            stroke='#82ca9d'
            fillOpacity={1}
            fill='url(#interest)'
          />
          <Area
            yAxisId='left'
            type='monotone'
            dataKey='balance'
            stroke='#ffc658'
            fillOpacity={1}
            fill='url(#balance)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
