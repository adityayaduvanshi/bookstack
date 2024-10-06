import { db } from '@/lib/db';

export const getChaptersByCourseId = async (id: string) => {
  try {
    if (!id) {
      console.log('invalid user');
    }

    return await db.chapter.findMany({
      where: {
        courseId: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createChapter = async (id: string) => {
  try {
    const create = await db.chapter.create({
      data: {
        title: 'Untitled',
        courseId: id,
        order: 1,
        content:
          '<h1>Chapter 1: Introduction</h1><p>This is the <strong>HTML</strong> content for Chapter 1.</p>',
      },
    });
    return create;
  } catch (error) {
    console.log(error);
  }
};
