import { WorldMap } from '../../utils/service/statistics/types';

export interface Gender {
  unknown: number;
  male: number;
  female: number;
}
export interface Statistics {
  name: string;
  amount: number;
}

export interface BarOptions {
  chart?: {
    type: string;
  };

  title?: {
    text: string;
  };

  xAxis?: {
    categories: string[];
  };

  yAxis?: {
    allowDecimals: false;
    min: number;
    title: {
      text: string;
    };
  };

  tooltip?: {
    formatter: () => string;
  };

  plotOptions?: {
    column: {
      stacking: string;
    };
  };

  series?: {
    name: string;
    data: number[];
    stack: string;
  }[];
}

export interface LineOptions {
  title?: {
    text: string;
  };
  yAxis?: {
    title: {
      text: string;
    };
  };
  xAxis?: {
    accessibility: {
      rangeDescription: string;
    };
    categories: string[];
  };
  legend?: {
    layout: string;
    align: string;
    verticalAlign: string;
  };
  plotOptions?: {
    series: {
      label: {
        connectorAllowed: false;
      };
    };
  };
  responsive?: {
    rules: [
      {
        condition: {
          maxWidth: number;
        };
        chartOptions: {
          legend: {
            layout: string;
            align: string;
            verticalAlign: string;
          };
        };
      }
    ];
  };
  series?: { name: string; data: number[] }[];
}

export interface PieOptions {
  chart?: {
    plotBackgroundColor: null;
    plotBorderWidth: null;
    plotShadow: false;
    type: string;
  };
  tooltip?: {
    pointFormat: string;
  };
  accessibility?: {
    point: {
      valueSuffix: string;
    };
  };
  plotOptions?: {
    pie: {
      allowPointSelect: true;
      cursor: string;
      dataLabels: {
        enabled: true;
        format: string;
      };
    };
  };
  credits?: {
    enabled: false;
  };
  exporting?: {
    enabled: false;
  };
  title?: {
    text: string;
  };
  subtitle?: {
    text: string;
    align: string;
  };
  series?: [
    {
      name: string;
      colorByPoint: true;
      data: { name: string; y: number }[];
    }
  ];
}

export interface MapOptions {
  colorAxis?: {
    min: number;
    stops: (string | number)[][];
  };
  legend?: {
    layout: string;
    align: string;
    verticalAlign: string;
  };
  credits?: {
    enabled: boolean;
  };
  exporting?: {
    enabled: boolean;
  };
  title?: {
    text: string;
  };
  series?: {
    mapData: WorldMap | null;
    name?: string;
    states?: {
      hover: {
        color: string;
      };
    };
  }[];
}

export interface HeatOptions {
  chart?: {
    type: string;
    plotBorderWidth: number;
  };
  title?: {
    text: string;
  };
  xAxis?: {
    categories: string[];
  };

  colorAxis?: {
    min: number;
    minColor: string;
    maxColor: string;
  };
  legend?: {
    align: string;
    layout: string;
    margin: number;
    verticalAlign: string;
    y: number;
    symbolHeight: number;
  };
  tooltip?: {
    formatter: () => string;
  };
  responsive?: {
    rules: [
      {
        condition: {
          maxWidth: number;
        };
        chartOptions: {
          yAxis: {
            labels: {
              formatter: () => string;
            };
          };
        };
      }
    ];
  };
  credits?: {
    enabled: boolean;
  };
  yAxis?: {
    categories: string[];
    title: null;
    reversed: true;
  };
  series?: [
    {
      name: string;
      borderWidth: number;
      data: number[]; // data format:  [column, row, amount] column, row 代表数据在表中的位置，amount：具体数据
      dataLabels: {
        enabled: true;
        color: string;
      };
    }
  ];
}
