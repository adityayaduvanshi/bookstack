import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const DashboardHeader = () => {
  return (
    <div className="grid  mx-4 grid-cols-3 space-x-3 ">
      <Card className="ml-2  max-w-s p-4 h-30 border-2 border-dark-600">
        <CardHeader>
          <p className="font-bold text-sm">Create subscriptions</p>
          <div className="flex justify-between">
            <CardTitle className="text-2xl">10K</CardTitle>
            <h6 className="text-xl font-semibold">+ 500</h6>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-sm">Subscriptions</p>
            <h6 className="text-l font-semibold">last 1 month</h6>
          </div>
        </CardHeader>
      </Card>

      <Card className="  max-w-s p-4">
        <CardHeader>
          <p className="font-bold text-sm">Subscribers</p>
          <div className="flex justify-between">
            <CardTitle className="text-2xl">2.5k</CardTitle>
            <h6 className="text-xl font-semibold">+ 50</h6>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-sm">Subscribers</p>
            <h6 className="text-l font-semibold">last 1 month</h6>
          </div>
        </CardHeader>
      </Card>

      <Card className="  max-w-s p-4">
        <CardHeader>
          <p className="font-bold mr-10 text-sm">Monetization</p>
          <div className="flex justify-between">
            <CardTitle className="text-2xl">$25k</CardTitle>
            <h6 className="text-xl font-semibold">+ $1k</h6>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-sm">Revenue</p>
            <h6 className="text-l font-semibold">last 1 month</h6>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DashboardHeader;
