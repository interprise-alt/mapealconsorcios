interface TactileSliderProps {
  id: string;
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
}

export function TactileSlider({
  id,
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  minLabel,
  maxLabel,
  onChange,
}: TactileSliderProps) {
  const ticks = 11;

  return (
    <div className="rounded-xl border border-[#DED7CE] bg-[#EFEAE2]/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-xs font-semibold text-[#294366]">
          {label}
        </label>
        <span className="font-mono text-sm font-semibold text-[#14243B] tabular-nums">
          {valueLabel}
        </span>
      </div>

      <div className="mt-3">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="tactile-range"
        />

        {/* Physical graduated ruler ticks inspired by tactile hardware controls */}
        <div
          aria-hidden="true"
          className="mt-2 flex items-center justify-between px-1.5"
        >
          {Array.from({ length: ticks }).map((_, idx) => (
            <span
              key={idx}
              className={`block w-px ${
                idx === 0 || idx === 5 || idx === ticks - 1
                  ? 'h-2.5 bg-[#5B7083]/60'
                  : 'h-1.5 bg-[#5B7083]/30'
              }`}
            />
          ))}
        </div>
      </div>

      {(minLabel || maxLabel) && (
        <div className="mt-1.5 flex justify-between font-mono text-[11px] text-[#4E6478] tabular-nums">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
