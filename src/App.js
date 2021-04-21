import { useEffect, useState } from 'react';
import TournamentComponent from './components/Tournaments/TournamentComponent'
import './App.css';
import useFetch from './hooks/useFetch'
import {getData} from './helpers'

function App() {

  //need to get object of competitions which can become a select
  const compArr = useFetch(`https://raw.githubusercontent.com/statsbomb/open-data/master/data/competitions.json`)

  const [matches, setMatches] = useState([])
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if(compArr.length > 0){
    const initValue = `${compArr[0].competition_id}_${compArr[0].season_id}`
    setSelectedOption(initValue)
    }
  },[compArr])
  
  useEffect(() => {
    if(selectedOption){
      const fetchData = async () => {
        const splitValue = selectedOption.split('_')
        const comp_id = splitValue[0]
        const season_id = splitValue[1]
        const matchData = await getData(`https://raw.githubusercontent.com/statsbomb/open-data/master/data/matches/${comp_id}/${season_id}.json`)
        setMatches(matchData)
      }
      fetchData()
    }
  },[selectedOption])

  const onChangeHandler = (e) => {
    setSelectedOption(e.target.value)
}

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Heatmaps
        </p>
        <label id="comp">Select competitions:</label>
        <select name="comp" onChange={onChangeHandler} value={selectedOption}>
          {compArr.map((comp) => {
            return <option key={`${comp.competition_id}_${comp.season_id}`} value={`${comp.competition_id}_${comp.season_id}`}>{comp.competition_name} - {comp.season_name}</option>
          })}
        </select>
      </header>
      <main>
        {matches.length > 0 && <TournamentComponent matches={matches} />}
      </main>
    </div>
  );
}

export default App;
