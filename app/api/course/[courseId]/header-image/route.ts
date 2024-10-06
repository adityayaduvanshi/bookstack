import { updateCourse } from '@/actions/update-course';
import { uploadHeaderImage } from '@/actions/upload-header';
import { getCurrentUser } from '@/actions/user';
import cloudinary from '@/lib/cloudinary';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    const { courseId } = params;
    if (!courseId) {
      return new NextResponse('Course ID is missing', { status: 400 });
    }
    const formData = await req.formData();
    const file = formData.get('file') as File;

    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');

    const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data;

    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      upload_preset: 'k7tjnpmw',
      folder: 'header',
      unique_filename: true,
    });

    const imageUrl = uploadResponse.secure_url;

    const updateResponse = await uploadHeaderImage(params.courseId, imageUrl);

    if (updateResponse.error) {
      throw new Error(updateResponse.error);
    }
    await updateCourse(params.courseId);
    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
