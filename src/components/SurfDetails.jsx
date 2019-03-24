import React, { Component } from 'react';
import './assets/styles/styles.css';
import { getWindDirectionScore, getWaveSizeScore, getSwellPeriodScore } from './Calculation';

class SurfDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lastUpdate: {}
    }
  }

  componentDidMount() {
    fetch(`https://www.ndbc.noaa.gov/data/realtime2/46029.spec`)
      .then((response) => response.text())
      .then((data) => {
       function parseRow(string) {
         const parsedRowArray = string.split(/\s/).filter((e) => e !== '')
         return parsedRowArray
       }

       let separateRows = data.split(/\n/)
       let parsedRows = separateRows.map(row => parseRow(row))

       let dataRows = parsedRows.slice(2)
       function assignObjects(e) {
           let newData = {};
           newData['YY'] = e[0];
           newData['MM'] = e[1];
           newData['DD'] = e[2];
           newData['hh'] = e[3];
           newData['mm'] = e[4];
           newData['WVHT'] = e[5];
           newData['SwH'] = e[6];
           newData['SwP'] = e[7];
           newData['WWH'] = e[8];
           newData['WWP'] = e[9];
           newData['SwD'] = e[10];
           newData['WWD'] = e[11];
           newData['STEEPNESS'] = e[12];
           newData['APD'] = e[13];
           newData['MWD'] = e[14];
         return newData;
       }

      let dataRow = dataRows.map(row => assignObjects(row))
      this.setState({lastUpdate: dataRow[0]});
     });

  }

  render() {
    const last = this.state.lastUpdate;
    const lastUpdatedTime = `${last.MM}/${last.DD}/${last.YY} @ ${last.hh}:${last.mm}`
    console.log("last: ",last);

    const windDirection = last.SwD
    const windDirectionScore = getWindDirectionScore(last.WWD);

    const swellPeriod = last.SwP
    const swellPeriodScore = getSwellPeriodScore(last.SwP)

    const waveSize = last.SwP * last.SwH
    const waveSizeScore = getWaveSizeScore(last.SwP, last.SwH)

    const combinedSurfScore = ((windDirectionScore + swellPeriodScore + waveSizeScore) / 3).toFixed(2);

    return(
      <div>

        <div >
          <p>Today's Surf Score is <span><strong>{combinedSurfScore}</strong></span></p>
          <p>Last Updated on    <strong>{lastUpdatedTime}</strong><br/></p>
        </div>
        <div>
          <p>Wind Direction:    <strong>{windDirection}</strong></p>
          <p>Wind Direction Score:    <strong>{windDirectionScore}</strong></p>
        </div>
        <div>
          <p>Swell Period: <strong> {swellPeriod}seconds </strong></p>
          <p>Swell Period Score: <strong> {swellPeriodScore}seconds </strong></p>
        </div>
        <div>

        <p>Wave Size: <strong>{waveSize}metres</strong></p>
        <p>Wave Size Score: <strong>{waveSizeScore}</strong></p>
        </div>
      </div>
    )
  }
}
export default SurfDetails;