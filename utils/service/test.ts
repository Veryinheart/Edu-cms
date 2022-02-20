import { studentService } from './request';

const updateStudentRequest = async () => {
  const res = await studentService.UpdateStudent({
    'name': '11212121',
    'email': 'string@ewas.com',
    'country': 'China',
    'type': 1,
    'id': 777,
  });

  console.log(res);
};

updateStudentRequest();
