export type ExerciseVideo = {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  allowedPlans?: string[];
};


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
