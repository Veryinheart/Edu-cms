import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useRouter } from 'next/router';
import { getCourseDetailById } from '../../../../utils/service/courses/courseService';
import { CourseDetailType } from '../../../../utils/service/courses/courseService';
import { Badge, Card, Col, Collapse, Row, Steps, Tag } from 'antd';
import { CardOverview } from '../../../../components/courses/CourseCard';
import Image from 'next/image';
import { SalesItemWrapper, SalesItemUp, H2, H3, StepsRow } from './index.style';
import { Sales, Schedule, CourseStatusColor, CourseStatusText } from './types';
import WeekCalendar from '../../../../components/courses/WeekCalendar';

const SalesItem = ({ sales, name }: { sales: Sales; name: string }) => {
  return (
    <SalesItemWrapper>
      <SalesItemUp>{sales[name]}</SalesItemUp>
      {name === 'studentAmount' ? <div>STUDENTS</div> : <div>{name.toUpperCase()}</div>}
    </SalesItemWrapper>
  );
};

const getChapterExtra = (source: Schedule, index: number) => {
  const activeIndex = source.chapters.findIndex((item) => item.id === source.current);
  const status = index === activeIndex ? 1 : index < activeIndex ? 0 : 2;

  return <Tag color={CourseStatusColor[status]}>{CourseStatusText[status]}</Tag>;
};

const CourseDetail = (props: { id: number }) => {
  const [data, setData] = useState<CourseDetailType>();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const id = router.query.id || props.id;
      const { data } = await getCourseDetailById(id);
      if (data) {
        console.log(data);
        setData(data);
        setActiveChapterIndex(
          data?.schedule?.chapters?.findIndex((item) => item.id === data?.schedule?.current)
        );
      }
    })();
  }, [router.query.id, props.id]);

  return (
    <DashboardLayout>
      {data && (
        <Row gutter={[6, 16]}>
          <Col span={8}>
            <Card
              cover={<Image alt="example" src={data.cover} width={'0.25vw'} height={260} />}
              actions={[
                <SalesItem key="price" sales={data.sales} name="price" />,
                <SalesItem key="batches" sales={data.sales} name="batches" />,
                <SalesItem key="studentAmount" sales={data.sales} name="studentAmount" />,
                <SalesItem key="earnings" sales={data.sales} name="earnings" />,
              ]}
            >
              <CardOverview course={data} />
            </Card>
          </Col>
          <Col offset={1} span={15}>
            <Card>
              <H2>Course Detail</H2>

              <H3>Create Time</H3>
              <Row>{data?.createdAt}</Row>

              <H3>Start Time</H3>
              <Row>{data?.startTime}</Row>
              <Badge status="success" dot={true} offset={[5, 24]}>
                <H3>Status</H3>
              </Badge>
              <StepsRow>
                <Steps size="small" current={activeChapterIndex} style={{ width: 'auto' }}>
                  {data?.schedule.chapters.map((item) => (
                    <Steps.Step title={item.name} key={item.id}></Steps.Step>
                  ))}
                </Steps>
              </StepsRow>
              <H3>Course Code</H3>
              <Row>{data?.uid}</Row>

              <H3>Class Time</H3>
              <WeekCalendar data={data?.schedule.classTime} />

              <H3>Category</H3>
              <Row>
                {data?.type.map((item) => (
                  <Tag color={'geekblue'} key={item.id}>
                    {item.name}
                  </Tag>
                ))}
              </Row>

              <H3>Description</H3>
              {data?.detail !== 'no' ? <Row>{data?.detail}</Row> : <Row>AAAAAAA</Row>}
              <H3>Chapter</H3>
              {data?.schedule && (
                <Collapse defaultActiveKey={data.schedule.current}>
                  {data.schedule.chapters.map((item, index) => (
                    <Collapse.Panel
                      header={item.name}
                      key={item.id}
                      extra={getChapterExtra(data.schedule, index)}
                    >
                      <p>{item.content}</p>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </DashboardLayout>
  );
};

export default CourseDetail;

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: { id },
  };
}
