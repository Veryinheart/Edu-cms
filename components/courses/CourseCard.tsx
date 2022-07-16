import React from 'react';
import { Card, Typography } from 'antd';
import Link from 'next/link';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import { CardItemWrapper } from '../../pages/dashboard/manager/courses/index.style';
import { CourseList } from '../../utils/service/courses/courseService';
import { durationType } from '../../pages/dashboard/manager/courses/types';

const CourseCard = () => {
  return <Card>CourseCard</Card>;
};

export default CourseCard;

const CardItem = ({ children }: { children: JSX.Element }) => {
  return <CardItemWrapper>{children}</CardItemWrapper>;
};

const { Text, Title } = Typography;

export const CardOverview = ({ course }: { course: CourseList }) => {
  console.log(course?.teacherName);
  return (
    <>
      <Title level={5}>{course?.name}</Title>
      <CardItem>
        <>
          {course?.startTime}
          <div>
            <HeartFilled style={{ color: 'red' }} /> <strong>{course?.star}</strong>
          </div>
        </>
      </CardItem>
      <CardItem>
        <>
          <div>Duration</div>
          <strong>
            {`${course?.duration} `}
            {`${durationType[course?.durationUnit]}`}
            {'s'}
          </strong>
        </>
      </CardItem>
      <CardItem>
        <>
          <div>Teacher</div>
          <div style={{ fontWeight: 'bold' }}>
            <Link href="/dashboard/manager" passHref>
              {course?.teacherName}
            </Link>
          </div>
        </>
      </CardItem>
      <CardItem>
        <>
          <div>
            <UserOutlined style={{ color: '#1890ff' }} />
            <Text style={{ marginLeft: '2px' }}>Student Limit</Text>
          </div>
          <strong>{course?.maxStudents}</strong>
        </>
      </CardItem>
    </>
  );
};
