import { useState } from "react";


const LineUp = ({data, onChange}) => {

  const [selectedOption, setSelectedOption] = useState('select');

  const onChangeHandler = (e) => {
    onChange(e.target.value)
    setSelectedOption(e.target.value)
  }

  return (
    <div>
      <h1>{data.team_name}</h1>
      <div>
        <select onChange={onChangeHandler} value={selectedOption}>
          <option value={'select'}>Select Player</option>
        {data.lineup.map((player) => {
          return <option key={player.player_id} value={`${player.player_id}_${player.player_name}`}>{player.player_name}</option>
        })}
        </select>

      </div>
    </div>
  )
}

export default LineUp