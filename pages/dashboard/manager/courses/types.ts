export enum durationType {
  'year' = 1,
  'month' = 2,
  'day' = 3,
  'week' = 4,
  'hour' = 5,
}

export interface Sales {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  batches: number;
  price: number;
  earnings: number;
  paidAmount: number;
  studentAmount: number;
  paidIds: number[];
}

export enum CourseStatusText {
  'finished',
  'processing',
  'pending',
}

export enum CourseStatusBadge {
  'warning' = 0,
  'success',
  'default',
}

export enum CourseStatusColor {
  'default',
  'green',
  'orange',
}

export interface Schedule {
  id: number;
  status: number;
  current: number;
  chapters: Chapter[];
  classTime: string[];
}

export interface Chapter {
  name: string;
  id: number;
  content: string;
  order: number;
}
