"use client";
import { ExerciseGraph } from "./exercise-graph";

const exercises = [
  {
    name: "Bench Press",
    data: [
      { date: "2025-07-01", weight: 100 },
      { date: "2025-07-08", weight: 105 },
      { date: "2025-07-15", weight: 110 },
    ],
  },
  {
    name: "Squat",
    data: [
      { date: "2025-07-01", weight: 140 },
      { date: "2025-07-08", weight: 145 },
      { date: "2025-07-15", weight: 150 },
    ],
  },
  {
    name: "Deadlift",
    data: [
      { date: "2025-07-01", weight: 180 },
      { date: "2025-07-08", weight: 185 },
      { date: "2025-07-15", weight: 190 },
    ],
  },
];

export function GraphsTab({
  onExerciseSelect,
}: {
  onExerciseSelect: (exercise: {
    name: string;
    data: { date: string; weight: number }[];
  }) => void;
}) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Exercises</h2>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {exercises.map((e) => (
          <button
            key={e.name}
            className="p-4 rounded-xl shadow-lg border border-gray-200 bg-white text-left font-semibold text-gray-900 transition hover:shadow-2xl hover:bg-blue-50"
            onClick={() => onExerciseSelect(e)}
          >
            {e.name}
          </button>
        ))}
      </div>
    </div>
  );
}
