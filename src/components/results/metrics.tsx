type MetricPillProps = {
  label: string;

  value: string;
};

export function MetricPill({
  label,
  value,
}: MetricPillProps) {
  return (
    <div className="rounded-full border border-white/10 bg-zinc-900 px-5 py-3">

      <p className="text-sm text-white/40">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold">
        {value}
      </p>

    </div>
  );
}