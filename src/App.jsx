import { useState } from 'react'
import './App.css'
import {showAlert} from './utils/sweetAlert/sweetAlert'

function App() {
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const [listReults, setListResults] = useState([]);

  const handleTotalPoints = (e)=>{
    setTotalPoints(e.target.value)
    setListResults([]);
  }

  const handleTotalPercent = (e)=>{
    setTotalPercent(e.target.value)
    setListResults([]);
  }

  const calculate = ()=>{
    if(isNaN(totalPoints)){
      showAlert({text:'Total points is a required number'});
      return;
    }else if (!Number.isInteger(Number(totalPoints))){
      showAlert({text:'Total points needs to be an integer'});
      return;
    }else if (isNaN(totalPercent)){
      showAlert({text:'Total percent is a required number'});
      return;
    }else if (!Number.isInteger(Number(totalPercent))){
      showAlert({text:'Total percent needs to be an integer'});
      return;
    }

    const results = [];

    for(let counter = 1; counter <= totalPoints; counter++){
      let calification = ((counter * 100)/totalPoints).toFixed(2);  
      let percent = ((counter * totalPercent)/totalPoints).toFixed(2);

      results.push({
        points:counter,
        calification,
        percent,
        calificationRounded: Math.round(calification),
        percentRounded:Math.round(percent),
      })
    }

    results.sort((a,b) => compareOrder(a.points, b.points));
    setListResults(results);

  }

  const compareOrder = (a,b)=>{
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    }
    return 0;
  }

  return (
    <>
      <div className='container'>
        <h1>Calification Calculator</h1>
        <div className='row mt-2'>
          <div className='col-lg-2 col-sm-6 col-xs-6'>
            <label htmlFor="">Total Points</label>
            <input type="text" className='form-control' value={totalPoints} onChange={handleTotalPoints} />
          </div>

          <div className='col-lg-2 col-sm-6 col-xs-6'>
            <label htmlFor="">Total Percent</label>
            <input type="text" className='form-control' value={totalPercent} onChange={handleTotalPercent}/>
          </div>
          <div className='col-lg-2'>
            <button className='btn btn-success btn-ajust' onClick={calculate}>Calculate</button>
          </div>
        </div>
        <hr />
        <h2>Califications</h2>
        <div className='row mt-2'>
          <div className='col-12'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th className='header'>Points <span className='remark-header'>({totalPoints})</span></th>
                  <th className='header'>Calification</th>
                  <th className='header'>Calification rounded</th>
                  <th className='header'>Percent <span className='remark-header'>({totalPercent})</span></th>
                  <th className='header'>Percent rounded</th>
                </tr>
              </thead>
              <tbody className='phone-ajust'>
                {
                  listReults.length ==0 &&
                  <tr>
                    <td colSpan={5}>No califications calculated</td>
                  </tr>
                }

               {
                  listReults.length > 0 &&
                  listReults.map((calification)=>(
                    <tr key={calification.points}>
                      <td>{calification.points}</td>
                      <td>{calification.calification}</td>
                      <td className='remark'>{calification.calificationRounded}</td>
                      <td>{calification.percent}</td>
                      <td className='remark'>{calification.percentRounded}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div> 
    </>
  )
}

export default App
