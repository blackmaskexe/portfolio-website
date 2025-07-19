"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ExerciseGraph({
  exercise,
  onBack,
}: {
  exercise: { name: string; data: { date: string; weight: number }[] };
  onBack: () => void;
}) {
  return (
    <div className="bg-gray-50 h-full w-full flex flex-col">
      {/* Progress Title */}
      <div className="px-4 pt-6 pb-2 text-gray-700 font-semibold">
        Progress - July 2025
      </div>
      {/* Graph Card */}
      <div className="mx-4 bg-white rounded-2xl p-4 shadow border border-gray-100">
        <svg width="100%" height="180" viewBox="0 0 320 180">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={0}
              y1={30 + i * 30}
              x2={320}
              y2={30 + i * 30}
              stroke="#e5e7eb"
              strokeDasharray="4"
            />
          ))}
          {/* Y axis labels */}
          {[186, 183, 181, 178, 176].map((w, i) => (
            <text key={w} x={10} y={35 + i * 30} fontSize="12" fill="#666">
              {w} lbs
            </text>
          ))}
          {/* X axis labels */}
          {exercise.data.map((d, i) => (
            <text
              key={d.date}
              x={40 + i * 90}
              y={170}
              fontSize="12"
              fill="#666"
            >
              {d.date.slice(5)}
            </text>
          ))}
          {/* Area under curve */}
          <polygon
            fill="#3b82f6"
            fillOpacity="0.15"
            points={
              exercise.data
                .map((d, i) => `${40 + i * 90},${160 - (d.weight - 176) * 6}`)
                .join(" ") + ` 310,160 40,160`
            }
          />
          {/* Line graph */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            points={exercise.data
              .map((d, i) => `${40 + i * 90},${160 - (d.weight - 176) * 6}`)
              .join(" ")}
          />
          {/* Dots */}
          {exercise.data.map((d, i) => (
            <circle
              key={d.date}
              cx={40 + i * 90}
              cy={160 - (d.weight - 176) * 6}
              r="6"
              fill="#3b82f6"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
