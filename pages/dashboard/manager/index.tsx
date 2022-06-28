import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { Card, Col, Select, Progress, Row } from 'antd';
import { useEffect, useState } from 'react';
import {
  getStatisticsOverview,
  getStatisticsTeacher,
  getStatisticsStudent,
} from '../../../utils/service/statistics/statisticsService';
import {
  Statistic,
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
  const [statisticTeacher, setStatisticTeacher] = useState<StatisticsTeacher | undefined>();
  const [statisticStudent, setStatisticStudent] = useState<StatisticsStudent | undefined>();

  const fetchStatisticsData = async () => {
    const overviewRes = await getStatisticsOverview('overview');
    const teacherRes = await getStatisticsTeacher('teacher');
    const studentRes = await getStatisticsStudent('student');

    if (overviewRes) {
      setOverView(overviewRes?.data);
    }
    if (teacherRes) {
      setStatisticTeacher(teacherRes?.data);
    }
    if (studentRes) {
      setStatisticStudent(studentRes?.data);
    }
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
                <Select defaultValue="lucy" style={{ width: 120 }} bordered={false}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              }
            >
              <Pie />
            </Card>
          </Col>
        </Row>
        some table chart etc
      </DashboardLayout>
    </>
  );
};

export default Overview;
