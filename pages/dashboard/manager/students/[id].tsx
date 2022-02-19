import React, { useCallback, useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useEffect } from 'react';
import { axiosWithToken } from '../../../../utils/service/apiConfig';
import { QueryPath } from '../../../../utils/constants/api';
import { useRouter } from 'next/router';
import { BaseType, CourseType, StudentResponse } from './types';
import { Avatar, Card, Col, Layout, message, Row, Table, Tabs, Tag } from 'antd';
import { H3 } from './index.style';
import Link from 'next/link';
import { ColumnType } from 'antd/lib/table';
import storage from '../../../../utils/service/storage';
import { programLanguageColors } from '../../../../utils/constants/common';
import axios from 'axios';

function Page() {
  const router = useRouter();
  const [data, setData] = useState<StudentResponse>();
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [info, setInfo] = useState<{ label: string; value: string | number }[]>([]);
  const [about, setAbout] = useState<{ label: string; value: string | number }[]>([]);
  // console.log(router);

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
        <Link href={`/dashboard/${storage.role}/courses/${record.id}`}>{value}</Link>
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
      const res = await axiosWithToken.get(`${QueryPath.students}/${router.query.id}`);
      console.log(res.data.data);

      const info = [
        { label: 'Name', value: res.data.data.name },
        { label: 'Age', value: res.data.data.age },
        { label: 'Email', value: res.data.data.email },
        { label: 'Phone', value: res.data.data.phone },
      ];
      const about = [
        { label: 'Eduction', value: res.data.data.education },
        { label: 'Area', value: res.data.data.country },
        { label: 'Gender', value: res.data.data.gender === 1 ? 'Male' : 'Female' },
        {
          label: 'Member Period',
          value: res.data.data.memberStartAt + ' - ' + res.data.data.memberEndAt,
        },
        { label: 'Type', value: res.data.data.type.name },
        { label: 'Create Time', value: res.data.data.ctime },
        { label: 'Update Time', value: res.data.data.updateAt },
      ];

      setInfo(info);
      setCourses(res.data.data.courses);
      setAbout(about);
      setData(res.data.data);
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
