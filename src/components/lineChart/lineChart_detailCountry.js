import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import axios from 'axios';

const LineCharts = ({iso2}) => {
  const [covidInfo, setCovidInfo] = useState([]);
  const [covid19, setCovid19] = useState([]);
  const [reportType, setReportType] = useState('all')
  useEffect(() => {
    handleCallAllCovidInfo();
  }, [])

  const handleCallAllCovidInfo = async () => {
    const responce = await axios.get(`https://disease.sh/v3/covid-19/historical/${iso2}?lastdays=all`)
    setCovidInfo(responce.data.timeline)
    let l = Object.keys(responce.data.timeline.cases).length
    const day = Object.keys(responce.data.timeline.cases);
    const cases = Object.values(responce.data.timeline.cases);
    const deaths = Object.values(responce.data.timeline.deaths);
    const recovered = Object.values(responce.data.timeline.recovered);
    const covid = [];
    for (let i = 0; i < l; i++) {
      covid.push({ name: day[i], cases: cases[i], deaths: deaths[i], recovered: recovered[i] })
    }
    const cv = covid.map(i=> {return i});
    cv.sort(function(a, b){return b.cases - a.cases});
    setCovid19(covid);
  }

  useEffect(()=>{
    let customData = covid19;
    switch (reportType) {
      case 'all':
        customData = covid19
        break;
      case '30':
        customData = covid19.slice(Math.max(customData.length - 30, 1));
        break;
      case '7':
        customData = covid19.slice(Math.max(customData.length - 7, 1));
        break;
      default:
        customData = covid19;
        break;
    }
    setCovidInfo(customData)
  },[reportType, covid19])

  return (
    <>
    <button style={{ width: '100px', background:'grey',color:'black' }} onClick={()=>{setReportType('all')}}>Tất cả</button>
    <button style={{ width: '100px', background:'grey',color:'black' }} onClick={()=>{setReportType('30')}}>30 ngày</button>
    <button style={{ width: '100px', background:'grey',color:'black' }} onClick={()=>{setReportType('7')}}>7 ngày</button>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={covidInfo}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
        <Line type="monotone" dataKey="recovered" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
    </>
  );
}

export default React.memo(LineCharts)
