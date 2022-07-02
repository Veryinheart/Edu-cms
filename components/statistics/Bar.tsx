import React, { useRef, useState, useEffect, useMemo } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import { BarOptions } from './types';
import { StatisticsTeacher, StatisticsStudent } from '../../utils/service/statistics/types';

const Bar = ({ teacher, student }: { teacher: StatisticsTeacher; student: StatisticsStudent }) => {
  const xAxis = useMemo(() => {
    if (teacher) {
      return Object.keys(teacher?.skills);
    }
  }, [teacher]);

  const [options, setOptions] = useState<BarOptions>({
    chart: {
      type: 'column',
    },

    title: {
      text: 'Student vs teacher',
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Interests vs Skills',
      },
    },

    tooltip: {
      formatter: function () {
        return (
          '<b>' +
          this.x +
          '</b><br/>' +
          this.series.name +
          ': ' +
          this.y +
          '<br/>' +
          'Total: ' +
          this.point.stackTotal
        );
      },
    },

    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
  });

  const convertToSkillsData = (
    teacher: StatisticsTeacher
  ): Array<{ name: string; data: number[]; stack: string }> => {
    if (!teacher) {
      return;
    }

    const level1: number[] = new Array(Object.keys(teacher?.skills).length).fill(0);
    const level2: number[] = new Array(Object.keys(teacher?.skills).length).fill(0);
    const level3: number[] = new Array(Object.keys(teacher?.skills).length).fill(0);
    const level4: number[] = new Array(Object.keys(teacher?.skills).length).fill(0);
    const level5: number[] = new Array(Object.keys(teacher?.skills).length).fill(0);

    Object.values(teacher?.skills).map((item, index) => {
      item.map((value) => {
        switch (value?.level) {
          case 1:
            level1[index] = value?.amount;
            break;
          case 2:
            level2[index] = value?.amount;
            break;
          case 3:
            level3[index] = value?.amount;
            break;
          case 4:
            level4[index] = value?.amount;
            break;
          case 5:
            level5[index] = value?.amount;
            break;
          default:
            break;
        }
      });
    });

    return [
      { name: 'level1', data: level1, stack: 'skills' },
      { name: 'level2', data: level2, stack: 'skills' },
      { name: 'level3', data: level3, stack: 'skills' },
      { name: 'level4', data: level4, stack: 'skills' },
      { name: 'level5', data: level5, stack: 'skills' },
    ];
  };

  const convertToInterestData = (
    student: StatisticsStudent,
    teacher: StatisticsTeacher
  ): { name: string; data: number[]; stack: string } => {
    if (!student || !teacher) {
      return;
    }
    const interestData = new Array(Object?.keys(teacher?.skills).length).fill(0);

    const stu = Object.values(student?.interest);
    stu.map((item) => {
      // console.log(item);
      const index = Object.keys(teacher?.skills).findIndex((name) => name === item?.name);
      interestData[index] = item?.amount;
    });

    return { name: 'interest', data: interestData, stack: 'interest' };
  };

  const BarChartData = (
    teacher: StatisticsTeacher,
    student: StatisticsStudent
  ): Array<{ name: string; data: number[]; stack: string }> => {
    const interest = convertToInterestData(student, teacher);
    const skills = convertToSkillsData(teacher);

    if (interest && skills) {
      return [...skills, interest];
    } else {
      return;
    }
  };

  // reload the page
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
    setOptions({
      xAxis: {
        categories: xAxis,
      },
      series: BarChartData(teacher, student),
    });
  }, [student, teacher, xAxis]);

  return <HighchartsReact highcharts={Highcharts} options={options} ref={charRef} />;
};

export default Bar;
