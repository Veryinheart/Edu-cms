import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Statistic } from '../../utils/service/statistics/types';
import { PieOptions } from './types';

const Pie = ({ data, title }: { data: Statistic[]; title: string }) => {
  const [options, setOptions] = useState<PieOptions>({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> <br> total: {point.y}',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });

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
    const pieData = data?.map((item) => ({ name: item.name, y: item.amount }));
    const titleText = title?.split(/(?=[A-Z])/).join(' ') || '';

    setOptions({
      title: {
        text: `<span style="text-transform: capitalize">${titleText}</span>`,
      },
      subtitle: {
        text: `${titleText.split(' ')[0]} total: ${pieData.reduce((pre, cur) => pre + cur.y, 0)}`,
        align: 'right',
      },
      series: [
        {
          name: 'percentage',
          colorByPoint: true,
          data: pieData,
        },
      ],
    });
  }, [data, title]);

  return <HighchartsReact highcharts={Highcharts} options={options} ref={charRef} />;
};

export default Pie;
