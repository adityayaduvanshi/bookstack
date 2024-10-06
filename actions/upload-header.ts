'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from './user';


export const uploadHeaderImage = async (courseId: string, imgUrl: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: 'Unauthorized' };
    }

    const findCourse = await db.course.findUnique({ where: { id: courseId } });
    if (!findCourse) {
      return { error: 'Course not found' };
    }

    await db.course.update({
      where: { id: courseId },
      data: { pinterest: imgUrl },
    });

    return { success: 'Success' };
  } catch (error) {
    console.error('Error updating course:', error);
    return { error: 'Database update failed' };
  }
};
