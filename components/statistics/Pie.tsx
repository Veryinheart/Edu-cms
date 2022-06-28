import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Pie = () => {
  const [options, setOptions] = useState();

  useEffect(() => {
    console.log('pie ');
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>;
};

export default Pie;
