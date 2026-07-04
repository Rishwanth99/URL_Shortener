type MetricCardProps = {
  label: string;
  value: number;
  fullWidth?: boolean;
};

export function MetricCard({ label, value, fullWidth = false }: MetricCardProps) {
  return (
    <div className={`rounded-lg border border-slate-200 p-4 ${fullWidth ? 'col-span-2' : ''}`}>
      <span className="mb-1 block text-sm text-slate-500">{label}</span>
      <strong className="text-3xl">{value}</strong>
    </div>
  );
}
