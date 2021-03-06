import React, { useEffect, useRef, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import { getWorldMap } from '../../utils/service/statistics/statisticsService';
import { WorldMap, Statistic } from '../../utils/service/statistics/types';
import { MapOptions } from './types';

// console.log(Highcharts.getOptions());
const Distribution = ({ data, title }: { data: Statistic[]; title: string }) => {
  const [options, setOptions] = useState<MapOptions>({});
  const [worldMapData, setWorldMapData] = useState<WorldMap | null>(null);

  const fetchWorldMap = async () => {
    const res = await getWorldMap();

    setWorldMapData(res.data);
    setOptions({ series: [{ mapData: res.data }] });
  };

  useEffect(() => {
    fetchWorldMap();
  }, []);

  const charRef = useRef(null);

  useEffect(() => {
    const { chart } = charRef.current;
    const timer = setTimeout(() => {
      chart.reflow();
    }, 30);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    const filteredData = data?.map((item: Statistic) => {
      const temp = worldMapData?.features.find((feature) => {
        return item.name.toLowerCase() === feature.properties.name.toLowerCase();
      });

      return {
        'hc-key': temp?.properties['hc-key'],
        value: item.amount,
      };
    });

    const newOptions = {
      colorAxis: {
        min: 0,
        stops: [
          [0, '#EFEFFF'],
          [0.5, '#7cb5ec'],
          [1, '#7cb5ec'],
          // [0.5, Highcharts?.getOptions().colors[0]],
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
        text: `${title}`,
      },
      series: [
        {
          data: filteredData,
          mapData: worldMapData,
          name: 'Total',
          states: {
            hover: {
              color: '#a4edba',
            },
          },
        },
      ],
    };
    setOptions(newOptions);
  }, [data, title, worldMapData]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'mapChart'}
      options={options}
      ref={charRef}
    />
  );
};

export default Distribution;
