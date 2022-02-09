import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Pagination, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextLink from 'antd/lib/typography/Link';
import { ColumnType } from 'antd/lib/table';
import Storage from '../../../../utils/service/storage';

import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { FlexContainer, StyledPaginationContainer, StyledSearch } from './index.style';
import Link from 'next/link';
import { businessAreas } from '../../../../utils/constants/common';
import { CourseType, Student } from './types';
import axios, { AxiosResponse } from 'axios';
import { API_URL, QueryPath } from '../../../../utils/constants/api-path';

const columns: ColumnType<Student>[] = [
  {
    title: 'No.',
    key: 'index',
    render: (_1, _2, index) => index + 1,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sortDirections: ['ascend', 'descend'],
    // sorter: (pre: Student, next: Student) => {
    //   const preCode = pre.name.charCodeAt(0);
    //   const nextCode = next.name.charCodeAt(0);

    //   return preCode > nextCode ? 1 : preCode === nextCode ? 0 : -1;
    // },
    render: (_, record: Student) => (
      <Link href={`/dashboard/manager/students/${record.id}`}>{record.name}</Link>
    ),
  },
  {
    title: 'Area',
    dataIndex: 'country',
    width: '10%',
    filters: businessAreas.map((item) => ({ text: item, value: item })),
    onFilter: (value: string, record: Student) => record.country.includes(value),
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Selected Curriculum',
    dataIndex: 'courses',
    width: '25%',
    render: (courses: CourseType[]) => courses?.map((item) => item.name).join(','),
  },
  {
    title: 'Student Type',
    dataIndex: 'type',
    filters: [
      { text: 'developer', value: 'developer' },
      { text: 'tester', value: 'tester' },
    ],
    onFilter: (value: string, record: Student) => record.type.name === value,
    render: (type: { id: number; name: string }) => type?.name,
  },
  {
    title: 'Join Time',
    dataIndex: 'createdAt',
    render: (value: string) => value,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: () => (
      <Space size="middle">
        <TextLink>Edit</TextLink>

        <TextLink>Delete</TextLink>
      </Space>
    ),
  },
];

const dataFilter = ({ students }): Student[] => {
  // console.log(students);
  return students.map((student) => {
    return {
      id: student.id,
      name: student.name,
      updatedAt: student.updatedAt,
      createdAt: student.createdAt,
      country: student.country,
      email: student.email,
      courses: student.courses,
      type: student.type,
    };
  });
};

function StudentList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [data, setData] = useState<Student[]>([]);

  const token = Storage.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AxiosResponse = await axios.get(
          `${API_URL}/${QueryPath.students}/?page=${page}&limit=${limit}`,
          {
            headers: { 'Authorization': `Bearer ${token}` },
          }
        );

        if (res) {
          const dataFiltered = dataFilter(res.data.data);
          console.log(res.data.data);
          console.log(dataFiltered);
          setData(dataFiltered);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(error.response?.data.msg);
        }
      }
    };

    fetchData();
  }, [page, limit]);

  const onSearch = (value: string) => console.log(value);
  const handlePageSize = (props) => {
    console.log(props);
    // setLimit()
  };

  const handleChange = (page, pageSize) => {
    console.log(page, pageSize);
    setPage(page);
    setLimit(pageSize);
  };
  return (
    <DashboardLayout>
      <FlexContainer>
        <Button type="primary" icon={<PlusOutlined />}>
          Add
        </Button>
        <StyledSearch placeholder="Search by name" allowClear onSearch={onSearch} />
      </FlexContainer>
      <Table columns={columns} dataSource={data} pagination={false} />
      <StyledPaginationContainer>
        <Pagination
          total={data.length}
          defaultPageSize={20}
          defaultCurrent={1}
          onShowSizeChange={handlePageSize}
          onChange={handleChange}
        />
      </StyledPaginationContainer>
    </DashboardLayout>
  );
}

export default StudentList;
