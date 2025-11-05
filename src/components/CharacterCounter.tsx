
import React, { useCallback, useState } from "react";

export interface CharacterCounterProps {
  minWords?: number;
  maxWords?: number;
  targetReadingTime?: number; // in minutes
}

const DEFAULT_WPM = 200;

function getWordCount(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
}

function formatMinutes(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return "0s";
  const totalSeconds = Math.round(minutes * 60);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m} min`;
  return `${m} min ${s}s`;
}

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  minWords = 0,
  maxWords = 100,
  targetReadingTime = 10,
}) => {

  const [text, setText] = useState<string>("");

  const wordCount = getWordCount(text);
  const characterCount = text.length;
  const readingTimeMinutes = DEFAULT_WPM > 0 ? wordCount / DEFAULT_WPM : 0;
  const percentage =
    maxWords > 0 ? Math.min(100, Math.round((wordCount / maxWords) * 100)) : 0;
  const meetsTimeTarget = readingTimeMinutes >= targetReadingTime;

  
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value ?? ""),
    []
  );
 
  return (
    <section className="max-w-3xl w-full mx-auto p-4 space-y-3 text-slate-100">
      <h3 className="text-2xl font-black">Character Counter</h3>

      <section
        aria-label="Text statistics"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <Stat label="Characters" value={characterCount} />
        <Stat label="Words" value={wordCount} />
        <Stat label="Reading time" value={formatMinutes(readingTimeMinutes)} />
      </section>

      <section
        aria-label="Word goal progress"
        className="rounded-xl border border-slate-700 bg-slate-800/60 p-3"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium"></span>
          <span className="text-slate-400 text-sm">
            {wordCount}/{maxWords} words {}
          </span>
        </div>
        <div
          className="w-full h-3 rounded-full border border-slate-700 bg-slate-900 overflow-hidden"
          role="progressbar"
          aria-valuemin={25}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-[width] duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </section>
    </section>
  );
};

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 transition-[transform,box-shadow] duration-150 hover:shadow-md hover:-translate-y-0.5">
      <span className="block text-xs text-slate-400">{label}</span>
      <span className="block text-2xl font-extrabold">{value}</span>
    </div>
  );
}

export default CharacterCounter;
