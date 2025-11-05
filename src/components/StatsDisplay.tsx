

export interface TextStats {
  characterCount: number;
  wordCount: number;
  readingTime: number; // in minutes
}
 
export interface StatsDisplayProps {
  stats: TextStats;
  showReadingTime?: boolean;
}

function formatMinutes(mins: number) {
  if (!Number.isFinite(mins) || mins <= 0) return "0s";
  const totalSeconds = Math.round(mins * 60);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m} min`;
  return `${m} min ${s}s`;
}

const Stat: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 transition-[transform,box-shadow] duration-150 hover:shadow-md hover:-translate-y-0.5">
    <span className="block text-xs text-slate-400">{label}</span>
    <span className="block text-2xl font-extrabold">{value}</span>
  </div>
);

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, showReadingTime = true }) => {
  const { characterCount, wordCount, readingTime } = stats;

  return (
    <section
      aria-label="Text statistics"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-3"
    >
      <Stat label="Characters" value={characterCount} />
      <Stat label="Words" value={wordCount} />
      {showReadingTime && <Stat label="Reading time" value={formatMinutes(readingTime)} />}
    </section>
  );
};

export default StatsDisplay;