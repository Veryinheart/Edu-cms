import {
  DashboardOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  FileAddOutlined,
  MessageOutlined,
  ProjectOutlined,
  ReadOutlined,
  SolutionOutlined,
  TeamOutlined,
} from '@ant-design/icons';

export enum RoutePath {
  manager = 'manager',
  teachers = 'teachers',
  students = 'students',
  selectStudents = 'selectStudents',
  courses = 'courses',
  addCourse = 'add-course',
  editCourse = 'edit-course',
  own = 'own',
  schedule = 'schedule',
  profile = 'profile',
  message = 'message',
}

export interface SideNav {
  icon?: JSX.Element;
  label: string;
  path: string[];
  hideLinkInBreadcrumb?: boolean; // 当前面包屑上的链接是否应该被隐藏
  subNav?: SideNav[];
  hide?: boolean;
}
const overview: SideNav = {
  path: [],
  label: 'Overview',
  icon: <DashboardOutlined />,
};

const students: SideNav = {
  path: [RoutePath.students],
  label: 'Student',
  icon: <SolutionOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [{ path: [''], label: 'Student List', icon: <TeamOutlined /> }],
};

const teachers: SideNav = {
  path: [RoutePath.teachers],
  label: 'Teacher',
  icon: <DeploymentUnitOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    {
      path: [''],
      label: 'Teacher List',
      icon: <TeamOutlined />,
    },
  ],
};

const courses: SideNav = {
  path: [RoutePath.courses],
  label: 'Course',
  icon: <ReadOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    { path: [''], label: 'All Courses', icon: <ProjectOutlined /> },
    { path: [RoutePath.addCourse], label: 'Add Course', icon: <FileAddOutlined /> },
    { path: [RoutePath.editCourse], label: 'Edit Course', icon: <EditOutlined /> },
  ],
};

const messages: SideNav = {
  path: [RoutePath.message],
  label: 'Message',
  icon: <MessageOutlined />,
};
