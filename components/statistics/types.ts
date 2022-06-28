import { WorldMap } from '../../utils/service/statistics/types';

export interface Statistics {
  name: string;
  amount: number;
}
export interface mapOptions {
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
