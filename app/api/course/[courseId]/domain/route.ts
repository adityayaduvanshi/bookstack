import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/user";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseName } = await req.json();

    const domainConfig = await db.website.update({
        where: { courseId: params.courseId },
      data: {
        domain:courseName
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error updating course pricing:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
