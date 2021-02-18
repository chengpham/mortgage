import { useState, useEffect } from 'react';
import AreaRechartComponent from './components/area.rechart';
import LineRechartComponent from './components/line.rechart';

const App = () => {
  const [date, setDate] = useState(new Date())
  const [date2, setDate2] = useState(new Date())
  const [a, setA] = useState(true);

  useEffect(() => {
    const b = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => {
      clearInterval(b);
    }
  }, [])

  useEffect(() => {
    setDate2(new Date())
  }, [a])

  return(
    <div>
      <h2>Line Rechart</h2>
      <LineRechartComponent />

      <h2>Area Rechart</h2>
      <AreaRechartComponent />

    </div>
  )
}

export default App;