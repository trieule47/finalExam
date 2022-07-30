// import React, { useEffect, useState } from 'react';
// import Hightchart from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import hightchartsMap from 'highcharts/modules/map';

// hightchartsMap(Hightchart);

// const initOptions = {
//     chart: {
//         height: '500',
//     },
//     title: {
//         text: null,
//     },
//     mapNavigation: {
//         enabled: true,
//     },
//     colorAxis: {
//         min: 0,
//         stops: [
//             [0.2, '#FFC4AA'],
//             [0.4, '#FF8A66'],
//             [0.6, '#FF392B'],
//             [0.8, '#B71525'],
//             [1, '#7A0826'],
//         ],
//     },
//     legend: {
//         layout: 'vertical',
//         align: 'right',
//         verticalAlign: 'bottom',
//     },
//     series: [
//         {
//             name: 'Dân số',
//             mapData: {},
//             joinBy: ['hc-key', 'key'],
//         }
//     ]
// }

// export default function HightMaps({ mapData}) {
//     const [options, setOptions] = useState({})
//     useEffect(() => {
//         setOptions({
//             ...initOptions,
//             series: [
//                 {
//                     ...initOptions.series[0],
//                     mapData: mapData,
//                     data: []
//                 }
//             ]
//         })
//     })
//     return (
//         <>
//             <HighchartsReact
//                 highcharts={Hightchart}
//                 option={{  }}
//                 constructorType='mapChart'
//             />
//         </>
//     )
// }

import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
// import { cloneDeep } from 'lodash';

// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
  chart: {
    height: '500',
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.1, '#fae7ec'],
      [0.2, '#fccec0'],
      [0.4, '#FF8A66'],
      [0.6, '#FF392B'],
      [0.8, '#B71525'],
      [1, '	#7A0826'],
    ],
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
  },
  series: [
    {
      name: 'Covid 19',
      joinBy: ['hc-key', 'key'],
    },
  ],
};

const HighMaps = ({ mapData, countries }) => {
  const [options, setOptions] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      console.log({ mapData });
      const fakeData = mapData.features.map((feature, index) =>{
        let country = countries.find((e)=>(e.countryInfo.iso2 == feature.properties['iso-a2']))
        return({
            key: feature.properties['hc-key'],
            value: country?.cases,
        })
      });

      setOptions(() => ({
        ...initOptions,
        title: {
          text: 'Covid 19 Confimed',
        },
        series: [
          { ...initOptions.series[0], mapData: mapData, data: fakeData },
        ],
      }));

      if (!mapLoaded) setMapLoaded(true);
    }
  }, [mapData, mapLoaded]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, [options, mapData]);

  if (!mapLoaded) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
    //   options={cloneDeep(options)}
        options={options}
      constructorType={'mapChart'}
      ref={chartRef}
    />
  );
};

HighMaps.defaultProps = {
  mapData: {},
};

export default HighMaps;