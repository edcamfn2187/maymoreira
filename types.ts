export interface ExerciseVideo {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  duration?: string | null;
  thumbnail?: string | null;
  video_url: string;
  allowed_plans?: string[] | null;
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


export type Anamnese = {
  id: string;
  name: string;
  email: string | null; 
  age: string | null;
  height: string | null;
  weight: string | null;
  objective: string | null;
  experience: string | null;
  injuries: string | null;
  limitations: string | null;
  availability: string | null;
  created_at: string;
};
