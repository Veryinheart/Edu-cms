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
