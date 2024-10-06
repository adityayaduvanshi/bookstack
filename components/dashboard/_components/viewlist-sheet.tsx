import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PiExportThin } from "react-icons/pi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const ViewListSheet = () => {
    

  const tableData = [

    
    {
      name: "John Doe",
      email: "john.doe@example.com",
      status: "Completed",
      startDate: "24 June 2024",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "In Progress",
      startDate: "24 June 2024",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      status: "Pause",
      startDate: "24 June 2024",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      status: "Completed",
      startDate: "24 June 2024",
    },
    {
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      status: "In Progress",
      startDate: "24 June 2024",
    },
    {
      name: "Eva Green",
      email: "eva.green@example.com",
      status: "Pause",
      startDate: "24 June 2024",
    },
    {
      name: "Frank Harris",
      email: "frank.harris@example.com",
      status: "Completed",
      startDate: "24 June 2024",
    },
    {
      name: "Grace Lee",
      email: "grace.lee@example.com",
      status: "In Progress",
      startDate: "24 June 2024",
    },
    {
      name: "Henry King",
      email: "henry.king@example.com",
      status: "Pause",
      startDate: "24 June 2024",
    },
    {
      name: "Irene Moore",
      email: "irene.moore@example.com",
      status: "Completed",
      startDate: "24 June 2024",
    },
  ];

  return (
    <div>
      <Sheet>
        <SheetTrigger className="text-blue-600 hover:underline">
          (view list)
        </SheetTrigger>
        <SheetContent className="min-w-[50vw]">
          <div className="flex justify-between pr-10">
            <SheetTitle className=" text-xl">
              Subscribe | Course-1
            </SheetTitle>
            <button className="text-sm flex gap-1 font-normal">
              Export List
              <PiExportThin size={18} />
            </button>
          </div>
          <div className="py-8 flex items-center justify-between  border-b-2 border-black">
            <div>
              <h1 className="text-lg font-semibold">15674</h1>
              <p className="text-sm">Subscriptions</p>
            </div>
            <p className="text-sm bg-blue-100 px-2 py-1 rounded mr-7"><span className="font-semibold">80%</span> completed</p>
            <p className="text-sm bg-green-100 px-2 py-1 rounded  mr-10"><span className="font-semibold">10% </span> in progress</p>
            <p className="text-sm bg-slate-300 px-2 py-1 rounded mr-14"><span className="font-semibold">5%</span> pause</p>
          </div>
          <div className="max-h-[calc(100vh-160px)] overflow-y-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm font-bold text-black">
                    Name
                  </TableHead>
                  <TableHead className="text-sm font-bold text-black">
                    Email
                  </TableHead>
                  <TableHead className="text-sm font-bold text-black">
                    Status
                  </TableHead>
                  <TableHead className="text-sm font-bold text-black pl-14">
                    Start Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((table, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs font-normal text-nowrap text-black">
                      {table.name}
                    </TableCell>
                    <TableCell className="text-xs font-normal text-black">
                      {table.email}
                    </TableCell>
                    <TableCell
                      className={`text-xs font-normal text-nowrap ${
                        table.status === "Completed"
                          ? "text-blue-500"
                          : table.status === "In Progress"
                          ? "text-green-500"
                          : "text-slate-600"
                      }`}
                    >
                      {table.status}
                    </TableCell>
                    <TableCell className="text-xs font-normal text-black text-nowrap pl-14">
                      {table.startDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ViewListSheet;
