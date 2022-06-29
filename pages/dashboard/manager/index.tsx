import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { Card, Col, Select, Progress, Row } from 'antd';
import { useEffect, useState } from 'react';
import {
  getStatisticsOverview,
  getStatisticsTeacher,
  getStatisticsStudent,
  getStatisticsCourse,
} from '../../../utils/service/statistics/statisticsService';
import {
  Statistic,
  StatisticsCourse,
  StatisticsOverview,
  StatisticsStudent,
  StatisticsTeacher,
} from '../../../utils/service/statistics/types';
import { OverviewCol, OverviewIconCol, StyledOverviewCardContainer } from './index.style';
import { DeploymentUnitOutlined, ReadOutlined, SolutionOutlined } from '@ant-design/icons';
import Distribution from '../../../components/statistics/Distribution';
import Pie from '../../../components/statistics/Pie';
import { Role } from '../../../utils/service/user/types';

const { Option } = Select;
const StyledOverviewCard = ({
  icon,
  title,
  data,
  style,
}: {
  icon: JSX.Element;
  title: string;
  data: { lastMonthAdded: number; total: number };
  style: React.CSSProperties;
}) => {
  const lastMonthAddedPercent = +parseFloat(
    String((data?.lastMonthAdded / data?.total) * 100)
  ).toFixed(1);

  return (
    <Card style={{ borderRadius: 5, cursor: 'pointer', ...style }}>
      <Row>
        <OverviewIconCol span={6}>{icon}</OverviewIconCol>
        <OverviewCol span={18}>
          <h3>{title}</h3>
          <h2>{data?.total}</h2>
          <Progress
            percent={100 - lastMonthAddedPercent}
            size="small"
            showInfo={false}
            strokeColor="white"
            trailColor="lightgreen"
          />
          <p>{`${lastMonthAddedPercent + '%'} Increase in 30 Days`}</p>
        </OverviewCol>
      </Row>
    </Card>
  );
};

const Overview: React.FC = () => {
  const [overView, setOverView] = useState<StatisticsOverview | undefined>();
  const [distributionRole, setDistributionRole] = useState<string>(Role.teacher);

  const [pieRole, setPieRole] = useState<string>(Role.student);
  const [statisticTeacher, setStatisticTeacher] = useState<StatisticsTeacher | undefined>();
  const [statisticStudent, setStatisticStudent] = useState<StatisticsStudent | undefined>();
  const [statisticCourse, setStatisticCourse] = useState<StatisticsCourse | undefined>();

  const fetchStatisticsData = async () => {
    const overviewRes = await getStatisticsOverview('overview');
    const teacherRes = await getStatisticsTeacher('teacher');
    const studentRes = await getStatisticsStudent('student');
    const courseRes = await getStatisticsCourse('course');

    if (overviewRes) {
      setOverView(overviewRes?.data);
    }
    if (teacherRes) {
      setStatisticTeacher(teacherRes?.data);
    }
    if (studentRes) {
      // console.log(studentRes.data.type);
      setStatisticStudent(studentRes?.data);
    }
    if (courseRes) {
      setStatisticCourse(courseRes?.data);
    }
  };
  const handleTypeChange = (value: string) => {
    setPieRole(value);
  };
  const handleDistributionChange = (value: string) => {
    console.log(value);
    setDistributionRole(value);
  };
  useEffect(() => {
    fetchStatisticsData();
  }, []);

  return (
    <>
      <DashboardLayout>
        {overView && (
          <StyledOverviewCardContainer>
            <Row align="middle" gutter={[24, 16]}>
              {/* // <StyledOverviewCardContainer> */}
              <Col span={8}>
                <StyledOverviewCard
                  style={{ background: '#1890ff' }}
                  title="TOTAL STUDENTS"
                  data={overView.student}
                  icon={<SolutionOutlined />}
                />
              </Col>
              <Col span={8}>
                <StyledOverviewCard
                  title="TOTAL TEACHERS"
                  data={overView.teacher}
                  icon={<DeploymentUnitOutlined />}
                  style={{ background: '#673bb7' }}
                />
              </Col>

              <Col span={8}>
                <StyledOverviewCard
                  title="TOTAL COURSES"
                  data={overView.course}
                  icon={<ReadOutlined />}
                  style={{ background: '#ffaa16' }}
                />
              </Col>
              {/* </StyledOverviewCardContainer> */}
            </Row>
          </StyledOverviewCardContainer>
        )}
        <Row align="middle" gutter={[8, 8]}>
          <Col span={12}>
            <Card
              title="Distribution"
              extra={
                <Select
                  defaultValue={Role.teacher}
                  bordered={false}
                  onChange={handleDistributionChange}
                >
                  <Option value={Role.student}>Student</Option>
                  <Option value={Role.teacher}>Teacher</Option>
                </Select>
              }
            >
              {
                <Distribution
                  data={
                    (distributionRole === Role.student
                      ? statisticStudent?.country
                      : statisticTeacher?.country) as Statistic[]
                  }
                  title={distributionRole}
                />
              }
            </Card>
          </Col>

          <Col span={12}>
            <Card
              title="Types"
              extra={
                <Select defaultValue="student" bordered={false} onSelect={handleTypeChange}>
                  <Option value="student">Student Type</Option>
                  <Option value="course">Course Type</Option>
                  <Option value="gender">Gender Type</Option>
                </Select>
              }
            >
              <Pie
                data={
                  pieRole === 'student'
                    ? statisticStudent?.type
                    : pieRole === 'course'
                    ? statisticCourse.type
                    : overView
                }
                title={pieRole}
              />
            </Card>
          </Col>
        </Row>
        some table chart etc
      </DashboardLayout>
    </>
  );
};

export default Overview;
