import { useEffect, useReducer, useState } from 'react';
import {getData} from '../../helpers'
import PlayersComponent from './PlayersComponent/PlayersComponent';

const matchReducer = (state,actions) => {
  switch(actions.type){
    case 'UPDATE_MATCH':
      return {
        ...state,
        homeData: actions.payload.homeData,
        awayData: actions.payload.awayData,
        eventsData: actions.payload.eventsData,
      }
    default:
      return state
  }
}

const TournamentComponent = ({matches}) => {

  const [selectedOption, setSelectedOption] = useState('');

  const [match, dispatch] = useReducer(matchReducer,{})

  //matches in drop down
  //then we need to put in match id in options and on change can show a list of players for each team

  useEffect(() => {
    if(selectedOption){
      const fetchData = async () => {
        const [match_id, home_id,away_id] = selectedOption.split('_')

        const lineUpsData = await getData(`https://raw.githubusercontent.com/statsbomb/open-data/master/data/lineups/${match_id}.json`)
        const eventsData = await getData(`https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/${match_id}.json`)

        const homeData = lineUpsData.filter(item => item.team_id === +home_id)
        const awayData = lineUpsData.filter(item => item.team_id === +away_id)
        dispatch({
          type:'UPDATE_MATCH',
          payload:{
            homeData: homeData[0],
            awayData: awayData[0],
            eventsData
          }
        })
      }
      fetchData()
    }
  },[selectedOption])

  useEffect(() => {
  if(matches.length > 0){
    const initValue = `${matches[0].match_id}_${matches[0].home_team.home_team_id}_${matches[0].away_team.away_team_id}`
    setSelectedOption(initValue)
    }

  },[matches])

  const onChangeHandler = (e) => {
    setSelectedOption(e.target.value)
  }

  return(
    <>
      <label id="match">Matches:</label>
        <select name="match" onChange={onChangeHandler} value={selectedOption}>
          {matches.map((match) => {
            return <option key={match.match_id} value={`${match.match_id}_${match.home_team.home_team_id}_${match.away_team.away_team_id}`}>{match.home_team.home_team_name} v {match.away_team.away_team_name}</option>
          })}
        </select>
        <div>
          {match.homeData && <PlayersComponent data={match}/>}
        </div>
    </>
  )
}

export default TournamentComponent