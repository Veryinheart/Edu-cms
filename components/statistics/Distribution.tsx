import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import { getWorldMap } from '../../utils/service/statistics/statisticsService';
import { WorldMap } from '../../utils/service/statistics/types';

console.log(Highcharts.getOptions());
const Distribution = () => {
  const [options, setOptions] = useState({
    colorAxis: {
      min: 0,
      stops: [
        [0, '#EFEFFF'],
        [0.5, '#7cb5ec'],
        [1, '#7cb5ec'],
        // [0.5, Highcharts.getOptions().colors[0]],
        // [1, Highcharts.color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()],
      ],
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'bottom',
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: 'Student',
    },
  });

  const [worldMap, setWorldMap] = useState<WorldMap | null>(null);

  return <HighchartsReact highcharts={Highcharts} constructorType={'mapChart'} options={options} />;
};

export default Distribution;
