import { Button, Form, Input, message, Select } from 'antd';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { ModalFormSubmit } from '../../pages/dashboard/manager/students/index.style';
import {
  AddStudentRequest,
  Student,
  UpdateStudentRequest,
} from '../../pages/dashboard/manager/students/types';
import { QueryPath } from '../../utils/constants/api-path';
import { businessAreas } from '../../utils/constants/common';
import { ValidateMessages } from '../../utils/constants/messages';
import { axiosWithToken } from '../../utils/service/api';

interface IProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEditingStudent: {
    student: Student | null;
    edit: boolean;
  };
  isModalVisible: boolean;
  fetchData: () => void;
}

function StudentForm(props: IProps) {
  const [form] = Form.useForm();
  const { isEditingStudent, setIsModalVisible, isModalVisible, fetchData } = props;
  console.log(isEditingStudent);

  if (!isModalVisible) {
    form.resetFields();
  }

  const handleEditStudent = async (param: UpdateStudentRequest) => {
    try {
      const res: AxiosResponse = await axiosWithToken.put(`${QueryPath.students}`, {
        ...param,
        id: isEditingStudent?.student?.id as number,
      });
      if (res) {
        // console.log(res);
        form.resetFields();
        setIsModalVisible(false);
        message.success('successfully updated student information');
        fetchData();
      }
    } catch (error) {
      // console.log(error.response);
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.msg);
      }
    }
  };

  const handleAddStudent = async (param: AddStudentRequest) => {
    // console.log(param);
    try {
      const res: AxiosResponse = await axiosWithToken.post(`${QueryPath.students}`, param);
      if (res && res.data.code === 201 && res.data.msg === 'success') {
        console.log(res.data);
        form.resetFields();
        setIsModalVisible(false);
        message.success('successfully added student information');
        fetchData();
      }
    } catch (error) {
      // console.log(error.response);
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.msg);
      }
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ offset: 1 }}
      validateMessages={ValidateMessages}
      onFinish={(param) => {
        isEditingStudent.edit ? handleEditStudent(param) : handleAddStudent(param);
      }}
      initialValues={{
        name: isEditingStudent?.student?.name,
        email: isEditingStudent?.student?.email,
        country: isEditingStudent?.student?.country,
        type: isEditingStudent?.student?.type?.id,
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input type="text" placeholder="student name" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true }, { type: 'email' }]}>
        <Input type="email" placeholder="email" />
      </Form.Item>
      <Form.Item label="Area" name="country" rules={[{ required: true }]}>
        <Select>
          {businessAreas.map((item, index) => (
            <Select.Option value={item} key={index}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Student Type" name="type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value={0}>Developer</Select.Option>
          <Select.Option value={1}>Tester</Select.Option>
        </Select>
      </Form.Item>
      <ModalFormSubmit>
        <Button type="primary" htmlType="submit">
          {isEditingStudent.edit ? 'Update' : 'Add'}
        </Button>
      </ModalFormSubmit>
    </Form>
  );
}

export default StudentForm;
