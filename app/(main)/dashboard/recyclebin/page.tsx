import { getCurrentUser } from "@/actions/user";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { db } from "@/lib/db";
import { RecycleBinDataTable } from "@/app/(main)/dashboard/recyclebin/_components/recycledatatable";
import { RecycleBinColumn } from "./_components/columns";

const RecycleBinPage = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }
  const user = await getCurrentUser();

  const getUserCouses = await db.course.findMany({
    where: { userId: user?.id, trash: true },
    include: { website: true },
    orderBy: { updatedAt: "desc" },
  });
  return (
    <div>
      <RecycleBinDataTable columns={RecycleBinColumn} data={getUserCouses} />
    </div>
  );
};

export default RecycleBinPage;
