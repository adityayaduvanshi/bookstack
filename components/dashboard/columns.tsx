'use client';
import { Course, Subscriber, Website } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import moment from 'moment';
import { Badge } from '../ui/badge';
import DatatableActions from './data-table-actions';
import Link from 'next/link';
import ViewListSheet from './_components/viewlist-sheet';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const formatDateTime = (dateTime: string | null) => {
  if (!dateTime) return 'N/A';

  return moment(dateTime).fromNow();
};
export const courseColumn: ColumnDef<
  Course & { website: Website | null; _count: { subscriber: number } }
>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <div className=" w-[20rem]  overflow-hidden truncate">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <Link href={`/course/${row.original.id}`} className=" hover:underline">
        {row.original.title}
      </Link>
    ),
  },
  {
    // accessorKey: 'subscription',
    header: 'Subscriptions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original._count.subscriber}
        {''}
        {row.original._count.subscriber > 0 && <ViewListSheet />}
      </div>
    ),
  },

  // {
  //   accessorKey: 'revenue',
  //   header: 'Revenue',
  //   cell: ({ row }) => '$220',
  // },

  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) =>
      row.original.published ? (
        <Badge>Published</Badge>
      ) : (
        <Badge variant="destructive">Draft</Badge>
      ),
  },

  // {
  //   accessorKey: 'website',
  //   header: 'Domain',
  //   cell: ({ row }) =>
  //     row.original.website ? row.original.website.domain : 'N/A',
  // },

  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Last modified
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatDateTime(row.original.updatedAt.toISOString()),
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const course = row.original;

      return (
        <div className=" flex gap-2 items-center">
          <Link
            href={`/course/${course.id}`}
            className=" cursor-pointer"
            target="_blank"
          >
            <ExternalLink className="  h-5 w-5" />
          </Link>
          <DatatableActions initialTitle={course.title} courseId={course.id} />
        </div>
      );
    },
  },
];
