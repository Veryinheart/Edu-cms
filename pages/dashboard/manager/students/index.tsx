import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import TextLink from 'antd/lib/typography/Link';
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import StudentForm from '../../../../components/students/AddEditStudentForm';
import { QueryPath } from '../../../../utils/constants/api-path';
import { businessAreas } from '../../../../utils/constants/common';
import { axiosWithToken } from '../../../../utils/service/api';
import { FlexContainer, StyledSearch } from './index.style';
import { CourseType, Student } from './types';

function StudentList() {
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  // const [data, setData] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [dataFiltered, setDataFiltered] = useState<Student[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingStudent, setIsEditingStudent] = useState<{
    student: Student | null;
    edit: boolean;
  }>({ student: null, edit: false });

  const showModal = () => {
    setIsEditingStudent((isEditingStudent) => ({
      ...isEditingStudent,
      student: null,
      edit: false,
    }));
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    Modal.destroyAll();
    setIsModalVisible(false);
  };

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
      sorter: (pre: Student, next: Student) => {
        const preCode = pre.name.charCodeAt(0);
        const nextCode = next.name.charCodeAt(0);

        return preCode > nextCode ? 1 : preCode === nextCode ? 0 : -1;
      },
      render: (_, record: Student) => (
        <Link href={`/dashboard/manager/students/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: 'Area',
      dataIndex: 'country',
      width: '10%',
      filters: businessAreas.map((item) => ({ text: item, value: item })),
      onFilter: (value: string, record: Student): boolean => record.country.includes(value),
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
      onFilter: (value: string, record: Student): boolean => record?.type?.name === value,
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
      render: (_, record: Student) => (
        <Space size="middle">
          <TextLink
            onClick={() => {
              setIsEditingStudent((isEditingStudent) => ({
                ...isEditingStudent,
                student: record,
                edit: true,
              }));
              setIsModalVisible(true);
            }}
          >
            Edit
          </TextLink>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={async () => {
              try {
                const res = await axiosWithToken.delete(`${QueryPath.students}/${record.id}`);

                if (res && res.data.code === 200 && res.data.msg === 'success') {
                  fetchData();
                  message.success('successfully deleted student');
                }
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  message.error(error.response?.data.msg);
                }
              }
            }}
          >
            <TextLink>Delete</TextLink>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchData = useCallback(async () => {
    const res: AxiosResponse = await axiosWithToken.get(
      `${QueryPath.students}/?page=${paginator.page}&limit=${paginator.limit}`
    );
    if (res) {
      // console.log(res.data.data.students);
      // setData(res.data.data.students);
      setTotal(res.data.data.total);
      setDataFiltered(res.data.data.students);
    }
  }, [paginator]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DashboardLayout>
      <FlexContainer>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add
        </Button>
        <StyledSearch
          placeholder="Search by name"
          allowClear
          onChange={_.debounce(async (event) => {
            try {
              const res: AxiosResponse = await axiosWithToken.get(
                `${QueryPath.students}/?query=${event.target.value}&page=1&limit=20`
              );
              if (res) {
                setDataFiltered(res.data.data.students);
              }
            } catch (error) {
              if (axios.isAxiosError(error)) {
                message.error(error.response?.data.msg);
              }
            }
          }, 1000)}
        />
      </FlexContainer>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataFiltered}
        pagination={{
          total: total,
          current: paginator.page,
          pageSize: paginator.limit,
          onChange: (page, limit) => {
            setPaginator({ ...paginator, page: page, limit: limit });
          },
        }}
      />
      <Modal
        title={isEditingStudent.edit ? 'Edit student' : 'Add Student'}
        centered
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <StudentForm
          isEditingStudent={isEditingStudent}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          fetchData={fetchData}
        />
      </Modal>
    </DashboardLayout>
  );
}

export default StudentList;
