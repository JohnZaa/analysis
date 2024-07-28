// src/components/Dashboard.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { fetchData } from '../services/api';

const Dashboard: React.FC = () => {
  const { data, error, isLoading } = useQuery('data', fetchData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      {/* 使用数据绘制图表 */}
    </div>
  );
};

export default Dashboard;