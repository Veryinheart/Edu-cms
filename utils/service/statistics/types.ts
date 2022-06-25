interface Gender {
  unknown: number;
  male: number;
  female: number;
}

export interface StatisticsOverview {
  course: {
    lastMonthAdded: number;
    total: number;
  };
  student: {
    lastMonthAdded: number;
    total: number;
    gender: Gender;
  };
  teacher: {
    lastMonthAdded: number;
    total: number;
    gender: Gender;
  };
}

export interface StatisticsStudent {
  country: { name: string; amount: number }[];
}

export type StatisticsTeacher = StatisticsStudent;
export type StatisticsCourse = StatisticsStudent;
