import { getCurrentUser } from '@/actions/user';
import cloudinary from '@/lib/cloudinary';
import { useSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const formData = await req.formData();
    const file = formData.get('file') as File;

    const fileBuffer = await file.arrayBuffer();

    const mimeType = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');

    // this will be used to upload the file
    const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data;

    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      upload_preset: 'k7tjnpmw',
      folder: 'websites',
      unique_filename: true,
    });

    return NextResponse.json(
      { url: uploadResponse.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
