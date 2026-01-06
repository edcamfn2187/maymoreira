export interface ExerciseVideo {
  id: string;
  title: string;
  category: string;
  description?: string;
  duration?: string;
  thumbnail?: string;
  video_url: string; 
  created_at?: string;
}



export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  notes: string;
};

export type Plan = {
  id: string;
  name: string;
  price: string;
  description: string;
};
