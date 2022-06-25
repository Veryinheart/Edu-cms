import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { Card, Col, Progress, Row } from 'antd';
import { useEffect, useState } from 'react';
import { getStatisticsOverview } from '../../../utils/service/statistics/statisticsService';
import { StatisticsOverview } from '../../../utils/service/statistics/types';
import { OverviewCol, OverviewIconCol } from './index.style';
import { DeploymentUnitOutlined, ReadOutlined, SolutionOutlined } from '@ant-design/icons';

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

  const fetchStatisticsOverview = async () => {
    const res = await getStatisticsOverview('overview');
    if (res) {
      console.log(res.data);
      setOverView(res?.data);
    }
  };

  useEffect(() => {
    fetchStatisticsOverview();
  }, []);

  return (
    <>
      <DashboardLayout>
        {overView && (
          <Row align="middle" gutter={[24, 16]}>
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
          </Row>
        )}
        some table chart etc
      </DashboardLayout>
    </>
  );
};

export default Overview;
