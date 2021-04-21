import { getHeatmapSectors } from "../../../../helpers"
import {
  ReferenceDot,
  ReferenceLine,
  ReferenceArea,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const HeatMap = ({playerData}) => {


  const heatSectors = getHeatmapSectors(playerData.locations, 4, 4)
  const scale = 5

  return(
    <div>
    <p>{playerData.name}</p>
    <div className="pitch">
            <ScatterChart
                width={120*scale}
                height={80*scale}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                {/* 
                    The following Reference components are used to draw the football pitch
                */}
                <ReferenceDot x={12} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Left Penalty Arc */}
                <ReferenceDot x={60} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Center Circle */}
                <ReferenceDot x={108} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Right Penalty Arc */}
                <ReferenceArea x1={0} x2={18} y1={18} y2={80-18} fill="white" fillOpacity={1} stroke="black" /> {/* Left Penalty Area */}
                <ReferenceArea x1={102} x2={120} y1={18} y2={80-18} fill="white" fillOpacity={1} stroke="black" /> {/* Right Penalty Area */}
                <ReferenceArea x1={0} x2={6} y1={30} y2={80-30} fill="white" fillOpacity={1} stroke="black" /> {/* Left 6-yard Box */}
                <ReferenceArea x1={114} x2={120} y1={30} y2={80-30} fill="white" fillOpacity={1} stroke="black" /> {/* Right 6-yard box */}
                <ReferenceDot x={60} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Centre Spot */}
                <ReferenceDot x={12} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Left Penalty Spot */}
                <ReferenceDot x={108} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Right Penalty Spot */}
                {
                    /* 
                        Map the various heat sectors as ReferenceAreas onto the pitch,
                        using `sector.count` to determine opacity
                    */
                    heatSectors.map((sector, index) => (
                        <ReferenceArea 
                            key={index}
                            x1={sector.x1}
                            x2={sector.x2}
                            y1={sector.y1}
                            y2={sector.y2} 
                            fill="green"
                            fillOpacity={(sector.count / 100) * 1.3}
                            stroke="white"
                            strokeOpacity={0}
                        />
                    ))
                }
                <CartesianGrid />
                <ReferenceLine x={60} stroke="black"/> {/* Center Half */}
                <ReferenceArea x1={0} x2={0.1} y1={36} y2={80-36} fill="black" fillOpacity={1} stroke="black"/> {/* Left Goal line */}
                <ReferenceArea x1={119.9} x2={120} y1={36} y2={80-36} fill="black" fillOpacity={1} stroke="black"/> {/* Right Goal line */}
                <ReferenceArea x1={0} x2={120} y1={0} y2={80} fillOpacity={0} stroke="black" /> {/* Pitch Outline */}
                <XAxis type="number" dataKey="x" hide domain={[0,120]}/>
                <YAxis type="number" dataKey="y" hide domain={[0,80]}/>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Heatmap" data={playerData.locations} fill="#777777"/>
            </ScatterChart>
        </div>
        </div>
  )
}

export default HeatMap