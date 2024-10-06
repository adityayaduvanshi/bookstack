'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from './user';

export const getDeletedChapters = async (courseId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: 'Unauthorized' };
    }

    const course = await db.course.findUnique({
      where: { id: courseId },
      include: { history: true },
    });

    if (!course) {
      return { error: 'Course not found' };
    }

    if (course.userId !== user.id) {
      return {
        error: "You don't have permission to view this course's history",
      };
    }

    const deletedChapters = await db.chapter.findMany({
      where: { courseId: courseId, isDeleted: true },
    });

    return { success: true, data: deletedChapters };
  } catch (error) {
    console.error('Error fetching course history:', error);
    return { error: 'An unexpected error occurred' };
  }
};
