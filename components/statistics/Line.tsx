import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import {
  StatisticsCourse,
  StatisticsStudent,
  StatisticsTeacher,
} from '../../utils/service/statistics/types';
import { LineOptions } from './types';

const Line = ({
  course,
  student,
  teacher,
}: {
  course: StatisticsCourse;
  student: StatisticsStudent;
  teacher: StatisticsTeacher;
}) => {
  const [options, setOptions] = useState<LineOptions>({
    title: {
      text: 'Increment',
    },
    yAxis: {
      title: {
        text: 'Increment',
      },
    },
    xAxis: {
      accessibility: {
        rangeDescription: 'Range: Jan to Dec',
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  });

  const convertToChartData = (dataSource) => {
    const Res = dataSource?.createdAt.filter((item) => item.name.includes('2022'));
    const newArr = new Array(12).fill(0);
    Res?.map((item) => {
      const index = Number(item.name.slice(-2));
      newArr[index - 1] = item?.amount;
    });
    return newArr;
  };

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
    if (!course && student && teacher) {
      return;
    }

    setOptions({
      series: [
        {
          name: 'Course',
          data: convertToChartData(course),
        },
        {
          name: 'Student',
          data: convertToChartData(student),
        },
        {
          name: 'Teacher',
          data: convertToChartData(teacher),
        },
      ],
    });
  }, [course, student, teacher]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'chart'}
      options={options}
      ref={charRef}
    />
  );
};

export default Line;
