import { getCurrentUser } from "@/actions/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await req.json();
    if (!title || typeof title !== "string") {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const course = await db.course.update({
      where: { id: params.courseId },
      data: { title },
    });

    return NextResponse.json("Course renamed successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
