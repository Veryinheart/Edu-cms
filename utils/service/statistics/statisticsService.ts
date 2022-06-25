import { QueryPath } from '../../constants/api';
import { getUrlRequest } from '../request';
import { IResponse } from '../apiConfig';
import {
  StatisticsOverview,
  StatisticsStudent,
  StatisticsTeacher,
  StatisticsCourse,
} from './types';

const path = QueryPath.statistics;

export const getStatisticsOverview = (
  subPath: string
): Promise<IResponse<StatisticsOverview> | undefined> => {
  return getUrlRequest<IResponse<StatisticsOverview> | undefined>(path, subPath);
};

export const getStatisticsStudent = (
  subPath: string
): Promise<IResponse<StatisticsStudent> | undefined> => {
  return getUrlRequest<IResponse<StatisticsStudent> | undefined>(path, subPath);
};

export const getStatisticsTeacher = (
  subPath: string
): Promise<IResponse<StatisticsTeacher> | undefined> => {
  return getUrlRequest<IResponse<StatisticsTeacher> | undefined>(path, subPath);
};
export const getStatisticsCourse = (
  subPath: string
): Promise<IResponse<StatisticsCourse> | undefined> => {
  return getUrlRequest<IResponse<StatisticsCourse> | undefined>(path, subPath);
};
