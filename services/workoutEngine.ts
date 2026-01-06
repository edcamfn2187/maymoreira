import { exercises } from "../data/exercises";

type Params = {
  goal: string;
  level: string;
  duration: number;
};

export function generateWorkout({ goal, level, duration }: Params) {
  const sets = level === "iniciante" ? 3 : level === "intermediario" ? 4 : 5;
  const reps =
    goal === "strength"
      ? "6–8"
      : goal === "hypertrophy"
      ? "8–12"
      : "12–15";

  const selectedExercises = [
    ...exercises.peito.slice(0, 1),
    ...exercises.costas.slice(0, 1),
    ...exercises.pernas.slice(0, 1),
    ...exercises.ombro.slice(0, 1),
    ...exercises.bracos.slice(0, 1),
  ];

  return {
    title: "Treino Full Body",
    duration: `${duration} minutos`,
    exercises: selectedExercises.map((name) => ({
      name,
      sets,
      reps,
      rest: "60–90s",
    })),
  };
}
