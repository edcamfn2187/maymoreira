
import { ExerciseVideo } from './types';
import mayaraBg from "./assets/bg-home.png";

export const VIDEOS: ExerciseVideo[] = [
  {
    id: '1',
    title: 'Mobilidade de Quadril',
    category: 'Alongamento',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '5:45',
    description: 'Essencial para melhorar a amplitude de movimento e prevenir lesões.'
  },
  {
    id: '2',
    title: 'Agachamento com Salto',
    category: 'funcional',
    thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '2:10',
    description: 'Pliometria para explosão muscular e queima calórica intensa.'
  },
  {
    id: '3',
    title: 'Flexão de Braços',
    category: 'Alongamento',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3:20',
    description: 'Fortalecimento de peitoral, ombros e tríceps com o peso do corpo.'
  },
  {
    id: '4',
    title: 'Escalador (Mountain Climbers)',
    category: 'funcional',
    thumbnail: 'https://images.unsplash.com/photo-1517838276537-8224b80adbd1?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1:00',
    description: 'Trabalho de core dinâmico com alta demanda cardiovascular.'
  },
  {
    id: '5',
    title: 'Stiff Unilateral',
    category: 'Mat Pilates',
    thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '4:00',
    description: 'Equilíbrio e força para a cadeia posterior.'
  }
];

export const VIDEO_CATEGORIES = [
  "Todos",
  "Alongamento",
  "Funcional",
  "Mat Pilates",
  "Mobilidade",
  "Força",
  "Cardio",
];


export const PERSONAL_INFO = {
  name: "Mayara Moreira Vieira",
  specialty: "Especialista em treinamento",
  bio:
    "Minha missão é transformar vidas através do movimento consciente. Desenvolvo protocolos personalizados que unem ciência e motivação para que você atinja sua melhor versão, com saúde e longevidade.",
  photoUrl: mayaraBg,
};
