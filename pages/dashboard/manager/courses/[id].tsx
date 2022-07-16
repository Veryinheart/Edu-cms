import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useRouter } from 'next/router';
import { getCourseDetailById } from '../../../../utils/service/courses/courseService';
import { CourseDetailType } from '../../../../utils/service/courses/courseService';
import { Col, Row } from 'antd';
import { CardOverview } from '../../../../components/courses/CourseCard';

const CourseDetail = () => {
  const [data, setData] = useState<CourseDetailType>();
  // console.log(props);
  const router = useRouter();
  // console.log(router);

  useEffect(() => {
    (async () => {
      const id = router.query.id;
      const { data } = await getCourseDetailById(id);
      if (data) {
        console.log(data);
        setData(data);
      }
    })();
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <Row gutter={[6, 16]}>
        <Col span={8}>
          <CardOverview course={data} />
        </Col>
        <Col></Col>
      </Row>
    </DashboardLayout>
  );
};

export default CourseDetail;
