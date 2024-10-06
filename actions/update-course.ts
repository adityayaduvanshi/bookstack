'use server';

import { db } from '@/lib/db';

export const updateCourse = async (courseId: string) => {
  try {
    await db.course.update({
      where: { id: courseId },
      data: { updatedAt: new Date() },
    });
  } catch (error) {
    console.error('Failed to update course', error);
  }
};
