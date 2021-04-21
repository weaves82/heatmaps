import axios from 'axios';

export const getData = async (url) => {
  const matchData = await axios.get(url)
  return matchData.data
  }

export const getHeatmapSectors = (locations, noOfColumns, noOfRows) => {
  const sectorWidth = 120 / noOfColumns;
  const sectorHeight = 80 / noOfRows;

  let sectors = []
  let sector = 0;
  let xCount = 0;
  while (xCount < 120) {
      let yCount = 0;
      while(yCount < 80) {
          sectors[sector] = {
              count: 0,
              x1: xCount,
              x2: xCount + sectorWidth,
              y1: yCount,
              y2: yCount + sectorHeight
          };
          for(let loc of locations) {
              if((loc.x > xCount && loc.x < (xCount + sectorWidth)) &&
                  (loc.y > yCount && loc.y <= (yCount + sectorHeight))) {
                  sectors[sector].count++;
              }
          };
          yCount += sectorHeight;
          sector++;
      }
      xCount += sectorWidth;
      sector++;
  }
  return sectors;
}