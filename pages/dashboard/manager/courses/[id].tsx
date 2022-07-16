import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useRouter } from 'next/router';
import { getCourseDetailById } from '../../../../utils/service/courses/courseService';
import { CourseDetailType } from '../../../../utils/service/courses/courseService';
import { Card, Col, Row } from 'antd';
import { CardOverview } from '../../../../components/courses/CourseCard';
import Image from 'next/image';
const CourseDetail = () => {
  const [data, setData] = useState<CourseDetailType>();
  // console.log(props);
  const router = useRouter();
  // console.log(router);s

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
      {data && (
        <Row gutter={[6, 16]}>
          <Col span={8}>
            <Card
              cover={
                <Image
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  width={260}
                  height={260}
                />
              }
            >
              <CardOverview course={data} />
            </Card>
          </Col>
          <Col></Col>
        </Row>
      )}
    </DashboardLayout>
  );
};

export default CourseDetail;
