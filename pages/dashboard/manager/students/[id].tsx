import { Avatar, Card, Col, Layout, message, Row, Table, Tabs, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { programLanguageColors } from '../../../../utils/constants/common';
import { findStudentById } from '../../../../utils/service/students/studentService';
import { userInfo } from '../../../../utils/service/storage';
import { H3 } from './index.style';
import { BaseType, CourseType, StudentResponse } from './types';

function Page() {
  const router = useRouter();
  const [data, setData] = useState<StudentResponse>();
  const [courses, setCourses] = useState<CourseType[]>([] || undefined);
  const [info, setInfo] = useState<{ label: string; value: string | number }[]>([] || undefined);
  const [about, setAbout] = useState<{ label: string; value: string | number }[]>([] || undefined);
  // console.log(router);
  const user = userInfo();
  const columns: ColumnType<CourseType>[] = [
    {
      title: 'No.',
      key: 'index',
      render: (_1, _2, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (value, record) => (
        <Link href={`/dashboard/${user?.role}/courses/${record.id}`}>{value}</Link>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type: BaseType[]) => type.map((item) => item.name).join(','),
    },
    {
      title: 'Join Time',
      dataIndex: 'ctime',
    },
  ];

  const fetchStudentDetail = useCallback(async () => {
    try {
      // console.log(typeof router.query.id);
      // const res = await axiosWithToken.get(`${QueryPath.students}/${router.query.id}`);
      const res = await findStudentById(router?.query?.id);

      const info = [
        { label: 'Name', value: res?.data?.name },
        { label: 'Age', value: res?.data?.age },
        { label: 'Email', value: res?.data?.email },
        { label: 'Phone', value: res?.data?.phone },
      ];
      const about = [
        { label: 'Eduction', value: res?.data?.education },
        { label: 'Area', value: res?.data?.country },
        { label: 'Gender', value: res?.data?.gender === 1 ? 'Male' : 'Female' },
        {
          label: 'Member Period',
          value: res?.data?.memberStartAt + ' - ' + res?.data?.memberEndAt,
        },
        { label: 'Type', value: res?.data?.type?.name },
        { label: 'Create Time', value: res?.data?.createdAt },
        { label: 'Update Time', value: res?.data?.updatedAt },
      ];

      setInfo(info as { label: string; value: string | number }[]);
      setCourses(res?.data?.courses as CourseType[]);
      setAbout(about as { label: string; value: string | number }[]);
      setData(res?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.msg);
      }
    }
  }, [router.query.id]);

  useEffect(() => {
    fetchStudentDetail();
  }, [fetchStudentDetail]);

  return (
    <DashboardLayout>
      <Layout>
        <Row gutter={[6, 16]}>
          <Col span={8}>
            <Card
              title={
                <Avatar
                  src={data?.avatar}
                  style={{ width: 100, height: 100, display: 'block', margin: 'auto' }}
                />
              }
            >
              <Row gutter={[6, 16]}>
                {info.map((item) => (
                  <Col span={12} key={item.label} style={{ textAlign: 'center' }}>
                    <b>{item.label}</b>
                    <p>{item.value}</p>
                  </Col>
                ))}
              </Row>
              <Row gutter={[6, 16]}>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <b>Address</b>
                  <p>{data?.address}</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col offset={1} span={15}>
            <Card>
              <Tabs defaultActiveKey="1" animated={true}>
                <Tabs.TabPane tab="About" key="1">
                  <H3>Information</H3>

                  <Row gutter={[6, 16]}>
                    {about.map((item) => (
                      <Col span={24} key={item.label}>
                        <b style={{ marginRight: 16, minWidth: 150, display: 'inline-block' }}>
                          {item.label}:
                        </b>
                        <span>{item.value}</span>
                      </Col>
                    ))}
                  </Row>

                  <H3>Interesting</H3>

                  <Row gutter={[6, 16]}>
                    <Col>
                      {data?.interest.map((item, index) => (
                        <Tag
                          color={programLanguageColors[index]}
                          key={item}
                          style={{ padding: '5px 10px' }}
                        >
                          {item}
                        </Tag>
                      ))}
                    </Col>
                  </Row>

                  <H3>Description</H3>

                  <Row gutter={[6, 16]}>
                    <Col style={{ lineHeight: 2 }}>{data?.description}</Col>
                  </Row>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Courses" key="2">
                  <Table dataSource={courses} columns={columns} rowKey="id"></Table>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Layout>
    </DashboardLayout>
  );
}

export default Page;
