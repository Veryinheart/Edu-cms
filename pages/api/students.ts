// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getStudents } from '../../utils/service/students/studentService';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}

export async function getServerSideProps() {
  const paginator = { page: 1, limit: 20 };
  const res = await getStudents(paginator);
  console.log(res);

  return {
    props: { total: res?.data?.total, students: res?.data?.students },
  };
}
