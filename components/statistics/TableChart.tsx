import React, { useEffect, useRef, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import { StatisticsCourse } from '../../utils/service/statistics/types';
import { zip } from 'lodash';
import { HeatOptions, weekDays } from './types';

const TableChart = ({ course }: { course: StatisticsCourse }) => {
  function getPointCategoryName(point, dimension) {
    const series = point.series;
    const isY = dimension === 'y';
    const axis = series[isY ? 'yAxis' : 'xAxis'];

    return axis?.categories[point[isY ? 'y' : 'x']];
  }

  const [options, setOptions] = useState<HeatOptions>({
    chart: {
      type: 'heatmap',
      plotBorderWidth: 1,
    },
    title: {
      text: 'Course Schedule',
    },
    xAxis: {
      categories: weekDays.concat('<b>TOTAL</b>'),
    },

    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: '#1890ff',
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280,
    },
    tooltip: {
      formatter: function () {
        return `<b> ${getPointCategoryName(this.point, 'y')}</b>
         <br/>
         <b>${this.point.value}</b> lessons on <b>${getPointCategoryName(this.point, 'x')}</b>`;
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            yAxis: {
              labels: {
                formatter: function () {
                  return this.value.charAt(0);
                },
              },
            },
          },
        },
      ],
    },
    credits: {
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
  });

  useEffect(() => {
    if (!course) {
      return;
    }

    const yAxis = course?.classTime.map((item) => item.name).concat('<b>Total</b>');

    const rowData = course.classTime.map((item) => {
      const ary = new Array(7).fill(0);
      const courses = item.courses
        .map((course) => course.classTime)
        .flat()
        .map((item) => item?.split(' ')[0]);

      courses.forEach((weekday) => {
        const index = weekDays.findIndex((item) => item === weekday);

        ary[index] += 1;
      });

      return ary.concat(ary.reduce((acc, cur) => acc + cur));
    });

    const sourceData = zip(...rowData)
      .map((columnAry, index) => {
        const len = columnAry.length;
        const result = [];
        let i = 0;

        for (i = 0; i < len; i++) {
          result.push([index, i, columnAry[i]]);
        }

        result.push([index, i, result.reduce((acc, cur) => acc + cur[2], 0)]);

        return result;
      })
      .flat();

    setOptions({
      yAxis: {
        categories: yAxis,
        title: null,
        reversed: true,
      },
      series: [
        {
          name: 'Lessons per weekday',
          borderWidth: 1,
          data: sourceData, // data format:  [column, row, amount] column, row 代表数据在表中的位置，amount：具体数据
          dataLabels: {
            enabled: true,
            color: '#000000',
          },
        },
      ],
    });
  }, [course]);

  return <HighchartsReact highcharts={Highcharts} options={options} ref={charRef} />;
};

export default TableChart;
