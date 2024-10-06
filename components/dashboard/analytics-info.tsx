'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AnalyticsCard from './analytics-card';
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
import { TAnalytics, TCourse, TSelect } from '@/types/analytics';

const dataWeek = [
  {
    name: 'Mon',
    subscribers: 4000,
    earnings: 2400,
    subscription: 2400,
    course: 'app dev',
  },
  {
    name: 'Tue',
    subscribers: 3000,
    earnings: 1398,
    subscription: 2210,
    course: 'web dev',
  },
  {
    name: 'Wed',
    subscribers: 2000,
    earnings: 9800,
    subscription: 2290,
    course: 'blockchain',
  },
  {
    name: 'Thu',
    subscribers: 2780,
    earnings: 3908,
    subscription: 2000,
    course: 'app dev',
  },
  {
    name: 'Fri',
    subscribers: 1890,
    earnings: 4800,
    subscription: 2181,
    course: 'web dev',
  },
  {
    name: 'Sat',
    subscribers: 2390,
    earnings: 3800,
    subscription: 2500,
    course: 'blockchain',
  },
  {
    name: 'Sun',
    subscribers: 3490,
    earnings: 4300,
    subscription: 2100,
    course: 'app dev',
  },
  {
    name: 'Mon',
    subscribers: 4200,
    earnings: 2600,
    subscription: 2500,
    course: 'app dev',
  },
  {
    name: 'Tue',
    subscribers: 3200,
    earnings: 1498,
    subscription: 2310,
    course: 'web dev',
  },
  {
    name: 'Wed',
    subscribers: 2200,
    earnings: 9900,
    subscription: 2390,
    course: 'blockchain',
  },
  {
    name: 'Thu',
    subscribers: 2980,
    earnings: 4008,
    subscription: 2100,
    course: 'app dev',
  },
  {
    name: 'Fri',
    subscribers: 1990,
    earnings: 4900,
    subscription: 2281,
    course: 'web dev',
  },
  {
    name: 'Sat',
    subscribers: 2490,
    earnings: 3900,
    subscription: 2600,
    course: 'blockchain',
  },
  {
    name: 'Sun',
    subscribers: 3590,
    earnings: 4400,
    subscription: 2200,
    course: 'app dev',
  },
  {
    name: 'Mon',
    subscribers: 4300,
    earnings: 2700,
    subscription: 2600,
    course: 'app dev',
  },
  {
    name: 'Tue',
    subscribers: 3300,
    earnings: 1598,
    subscription: 2410,
    course: 'web dev',
  },
  {
    name: 'Wed',
    subscribers: 2300,
    earnings: 10000,
    subscription: 2490,
    course: 'blockchain',
  },
  {
    name: 'Thu',
    subscribers: 3080,
    earnings: 4108,
    subscription: 2200,
    course: 'app dev',
  },
  {
    name: 'Fri',
    subscribers: 2090,
    earnings: 5000,
    subscription: 2381,
    course: 'web dev',
  },
  {
    name: 'Sat',
    subscribers: 2590,
    earnings: 4000,
    subscription: 2700,
    course: 'blockchain',
  },
  {
    name: 'Sun',
    subscribers: 3690,
    earnings: 4500,
    subscription: 2300,
    course: 'app dev',
  },
  {
    name: 'Mon',
    subscribers: 4400,
    earnings: 2800,
    subscription: 2700,
    course: 'app dev',
  },
  {
    name: 'Tue',
    subscribers: 3400,
    earnings: 1698,
    subscription: 2510,
    course: 'web dev',
  },
  {
    name: 'Wed',
    subscribers: 2400,
    earnings: 10100,
    subscription: 2590,
    course: 'blockchain',
  },
  {
    name: 'Thu',
    subscribers: 3180,
    earnings: 4208,
    subscription: 2300,
    course: 'app dev',
  },
  {
    name: 'Fri',
    subscribers: 2190,
    earnings: 5100,
    subscription: 2481,
    course: 'web dev',
  },
  {
    name: 'Sat',
    subscribers: 2690,
    earnings: 4100,
    subscription: 2800,
    course: 'blockchain',
  },
  {
    name: 'Sun',
    subscribers: 3790,
    earnings: 4600,
    subscription: 2400,
    course: 'app dev',
  },
];

const dataMonth = [
  {
    name: 'Jan',
    subscribers: 12000,
    earnings: 7200,
    subscription: 7200,
    course: 'app dev',
  },
  {
    name: 'Feb',
    subscribers: 8340,
    earnings: 11724,
    subscription: 6000,
    course: 'app dev',
  },
  {
    name: 'Mar',
    subscribers: 9100,
    earnings: 12214,
    subscription: 7210,
    course: 'app dev',
  },
  {
    name: 'Apr',
    subscribers: 8234,
    earnings: 14234,
    subscription: 7543,
    course: 'app dev',
  },
  {
    name: 'May',
    subscribers: 13000,
    earnings: 8200,
    subscription: 8200,
    course: 'app dev',
  },
  {
    name: 'Jun',
    subscribers: 8440,
    earnings: 11824,
    subscription: 6100,
    course: 'aditya',
  },
  {
    name: 'Jul',
    subscribers: 9200,
    earnings: 12314,
    subscription: 7310,
    course: 'aditya',
  },
  {
    name: 'Aug',
    subscribers: 8334,
    earnings: 14334,
    subscription: 7643,
    course: 'app dev',
  },
  {
    name: 'Sep',
    subscribers: 13500,
    earnings: 8700,
    subscription: 8700,
    course: 'sss',
  },
  {
    name: 'Oct',
    subscribers: 8540,
    earnings: 11924,
    subscription: 6200,
    course: 'sss',
  },
  {
    name: 'Nov',
    subscribers: 9300,
    earnings: 12414,
    subscription: 7410,
    course: 'aditya',
  },
  {
    name: 'Dec',
    subscribers: 8434,
    earnings: 14434,
    subscription: 7743,
    course: 'sss',
  },

  {
    name: 'Jan',
    subscribers: 9000,
    earnings: 4194,
    subscription: 6630,
    course: 'web dev',
  },
  {
    name: 'Feb',
    subscribers: 5670,
    earnings: 14400,
    subscription: 6543,
    course: 'web dev',
  },
  {
    name: 'Mar',
    subscribers: 6710,
    earnings: 10234,
    subscription: 5432,
    course: 'web dev',
  },
  {
    name: 'Apr',
    subscribers: 6234,
    earnings: 11324,
    subscription: 6432,
    course: 'web dev',
  },
  {
    name: 'May',
    subscribers: 9500,
    earnings: 5194,
    subscription: 7030,
    course: 'web dev',
  },
  {
    name: 'Jun',
    subscribers: 5770,
    earnings: 14500,
    subscription: 6643,
    course: 'web dev',
  },
  {
    name: 'Jul',
    subscribers: 6810,
    earnings: 10334,
    subscription: 5532,
    course: 'web dev',
  },
  {
    name: 'Aug',
    subscribers: 6334,
    earnings: 11424,
    subscription: 6532,
    course: 'web dev',
  },
  {
    name: 'Sep',
    subscribers: 9600,
    earnings: 5294,
    subscription: 7130,
    course: 'web dev',
  },
  {
    name: 'Oct',
    subscribers: 5870,
    earnings: 14600,
    subscription: 6743,
    course: 'web dev',
  },
  {
    name: 'Nov',
    subscribers: 6910,
    earnings: 10434,
    subscription: 5632,
    course: 'web dev',
  },
  {
    name: 'Dec',
    subscribers: 6434,
    earnings: 11524,
    subscription: 6632,
    course: 'web dev',
  },

  {
    name: 'Jan',
    subscribers: 6000,
    earnings: 29400,
    subscription: 6870,
    course: 'blockchain',
  },
  {
    name: 'Feb',
    subscribers: 7840,
    earnings: 9214,
    subscription: 8321,
    course: 'blockchain',
  },
  {
    name: 'Mar',
    subscribers: 8321,
    earnings: 11234,
    subscription: 6874,
    course: 'blockchain',
  },
  {
    name: 'Apr',
    subscribers: 9123,
    earnings: 13234,
    subscription: 8765,
    course: 'blockchain',
  },
  {
    name: 'May',
    subscribers: 6200,
    earnings: 30400,
    subscription: 7170,
    course: 'blockchain',
  },
  {
    name: 'Jun',
    subscribers: 7940,
    earnings: 9314,
    subscription: 8421,
    course: 'blockchain',
  },
  {
    name: 'Jul',
    subscribers: 8421,
    earnings: 11334,
    subscription: 6974,
    course: 'blockchain',
  },
  {
    name: 'Aug',
    subscribers: 9223,
    earnings: 13334,
    subscription: 8865,
    course: 'blockchain',
  },
  {
    name: 'Sep',
    subscribers: 6300,
    earnings: 31400,
    subscription: 7270,
    course: 'blockchain',
  },
  {
    name: 'Oct',
    subscribers: 8040,
    earnings: 9414,
    subscription: 8521,
    course: 'blockchain',
  },
  {
    name: 'Nov',
    subscribers: 8521,
    earnings: 11434,
    subscription: 7074,
    course: 'blockchain',
  },
  {
    name: 'Dec',
    subscribers: 9323,
    earnings: 13434,
    subscription: 8965,
    course: 'blockchain',
  },
];

const dummyData: TAnalytics[] = [
  {
    courseName: 'web dev',
    earnings: 10,
    subscribers: 14,
    subescription: 20,
  },
  {
    courseName: 'app dev',
    earnings: 20,
    subscribers: 13,
    subescription: 10,
  },
  {
    courseName: 'blockchain',
    earnings: 30,
    subscribers: 15,
    subescription: 10,
  },
];

const getColor = (index: number) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658'];
  return colors[index % colors.length];
};

const AnalyticsInfo: React.FC = () => {
  const [courses, setCourses] = useState<TCourse[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<TAnalytics>({
    earnings: 0,
    subscribers: 0,
    subescription: 0,
  });
  const [error, setError] = useState(null);
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectValue, setSelectValue] = useState<TSelect[]>([]);
  const [metrics, setMetrics] = useState('subscription');

  const getData = (course: string) => {
    switch (timePeriod) {
      case 'week':
        return dataWeek.filter((item) => item.course === course);
      case 'month':
      default:
        return dataMonth.filter((item) => item.course === course);
    }
  };

  useEffect(() => {
    axios
      .get('/api/course/get')
      .then((res) => {
        const coursesData = res.data.map((course: TCourse) => ({
          value: course.id,
          label: course.title,
        }));
        setCourses(coursesData);
        setSelectValue({
          label: res.data[0].title,
          value: res.data[0].id,
        } as any);
        setAnalyticsData({
          earnings: dummyData[0].earnings,
          subscribers: dummyData[0].subscribers,
          subescription: dummyData[0].subescription,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (value: any) => {
    setSelectValue(value);
    let totalEarnings = 0;
    let totalSubscribers = 0;
    let totalSubescription = 0;

    value.forEach((item: { label: string }) => {
      const matchingCourses = dummyData.filter(
        (course) => course.courseName === item.label
      );

      if (matchingCourses.length > 0) {
        totalEarnings += matchingCourses.reduce(
          (acc, course) => acc + course.earnings,
          0
        );
        totalSubscribers += matchingCourses.reduce(
          (acc, course) => acc + course.subscribers,
          0
        );
        totalSubescription += matchingCourses.reduce(
          (acc, course) => acc + course.subescription,
          0
        );
      }
    });
    setAnalyticsData({
      earnings: totalEarnings,
      subscribers: totalSubscribers,
      subescription: totalSubescription,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <h1 className="text-lg font-semibold">Course</h1>
        <Select
          defaultValue={courses[0]}
          isMulti
          name="course"
          options={courses}
          onChange={handleSelect as () => void}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <AnalyticsCard analyticsData={analyticsData as TAnalytics} />
      <div className="mt-4">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-3">
          <div className="flex items-center gap-1">
            <h3 className="text-[15px] font-semibold">Metrics</h3>
            <button
              onClick={() => setMetrics('subscription')}
              className="px-3 py-1 bg-[#A6A6A6] text-sm text-white"
            >
              subscriptions
            </button>
            <button
              onClick={() => setMetrics('earnings')}
              className="px-5 py-1 bg-[#A6A6A6] text-sm text-white"
            >
              Earning
            </button>
            <button
              onClick={() => setMetrics('subscribers')}
              className="px-3 py-1 bg-[#A6A6A6] text-sm text-white"
            >
              subscribes
            </button>
          </div>
          <div className="flex items-center gap-1">
            <h3 className="text-[15px] font-semibold">Interval</h3>
            <button
              onClick={() => setTimePeriod('week')}
              className="px-3 py-1 bg-[#A6A6A6] text-sm text-white"
            >
              Week
            </button>
            <button
              onClick={() => setTimePeriod('month')}
              className="px-3 py-1 bg-[#A6A6A6] text-sm text-white"
            >
              Month
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /> {/* Display all day names */}
            <YAxis type="number" domain={[0, 'auto']} />
            <Tooltip />
            {selectValue.length > 0 &&
              selectValue.map((course, index) => (
                <Line
                  key={index}
                  type="linear"
                  stroke={getColor(index)}
                  data={getData(course.label)}
                  dataKey={metrics}
                  strokeWidth={2}
                  name={course.label}
                />
              ))}
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsInfo;
