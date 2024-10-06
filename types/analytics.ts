export interface TCourse {
  id: string;
  title: string;
  description: string;
  userId: string;
  header?: string | boolean;
  published: string;
  createdAt: string;
  updatedAt: string;
}

export interface TAnalytics {
  courseName?: string;
  earnings: number;
  subscribers: number;
  subescription: number;
}

export type TSelect = {
  label: string;
  value: string;
};
