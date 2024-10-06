"use client";

import { Course, Website } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecycleDatatableActions from "./datatableaction";
import moment from "moment";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


const formatDateTime = (dateTime: string | null) => {
  if (!dateTime) return 'N/A';
  return moment(dateTime).format('MMMM Do YYYY, h:mm A');
};

export const RecycleBinColumn: ColumnDef<
  Course & { website: Website | null }
>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Deleted",
    cell: ({ row }) => {
      const deletedDate = row.original.updatedAt;
      return <span>{formatDateTime(deletedDate.toISOString())}</span>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return <RecycleDatatableActions courseId={course.id} />;
    },
  },
];
