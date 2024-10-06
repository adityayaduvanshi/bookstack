import { db } from '@/lib/db';

export const getCoursesByUserId = async (id: string) => {
  try {
    if (!id) {
      console.log('invalid user');
    }

    return await db.course.findMany({
      where: {
        userId: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
