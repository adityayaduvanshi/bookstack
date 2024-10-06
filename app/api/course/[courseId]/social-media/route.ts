import { getCurrentUser } from "@/actions/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  pinterest?: string;
  personalWebsite?: string;
  discord?: string;
  stack?: string;
  github?: string;
  medium?: string;
}

type SocialMediaKey = keyof SocialMediaLinks;

export async function PUT(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const socialMediaLinks: SocialMediaLinks = await req.json();

    const updatedFields: Partial<Record<SocialMediaKey, string>> = {};

    for (const [key, value] of Object.entries(socialMediaLinks)) {
      if (value !== undefined && value !== '') {
        updatedFields[key as SocialMediaKey] = value;
      }
    }

    console.log(`Updating course with ID: ${params.courseId} with data: `, updatedFields);

    const course = await db.course.update({
      where: { id: params.courseId },
      data: updatedFields,
    });

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.error("Error updating course social media links:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
