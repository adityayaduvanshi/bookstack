export interface Chapter {
  id: string;
  title: string;
  content: string | null;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  chapters: Chapter[];
}
