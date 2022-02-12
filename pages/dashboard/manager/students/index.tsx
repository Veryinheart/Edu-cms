import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import TextLink from 'antd/lib/typography/Link';
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import AddEditStudentForm from '../../../../components/students/AddEditStudentForm';
import { API_URL, QueryPath } from '../../../../utils/constants/api-path';
import { businessAreas } from '../../../../utils/constants/common';
import Storage from '../../../../utils/service/storage';
import { FlexContainer, StyledSearch } from './index.style';
import { CourseType, Student } from './types';

function StudentList() {
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  const [data, setData] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [dataFiltered, setDataFiltered] = useState<Student[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingStudent, setIsEditingStudent] = useState<{
    student: Student | null;
    edit: boolean;
  }>({ student: null, edit: false });

  const showModal = () => {
    setIsEditingStudent({ ...isEditingStudent, student: null, edit: false });
    setIsModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const token = Storage.token;
  const [form] = Form.useForm();

  // const handleEditStudent = async (record: Student) => {
  //   // console.log()
  //   setIsEditingStudent(true);
  //   return null;
  //   try {
  //     const res: AxiosResponse = await axios.put(
  //       `${API_URL}/${QueryPath.students}`,
  //       {
  //         id: record.id,
  //         name: record.name,
  //         email: record.email,
  //         country: record.country,
  //         type: record.type,
  //       },
  //       {
  //         headers: { 'Authorization': `Bearer ${token}` },
  //       }
  //     );
  //     console.log(res);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       message.error(error.response?.data.msg);
  //     }
  //   }
  // };

  // const handleAddStudent = async (param: EditStudentRequest) => {
  //   // console.log(param);
  //   try {
  //     const res: AxiosResponse = await axiosWithToken.post(`${QueryPath.students}`, param);
  //     if (res && res.data.code === 201 && res.data.msg === 'success') {
  //       console.log(res.data);
  //       setIsModalVisible(false);
  //       form.resetFields();
  //       message.success('successfully added student information');
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       message.error(error.response?.data.msg);
  //     }
  //   }
  // };

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
      render: (_, record: Student) => (
        <Space size="middle">
          <TextLink
            onClick={() => {
              // console.log(record);
              setIsEditingStudent({ ...isEditingStudent, student: record, edit: true });
              // console.log(isEditingStudent);
              setIsModalVisible(true);
            }}
          >
            Edit
          </TextLink>

          <TextLink>Delete</TextLink>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AxiosResponse = await axios.get(
          `${API_URL}/${QueryPath.students}/?page=${paginator.page}&limit=${paginator.limit}`,
          {
            headers: { 'Authorization': `Bearer ${token}` },
          }
        );
        if (res) {
          // console.log(res.data.data);
          setData(res.data.data.students);
          console.log(res.data.data);
          setTotal(res.data.data.total);
          setDataFiltered(res.data.data.students);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(error.response?.data.msg);
        }
      }
    };

    fetchData();
  }, [paginator, token]);

  return (
    <DashboardLayout>
      <FlexContainer>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add
        </Button>
        <StyledSearch
          placeholder="Search by name"
          allowClear
          onChange={_.debounce((event) => {
            const result = data.filter((item) => item.name.includes(event.target.value));
            setDataFiltered(result);
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
        <AddEditStudentForm
          isEditingStudent={isEditingStudent}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </DashboardLayout>
  );
}

export default StudentList;
