import { Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { ModalFormSubmit } from '../../pages/dashboard/manager/students/index.style';
import {
  AddStudentRequest,
  Student,
  UpdateStudentRequest,
} from '../../pages/dashboard/manager/students/types';
import { businessAreas } from '../../utils/constants/common';
import { ValidateMessages } from '../../utils/constants/messages';
import { addStudent, updateStudent } from '../../utils/service/students/studentService';

interface IProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editingStudent: {
    student: Student | null;
    edit: boolean;
  };
  isModalVisible: boolean;
  fetchData: () => void;
}

function StudentForm(props: IProps) {
  const [form] = Form.useForm();
  const { editingStudent, setIsModalVisible, fetchData } = props;

  useEffect(() => {
    form.setFieldsValue({ ...editingStudent.student, type: editingStudent?.student?.type?.id });

    return () => {
      form.resetFields();
    };
  }, [editingStudent, form]);

  const handleEditStudent = async (param: UpdateStudentRequest) => {
    try {
      // console.log(param);
      const res = await updateStudent({
        ...param,
        id: editingStudent?.student?.id as number,
      });

      if (res) {
        form.resetFields();
        setIsModalVisible(false);
        message.success('successfully updated student information');
        fetchData();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.msg);
      }
    }
  };

  const handleAddStudent = async (param: AddStudentRequest) => {
    try {
      // const res: AxiosResponse = await axiosWithToken.post(`${QueryPath.students}`, param);
      const res = await addStudent(param);

      if (res && res?.code === 201 && res?.msg === 'success') {
        form.resetFields();
        setIsModalVisible(false);
        message.success('successfully added student information');
        fetchData();
      }
    } catch (error) {
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
        console.log(param);
        editingStudent.edit ? handleEditStudent(param) : handleAddStudent(param);
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
          <Select.Option value={2}>Developer</Select.Option>
          <Select.Option value={1}>Tester</Select.Option>
        </Select>
      </Form.Item>
      <ModalFormSubmit>
        <Button type="primary" htmlType="submit">
          {editingStudent.edit ? 'Update' : 'Add'}
        </Button>
      </ModalFormSubmit>
    </Form>
  );
}

export default StudentForm;
