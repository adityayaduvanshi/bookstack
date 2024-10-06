import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Course } from "@prisma/client";
import Link from "next/link";
import { EllipsisVerticalIcon } from "lucide-react";

interface DashboardTableProps {
  courses: Course[];
}
const DashboardTable = ({ courses }: DashboardTableProps) => {
  // to get user details in client component

  return (
    <>
      <Table className=" mt-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Subscriptions</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell
                className={`${
                  course.published ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {course.published ? "Published" : "Unpublish"}
                {course.published}
              </TableCell>
              <TableCell>{course.createdAt.toISOString()}</TableCell>
              <TableCell>{course.updatedAt.toISOString()}</TableCell>
              <TableCell>
                <Link href={`/course/${course.id}`}>
                  <EllipsisVerticalIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DashboardTable;
