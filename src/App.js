import axios from 'axios';
import { useEffect,useState } from 'react';
import './App.scss';

function App() {
  const [ArrayData, setArrayData] = useState([])
  const [cities, setCities] = useState(ArrayData);
  const [total, setTotal] = useState(10);
  const [step, setStep] = useState(20);
  useEffect(() => {
    handleGetData();
  }, [])
  const handleGetData = async() => {
    try {
      const {data} = await axios.get(`https://api.datos.gob.mx/v1/condiciones-atmosfericas`)
      const {results} = data
      const filter =  results.filter((city,index) => (index < 10 && city))
      setArrayData(results)
      setCities(filter)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDate = (date) => {
    const format =  Date(date);
    return format
  }
  const handleNext = (n = 10) => {
    const filter =  ArrayData.filter((city,index) => (index < n && city))
    setCities(filter);
    setTotal(filter.length)
    setStep(step+10);
  }
  return (
     <main className='wrapper'>
      <table className='table'>
      <thead>
        <tr className='header'>
          <th>id</th>
          <th>cityId</th>
          <th>name</th>
          <th>state</th>
          <th>propabilid of presit</th>
          <th>elativehumidity</th>
          <th>Lastreporttime</th>
          <th>LLueve</th>
        </tr>
      </thead>
      <tbody className='data'>
        {
          cities.length === 0 ? <tr className='no-data'>No hay datos por mostrar</tr> 
          : 
          cities.map((city,index) => {
            return <tr className='wrapperData' key={`${city._id}-${index}`}>
              <td>{city._id}</td>
              <td>{city.cityid}</td>
              <td>{city.name}</td>
              <td>{city.state}</td>
              <td>{city.probabilityofprecip}</td>
              <td>{city.relativehumidity}</td>
              <td>{handleDate(city.lastreporttime)}</td>
              <td>{city.probabilityofprecip > 60 || city.relativehumidity > 50 ?  "LLueve" : "No llueve" }</td>
              </tr>
          })
        }
      </tbody>
      </table>
      <div className='wrapperButton' onClick={()=>handleNext(step)}>
        <button className='button' disabled={total >= 100}>Siguiente</button>
      </div>
      <div className='wrapperTotal'>
      <p className='total'>Total de registros:<span className='data'>{total}</span></p>
      </div>
     </main>
  );
}

export default App;
