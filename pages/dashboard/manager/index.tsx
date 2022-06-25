import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { Card, Row } from 'antd';
import { useEffect, useState } from 'react';
import { getStatisticsOverview } from '../../../utils/service/statistics/statisticsService';
import { StatisticsOverview } from '../../../utils/service/statistics/types';
import { OverviewIconCol } from './index.style';

const Overview: React.FC = () => {
  const [overView, setOverView] = useState<StatisticsOverview | undefined>();

  const fetchStatisticsOverview = async () => {
    const res = await getStatisticsOverview('overview');
    if (res) {
      setOverView(res?.data);
    }
  };

  useEffect(() => {
    fetchStatisticsOverview();
  }, []);

  return (
    <>
      <DashboardLayout>
        <Card />
        {overView?.course?.total}
        some table chart etc
      </DashboardLayout>
    </>
  );
};

export default Overview;
