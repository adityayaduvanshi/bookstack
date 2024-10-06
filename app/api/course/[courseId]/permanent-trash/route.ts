import { getCurrentUser } from "@/actions/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.deleteMany({
      where: {
        courseId: params.courseId,
      },
    });

   const websiteExist= await db.website.findUnique({
    where:{
        courseId: params.courseId
    }
   })
if (websiteExist){

    const website = await db.website.delete({
        where: {
          id:websiteExist.id
        },
      });
}

    const course = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
