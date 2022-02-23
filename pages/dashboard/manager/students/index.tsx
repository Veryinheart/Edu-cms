import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import TextLink from 'antd/lib/typography/Link';
import axios from 'axios';
import _ from 'lodash';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import StudentForm from '../../../../components/students/StudentForm';
import { businessAreas } from '../../../../utils/constants/common';
import {
  deleteStudent,
  findStudentByName,
  getStudents,
} from '../../../../utils/service/students/studentService';
import { FlexContainer, StyledSearch } from './index.style';
import { CourseType, Student } from './types';

function StudentList() {
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  // const [data, setData] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [dataFiltered, setDataFiltered] = useState<Student[] | undefined>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [EditingStudent, setEditingStudent] = useState<{
    student: Student | null;
    edit: boolean;
  }>({ student: null, edit: false });

  const showModal = () => {
    setEditingStudent((EditingStudent) => ({
      ...EditingStudent,
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
      onFilter: (value, record): boolean => {
        console.log(value);
        return record.country.includes(value as string);
      },
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
      onFilter: (value, record): boolean => record?.type?.name === value,
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
              setEditingStudent((EditingStudent) => ({
                ...EditingStudent,
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
                console.log(record.id);
                // const res = await axiosWithToken.delete(`${QueryPath.students}/${record.id}`);
                const res = await deleteStudent(record.id);
                if (res && res?.code === 200 && res?.msg === 'success') {
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
    // const res: AxiosResponse = await axiosWithToken.get(
    //   `${QueryPath.students}/?page=${paginator.page}&limit=${paginator.limit}`
    // );
    // const res = await studentService.findStudents(paginator.page, paginator.limit);

    const res = await getStudents(paginator);

    // console.log(res);
    console.log(res);
    if (res) {
      setTotal(res?.data?.total as number);
      setDataFiltered(res?.data?.students);
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
              const res = await findStudentByName({
                ...paginator,
                query: event.target.value,
                page: 1,
                limit: 20,
              });

              if (res) {
                setDataFiltered(res?.data?.students);
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
        title={EditingStudent.edit ? 'Edit student' : 'Add Student'}
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
          EditingStudent={EditingStudent}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          fetchData={fetchData}
        />
      </Modal>
    </DashboardLayout>
  );
}

export default StudentList;
