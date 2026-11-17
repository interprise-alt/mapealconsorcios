import { useState } from 'react';
import { formatBRL } from '../utils/financialMath';

interface SeriesPoint {
  label: string;
  primaryValue: number;
  secondaryValue: number;
}

interface ProjectionChartProps {
  data: SeriesPoint[];
  primaryLabel: string;
  secondaryLabel: string;
  primaryColor?: string;
  secondaryColor?: string;
  title: string;
}

export function ProjectionChart({
  data,
  primaryLabel,
  secondaryLabel,
  primaryColor = '#1D324E',
  secondaryColor = '#6E8579',
  title,
}: ProjectionChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 640;
  const height = 225;
  const padLeft = 66;
  const padRight = 18;
  const padTop = 18;
  const padBottom = 32;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const maxVal = Math.max(
    1,
    ...data.flatMap((d) => [d.primaryValue, d.secondaryValue])
  );

  const getX = (idx: number) =>
    data.length <= 1 ? padLeft : padLeft + (idx / (data.length - 1)) * plotW;

  const getY = (val: number) => padTop + plotH - (val / maxVal) * plotH;

  const primaryPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(d.primaryValue).toFixed(1)}`)
    .join(' ');

  const secondaryPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(d.secondaryValue).toFixed(1)}`)
    .join(' ');

  const primaryArea = `${primaryPath} L ${getX(data.length - 1).toFixed(1)} ${(padTop + plotH).toFixed(1)} L ${getX(0).toFixed(1)} ${(padTop + plotH).toFixed(1)} Z`;

  const yTicks = [0, 0.33, 0.66, 1].map((ratio) => ({
    value: maxVal * ratio,
    y: padTop + plotH - ratio * plotH,
  }));

  const activeIndex = hoveredIdx !== null ? hoveredIdx : data.length - 1;
  const activePoint = data[activeIndex];

  return (
    <div>
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <p className="text-xs font-semibold tracking-wide text-[#294366]">{title}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#3E597B]">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-xs"
              style={{ backgroundColor: primaryColor }}
            />
            {primaryLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-xs"
              style={{ backgroundColor: secondaryColor }}
            />
            {secondaryLabel}
          </span>
        </div>
      </div>

      {activePoint && (
        <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#3E597B]">
          <span className="font-semibold text-[#14243B]">Ponto: {activePoint.label}</span>
          <span className="font-mono tabular-nums text-[#1D324E]">
            {primaryLabel}: {formatBRL(activePoint.primaryValue)}
          </span>
          <span className="font-mono tabular-nums text-[#53695D]">
            {secondaryLabel}: {formatBRL(activePoint.secondaryValue)}
          </span>
        </div>
      )}

      <div className="mt-2 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full select-none"
          role="img"
          aria-label={title}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="tactileAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.16" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {yTicks.map((tick, idx) => (
            <g key={idx}>
              <line
                x1={padLeft}
                x2={width - padRight}
                y1={tick.y}
                y2={tick.y}
                stroke="#D6CFC6"
                strokeDasharray={idx === 0 ? undefined : '3 3'}
                strokeWidth="1"
              />
              <text
                x={padLeft - 10}
                y={tick.y + 4}
                textAnchor="end"
                className="fill-[#3E597B] text-[10px]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {formatBRL(tick.value, true)}
              </text>
            </g>
          ))}

          <path d={primaryArea} fill="url(#tactileAreaFill)" />

          <path
            d={secondaryPath}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2.25"
            strokeDasharray="5 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={primaryPath}
            fill="none"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.map((point, idx) => {
            const x = getX(idx);
            const y1 = getY(point.primaryValue);
            const y2 = getY(point.secondaryValue);
            const isActive = idx === activeIndex;
            const showLabel =
              data.length <= 8 ||
              idx === 0 ||
              idx === data.length - 1 ||
              idx % Math.ceil(data.length / 6) === 0;

            return (
              <g key={point.label}>
                {isActive && (
                  <line
                    x1={x}
                    x2={x}
                    y1={padTop}
                    y2={padTop + plotH}
                    stroke="#B6AEA4"
                    strokeWidth="1"
                  />
                )}

                <circle
                  cx={x}
                  cy={y2}
                  r={isActive ? 4.5 : 2.5}
                  fill="#F7F4EE"
                  stroke={secondaryColor}
                  strokeWidth="2"
                />
                <circle
                  cx={x}
                  cy={y1}
                  r={isActive ? 5 : 3}
                  fill={primaryColor}
                  stroke="#F7F4EE"
                  strokeWidth="1.5"
                />

                {showLabel && (
                  <text
                    x={x}
                    y={height - 10}
                    textAnchor="middle"
                    className="fill-[#3E597B] text-[10px]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {point.label}
                  </text>
                )}

                <rect
                  x={x - plotW / Math.max(data.length * 2, 2)}
                  y={padTop}
                  width={plotW / Math.max(data.length, 1)}
                  height={plotH + 20}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onFocus={() => setHoveredIdx(idx)}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
