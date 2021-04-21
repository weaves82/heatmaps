import { useEffect, useState } from "react"
import HeatMap from "./HeatMap/HeatMap"
import LineUp from "./LineUps/LineUp"



const PlayersComponent = ({data}) => {

  const [heatMapData, setHeatMapData] = useState(null)
  
  const onChangeHandler = (value) => {
    //location array
    const [id,name]=value.split('_')
    const locations = data.eventsData.filter((play) => {
      return play.location && play.player?.id === +id
    }).map(item => {
      return {
        x: item.location[0],
        y: item.location[1]
      }
    })

    setHeatMapData({
      name,
      locations
    })
  }

  useEffect(() => {
    setHeatMapData(null)
  },[data])

  return(
    <div>
      <div>
        <LineUp data={data.homeData} onChange={onChangeHandler} />
        <LineUp data={data.awayData} onChange={onChangeHandler} />
      </div>
      {heatMapData ? <HeatMap playerData={heatMapData} /> : <p>Select Player</p>}
    </div>
  )
}

export default PlayersComponent