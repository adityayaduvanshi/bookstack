import React from 'react';
import { TAnalytics } from '@/types/analytics';
import { Card, CardHeader, CardTitle } from '../ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  analyticsData: TAnalytics;
}

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const AnalyticsCard: React.FC<Props> = ({ analyticsData }) => {
  return (
    <div className="grid  mx-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
      <Card className="ml-2 pr-3  max-w-s h-30 border-2 border-dark-600">
        <div className="flex items-center gap-4">
          <CardHeader>
            <p className="font-bold text-lg">subscriptions</p>
            <CardTitle className="text-2xl">
              {analyticsData.subescription}
            </CardTitle>
            <p className="font-bold text-sm">Subscriptions</p>
          </CardHeader>
          <LineChart width={200} height={100} data={data}>
            <Line type="linear" dataKey="pv" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </div>
      </Card>

      <Card className="  max-w-s pr-3">
        <div className="flex items-center justify-between gap-3">
          <CardHeader>
            <p className="font-bold text-lg">Subscribers</p>
            <CardTitle className="text-2xl">
              {analyticsData.subscribers}
            </CardTitle>
            <p className="font-bold text-sm">Subscribers</p>
          </CardHeader>
          <LineChart width={200} height={100} data={data}>
            <Line type="linear" dataKey="pv" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </div>
      </Card>

      <Card className="pr-3 max-w-s">
        <div className="flex items-center justify-between gap-4">
          <CardHeader>
            <p className="font-bold mr-10 text-lg">Earning</p>
            <CardTitle className="text-2xl">{analyticsData.earnings}</CardTitle>
            <p className="font-bold text-sm">Revenue</p>
          </CardHeader>
          <LineChart width={200} height={100} data={data}>
            <Line type="linear" dataKey="pv" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsCard;
