import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { getCourses, CourseList } from '../../../../utils/service/courses/courseService';
import { Row, Col, Card } from 'antd';
import Image from 'next/image';

const Courses = () => {
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  const [courseList, setCourseList] = useState<CourseList[]>();

  const fetchCourse = useCallback(async () => {
    const res = await getCourses(paginator);
    if (res) {
      console.log(res);
      setCourseList(res?.data?.courses);
    }
  }, [paginator]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return (
    <DashboardLayout>
      <Row gutter={[16, 16]}>
        {courseList &&
          courseList.map((course) => (
            <Col xs={24} sm={12} md={12} lg={6} key={course.name}>
              <Card cover={<Image alt="example" src={course.cover} width={260} height={260} />}>
                <h3>{course.name}</h3>
                <div>{course.createdAt}</div>
              </Card>
            </Col>
          ))}
      </Row>
    </DashboardLayout>
  );
};

export default Courses;
