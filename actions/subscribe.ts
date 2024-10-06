'use server';
import { db } from '@/lib/db';

export const buyCourseByCourseId = async (values: any, id: string) => {
  try {
    console.log(values);
    const { name, email, time, timezone } = values;
    const existCourse = await db.course.findUnique({ where: { id: id } });
    if (!existCourse) {
      return { error: 'No course found' };
    }
    await db.subscriber.create({
      data: {
        name,
        email,
        deliveryTime: time,
        timezone,
        courseId: existCourse.id,
      },
    });
    return { success: 'Success' };
  } catch (error) {
    return { error: 'Something went wrong!' };
  }
};
