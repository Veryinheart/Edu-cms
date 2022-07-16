import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { getCourses, CourseList } from '../../../../utils/service/courses/courseService';
import { Row, Col, Card, Typography, Button, Divider, Skeleton, BackTop, Spin } from 'antd';
import Image from 'next/image';
import { CardItemWrapper } from './index.style';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { durationType } from './types';
import { getRole } from '../../../../utils/service/storage';
import Link from 'next/link';
// console.log(getRole());
const { Text } = Typography;

const CardItem = ({ children }: { children: JSX.Element }) => {
  return <CardItemWrapper>{children}</CardItemWrapper>;
};

const Courses = () => {
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  const [courseList, setCourseList] = useState<CourseList[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await getCourses(paginator);
      if (res) {
        setTotal(res?.data?.total);
        setCourseList((pre) => [...pre, ...res?.data?.courses]);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [paginator]);

  return (
    <DashboardLayout>
      {loading ? (
        <Spin />
      ) : (
        <InfiniteScroll
          dataLength={courseList?.length}
          next={() => {
            setPaginator({ ...paginator, page: paginator.page + 1 });
          }}
          hasMore={courseList?.length < total}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={courseList && <Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="contentDiv"
          style={{ overflow: 'hidden' }}
        >
          <Row gutter={[16, 16]}>
            {courseList &&
              courseList.map((course, index) => (
                <Col xs={24} sm={12} md={12} lg={6} key={`${course.name}${index}`}>
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
                    <h3>{course.name}</h3>
                    <CardItem>
                      <>
                        {course.startTime}
                        <div>
                          <HeartFilled style={{ color: 'red' }} /> <strong>{course.star}</strong>
                        </div>
                      </>
                    </CardItem>
                    <CardItem>
                      <>
                        <div>Duration</div>{' '}
                        <strong>
                          {`${course?.duration}`}
                          {`${durationType[course?.durationUnit]}`}
                          {'s'}
                        </strong>
                      </>
                    </CardItem>
                    <CardItem>
                      <>
                        <div>Teacher</div>
                        <Link href="//dashboard/manager/teachers" passHref>
                          <strong>{course.teacherName}</strong>
                        </Link>
                      </>
                    </CardItem>
                    <CardItem>
                      <>
                        <div>
                          <UserOutlined style={{ color: '#1890ff' }} />
                          <Text style={{ marginLeft: '2px' }}>Student Limit</Text>
                        </div>
                        <strong>{course.maxStudents}</strong>
                      </>
                    </CardItem>
                    <div>
                      <Link href={`/dashboard/${getRole()}/courses/${course.id}`} passHref>
                        <Button type="primary">Read More</Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </InfiniteScroll>
      )}
      <BackTop />
    </DashboardLayout>
  );
};

export default Courses;
