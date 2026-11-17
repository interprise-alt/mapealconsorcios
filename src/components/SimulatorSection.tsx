import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import {
  AttachedSimulationSummary,
  ConsortiumCategory,
  InvestmentProfile,
  SimulatorMode,
} from '../types/consultancy';
import {
  CATEGORY_DEFAULTS,
  INVESTMENT_PROFILES,
  calculateConsortium,
  calculateInvestment,
  formatBRL,
  formatBRLPrecise,
} from '../utils/financialMath';
import { ProjectionChart } from './ProjectionChart';

interface SimulatorSectionProps {
  mode: SimulatorMode;
  onModeChange: (mode: SimulatorMode) => void;
  category: ConsortiumCategory;
  onCategoryChange: (cat: ConsortiumCategory) => void;
  onSendToLeadForm: (summary: AttachedSimulationSummary) => void;
}

export function SimulatorSection({
  mode,
  onModeChange,
  category,
  onCategoryChange,
  onSendToLeadForm,
}: SimulatorSectionProps) {
  // Consortium state
  const catConfig = CATEGORY_DEFAULTS[category];
  const [creditValue, setCreditValue] = useState<number>(catConfig.defaultCredit);
  const [termMonths, setTermMonths] = useState<number>(catConfig.defaultTerm);
  const [adminFeePct, setAdminFeePct] = useState<number>(catConfig.defaultAdminFee);
  const [reserveFundPct, setReserveFundPct] = useState<number>(catConfig.defaultReserveFund);
  const [embeddedBidPct, setEmbeddedBidPct] = useState<number>(15);
  const [halfInstallment, setHalfInstallment] = useState<boolean>(true);
  const prevCategoryRef = useRef<ConsortiumCategory>(category);

  useEffect(() => {
    if (prevCategoryRef.current !== category) {
      prevCategoryRef.current = category;
      const nextCfg = CATEGORY_DEFAULTS[category];
      setCreditValue(nextCfg.defaultCredit);
      setTermMonths(nextCfg.defaultTerm);
      setAdminFeePct(nextCfg.defaultAdminFee);
      setReserveFundPct(nextCfg.defaultReserveFund);
    }
  }, [category]);

  // Investment state
  const [profile, setProfile] = useState<InvestmentProfile>('moderado');
  const [initialDeposit, setInitialDeposit] = useState<number>(120000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(3500);
  const [years, setYears] = useState<number>(10);
  const [annualRatePct, setAnnualRatePct] = useState<number>(
    INVESTMENT_PROFILES.moderado.annualRatePct
  );

  const handleSelectCategory = (nextCat: ConsortiumCategory) => {
    onCategoryChange(nextCat);
    const nextCfg = CATEGORY_DEFAULTS[nextCat];
    setCreditValue(nextCfg.defaultCredit);
    setTermMonths(nextCfg.defaultTerm);
    setAdminFeePct(nextCfg.defaultAdminFee);
    setReserveFundPct(nextCfg.defaultReserveFund);
  };

  const handleSelectProfile = (nextProfile: InvestmentProfile) => {
    setProfile(nextProfile);
    setAnnualRatePct(INVESTMENT_PROFILES[nextProfile].annualRatePct);
  };

  const handleReset = () => {
    if (mode === 'consorcio') {
      const cfg = CATEGORY_DEFAULTS[category];
      setCreditValue(cfg.defaultCredit);
      setTermMonths(cfg.defaultTerm);
      setAdminFeePct(cfg.defaultAdminFee);
      setReserveFundPct(cfg.defaultReserveFund);
      setEmbeddedBidPct(15);
      setHalfInstallment(true);
    } else {
      setProfile('moderado');
      setInitialDeposit(120000);
      setMonthlyContribution(3500);
      setYears(10);
      setAnnualRatePct(INVESTMENT_PROFILES.moderado.annualRatePct);
    }
  };

  const consortiumResult = useMemo(
    () =>
      calculateConsortium({
        category,
        creditValue,
        termMonths,
        adminFeePct,
        reserveFundPct,
        embeddedBidPct,
        halfInstallment,
      }),
    [
      category,
      creditValue,
      termMonths,
      adminFeePct,
      reserveFundPct,
      embeddedBidPct,
      halfInstallment,
    ]
  );

  const investmentResult = useMemo(
    () =>
      calculateInvestment({
        profile,
        initialDeposit,
        monthlyContribution,
        years,
        annualRatePct,
      }),
    [profile, initialDeposit, monthlyContribution, years, annualRatePct]
  );

  const handleAttachToConsultancy = () => {
    if (mode === 'consorcio') {
      onSendToLeadForm({
        mode: 'consorcio',
        title: `Simulação de Consórcio · ${CATEGORY_DEFAULTS[category].label}`,
        details: `Carta de ${formatBRL(creditValue)} em ${termMonths} meses (taxa adm. ${adminFeePct.toFixed(1)}% · lance embutido ${embeddedBidPct}%)`,
        highlightLabel: 'Economia estimada frente ao banco',
        highlightValue: formatBRL(consortiumResult.estimatedSavings),
      });
    } else {
      onSendToLeadForm({
        mode: 'investimento',
        title: `Projeção de Investimento · ${INVESTMENT_PROFILES[profile].label}`,
        details: `Aporte inicial ${formatBRL(initialDeposit)} + ${formatBRL(monthlyContribution)}/mês por ${years} anos a ${annualRatePct.toFixed(2)}% a.a.`,
        highlightLabel: 'Patrimônio projetado',
        highlightValue: formatBRL(investmentResult.finalBalance),
      });
    }
  };

  return (
    <section id="simulador" className="bg-[#FCFAF7] py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Section Header + Mode Segmented Switch */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#E5DBCA] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#87692C]">
              Simulador Comparativo
            </p>
            <h2
              className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#14243B] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Compare o custo real do consórcio e projete seus investimentos.
            </h2>
            <p className="mt-3 text-base text-[#3E597B]">
              Ajuste os parâmetros abaixo para visualizar parcelas, economia frente aos juros bancários e o acúmulo de patrimônio ao longo do tempo.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Modo do simulador"
            className="inline-flex w-full shrink-0 items-center rounded-lg border border-[#DFD6C5] bg-[#F2EBE0] p-1 sm:w-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'consorcio'}
              onClick={() => onModeChange('consorcio')}
              className={`flex-1 rounded-md px-4 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 sm:flex-initial ${
                mode === 'consorcio'
                  ? 'bg-[#1D324E] text-[#FCFAF7] shadow-xs'
                  : 'text-[#294366] hover:text-[#14243B]'
              }`}
            >
              Consórcio Estratégico
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'investimento'}
              onClick={() => onModeChange('investimento')}
              className={`flex-1 rounded-md px-4 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 sm:flex-initial ${
                mode === 'investimento'
                  ? 'bg-[#1D324E] text-[#FCFAF7] shadow-xs'
                  : 'text-[#294366] hover:text-[#14243B]'
              }`}
            >
              Investimento e Juros Compostos
            </button>
          </div>
        </div>

        {/* Simulator Body */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Controls */}
          <div className="rounded-xl border border-[#DFD6C5] bg-[#F8F4EC] p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-center justify-between gap-4 border-b border-[#E5DBCA] pb-4">
              <h3 className="font-editorial text-2xl font-semibold text-[#14243B]">
                {mode === 'consorcio' ? 'Parâmetros da Carta' : 'Parâmetros da Carteira'}
              </h3>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3E597B] transition-colors hover:text-[#14243B]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Restaurar
              </button>
            </div>

            {mode === 'consorcio' ? (
              <div className="mt-6 space-y-6">
                {/* Category Tabs */}
                <div>
                  <span className="block text-xs font-semibold text-[#294366]">
                    Finalidade da Operação
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-lg border border-[#DFD6C5] bg-[#EFE8DA] p-1">
                    {(Object.keys(CATEGORY_DEFAULTS) as ConsortiumCategory[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectCategory(key)}
                        className={`rounded-md px-2 py-2 text-xs font-medium truncate transition-colors duration-150 ${
                          category === key
                            ? 'bg-[#FCFAF7] text-[#14243B] shadow-xs'
                            : 'text-[#3E597B] hover:text-[#14243B]'
                        }`}
                      >
                        {CATEGORY_DEFAULTS[key].label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-[#3E597B]">{catConfig.description}</p>
                </div>

                {/* Credit Value Slider */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <label htmlFor="credit-range" className="text-xs font-semibold text-[#294366]">
                      Valor da Carta de Crédito
                    </label>
                    <span className="font-mono text-base font-medium text-[#14243B] tabular-nums">
                      {formatBRL(creditValue)}
                    </span>
                  </div>
                  <input
                    id="credit-range"
                    type="range"
                    min={catConfig.minCredit}
                    max={catConfig.maxCredit}
                    step={catConfig.stepCredit}
                    value={creditValue}
                    onChange={(e) => setCreditValue(Number(e.target.value))}
                    className="alvorada-slider mt-3"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[11px] text-[#3E597B] tabular-nums">
                    <span>{formatBRL(catConfig.minCredit, true)}</span>
                    <span>{formatBRL(catConfig.maxCredit, true)}</span>
                  </div>
                </div>

                {/* Term Slider */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <label htmlFor="term-range" className="text-xs font-semibold text-[#294366]">
                      Prazo do Grupo
                    </label>
                    <span className="font-mono text-base font-medium text-[#14243B] tabular-nums">
                      {termMonths} meses ({(termMonths / 12).toFixed(1)} anos)
                    </span>
                  </div>
                  <input
                    id="term-range"
                    type="range"
                    min={catConfig.minTerm}
                    max={catConfig.maxTerm}
                    step={6}
                    value={termMonths}
                    onChange={(e) => setTermMonths(Number(e.target.value))}
                    className="alvorada-slider mt-3"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[11px] text-[#3E597B] tabular-nums">
                    <span>{catConfig.minTerm} meses</span>
                    <span>{catConfig.maxTerm} meses</span>
                  </div>
                </div>

                {/* Embedded Bid Slider */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <label htmlFor="bid-range" className="text-xs font-semibold text-[#294366]">
                      Lance Embutido Estratégico
                    </label>
                    <span className="font-mono text-base font-medium text-[#14243B] tabular-nums">
                      {embeddedBidPct}% ({formatBRL(consortiumResult.embeddedBidValue)})
                    </span>
                  </div>
                  <input
                    id="bid-range"
                    type="range"
                    min={0}
                    max={40}
                    step={5}
                    value={embeddedBidPct}
                    onChange={(e) => setEmbeddedBidPct(Number(e.target.value))}
                    className="alvorada-slider mt-3"
                  />
                  <p className="mt-1.5 text-xs text-[#3E597B]">
                    Crédito líquido liberado na contemplação:{' '}
                    <span className="font-mono font-medium text-[#14243B] tabular-nums">
                      {formatBRL(consortiumResult.netCredit)}
                    </span>
                  </p>
                </div>

                {/* Admin & Reserve Fees */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#E5DBCA] pt-4">
                  <div>
                    <label
                      htmlFor="admin-fee"
                      className="block text-xs font-semibold text-[#294366]"
                    >
                      Taxa Adm. Total (%)
                    </label>
                    <input
                      id="admin-fee"
                      type="number"
                      min={8}
                      max={26}
                      step={0.5}
                      value={adminFeePct}
                      onChange={(e) =>
                        setAdminFeePct(Math.min(26, Math.max(8, Number(e.target.value) || 8)))
                      }
                      className="mt-1.5 w-full rounded-md border border-[#D4C6B0] bg-[#FCFAF7] px-3 py-2 font-mono text-sm text-[#14243B] tabular-nums focus:border-[#1D324E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="reserve-fee"
                      className="block text-xs font-semibold text-[#294366]"
                    >
                      Fundo de Reserva (%)
                    </label>
                    <input
                      id="reserve-fee"
                      type="number"
                      min={0}
                      max={5}
                      step={0.5}
                      value={reserveFundPct}
                      onChange={(e) =>
                        setReserveFundPct(Math.min(5, Math.max(0, Number(e.target.value) || 0)))
                      }
                      className="mt-1.5 w-full rounded-md border border-[#D4C6B0] bg-[#FCFAF7] px-3 py-2 font-mono text-sm text-[#14243B] tabular-nums focus:border-[#1D324E] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Half installment toggle */}
                <div className="flex items-center justify-between gap-4 border-t border-[#E5DBCA] pt-4">
                  <div>
                    <p className="text-xs font-semibold text-[#14243B]">
                      Plano Meia Parcela até Contemplação
                    </p>
                    <p className="text-xs text-[#3E597B]">
                      Reduz o desembolso mensal enquanto seu capital rende em renda fixa.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={halfInstallment}
                    onClick={() => setHalfInstallment((prev) => !prev)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-150 ${
                      halfInstallment ? 'bg-[#1D324E]' : 'bg-[#C2D0E0]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-[#FCFAF7] transition-transform duration-150 ${
                        halfInstallment ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                {/* Investment Profile Selector */}
                <div>
                  <span className="block text-xs font-semibold text-[#294366]">
                    Perfil de Alocação
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-2">
                    {(Object.keys(INVESTMENT_PROFILES) as InvestmentProfile[]).map((key) => {
                      const item = INVESTMENT_PROFILES[key];
                      const active = profile === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleSelectProfile(key)}
                          className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-left transition-colors duration-150 ${
                            active
                              ? 'border-[#1D324E] bg-[#DCE4EE]/55 text-[#14243B]'
                              : 'border-[#DFD6C5] bg-[#FCFAF7] text-[#294366] hover:border-[#C4A25D]'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-semibold">{item.label}</p>
                            <p className="text-[11px] text-[#3E597B]">{item.subtitle}</p>
                          </div>
                          <span className="ml-3 font-mono text-xs font-medium text-[#87692C] tabular-nums whitespace-nowrap shrink-0">
                            {item.annualRatePct.toFixed(2)}% a.a.
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Initial Deposit */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <label
                      htmlFor="initial-deposit"
                      className="text-xs font-semibold text-[#294366]"
                    >
                      Aporte Inicial
                    </label>
                    <span className="font-mono text-base font-medium text-[#14243B] tabular-nums">
                      {formatBRL(initialDeposit)}
                    </span>
                  </div>
                  <input
                    id="initial-deposit"
                    type="range"
                    min={10000}
                    max={1000000}
                    step={10000}
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(Number(e.target.value))}
                    className="alvorada-slider mt-3"
                  />
                </div>

                {/* Monthly Contribution */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <label
                      htmlFor="monthly-contribution"
                      className="text-xs font-semibold text-[#294366]"
                    >
                      Aporte Mensal
                    </label>
                    <span className="font-mono text-base font-medium text-[#14243B] tabular-nums">
                      {formatBRL(monthlyContribution)}/mês
                    </span>
                  </div>
                  <input
                    id="monthly-contribution"
                    type="range"
                    min={500}
                    max={30000}
                    step={500}
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="alvorada-slider mt-3"
                  />
                </div>

                {/* Horizon Years */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <label htmlFor="years-range" className="text-xs font-semibold text-[#294366]">
                      Horizonte de Acumulação
                    </label>
                    <span className="font-mono text-base font-medium text-[#14243B] tabular-nums">
                      {years} anos
                    </span>
                  </div>
                  <input
                    id="years-range"
                    type="range"
                    min={3}
                    max={25}
                    step={1}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="alvorada-slider mt-3"
                  />
                </div>

                {/* Annual Return Rate */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <label htmlFor="rate-range" className="text-xs font-semibold text-[#294366]">
                      Rentabilidade Esperada (% ao ano)
                    </label>
                    <span className="font-mono text-base font-medium text-[#14243B] tabular-nums">
                      {annualRatePct.toFixed(2)}% a.a.
                    </span>
                  </div>
                  <input
                    id="rate-range"
                    type="range"
                    min={7}
                    max={18}
                    step={0.25}
                    value={annualRatePct}
                    onChange={(e) => setAnnualRatePct(Number(e.target.value))}
                    className="alvorada-slider mt-3"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Results & Chart */}
          <div className="flex flex-col justify-between rounded-xl border border-[#C2D0E0] bg-[#EEF2F7]/55 p-6 sm:p-8 lg:col-span-7">
            {mode === 'consorcio' ? (
              <>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#C2D0E0] pb-6">
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-[#87692C]">
                        {halfInstallment
                          ? 'Parcela Inicial Reduzida (Meia Parcela)'
                          : 'Parcela Mensal Estimada'}
                      </p>
                      <p className="mt-1 font-mono text-3xl font-medium tracking-tight text-[#14243B] tabular-nums sm:text-4xl">
                        {formatBRLPrecise(consortiumResult.initialInstallment)}
                      </p>
                      {halfInstallment && (
                        <p className="mt-1 text-xs text-[#3E597B]">
                          Parcela integral padrão:{' '}
                          <span className="font-mono tabular-nums font-medium text-[#14243B]">
                            {formatBRLPrecise(consortiumResult.monthlyInstallment)}
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs font-semibold tracking-wide text-[#294366]">
                        Economia Estimada vs. Financiamento
                      </p>
                      <p className="mt-1 font-mono text-2xl font-medium text-[#87692C] tabular-nums sm:text-3xl">
                        {formatBRL(consortiumResult.estimatedSavings)}
                      </p>
                      <p className="mt-1 text-xs text-[#3E597B]">
                        Redução de{' '}
                        <span className="font-mono font-semibold text-[#14243B] tabular-nums">
                          {consortiumResult.savingsPct.toFixed(0)}%
                        </span>{' '}
                        no desembolso total
                      </p>
                    </div>
                  </div>

                  {/* Clean tabular comparison rows */}
                  <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-[#3E597B]">Custo Total do Consórcio</p>
                      <p className="mt-1 font-mono text-lg font-medium text-[#14243B] tabular-nums">
                        {formatBRL(consortiumResult.totalCost)}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-[#3E597B] tabular-nums">
                        ~{consortiumResult.effectiveAnnualCostPct.toFixed(2)}% a.a. equivalente
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#3E597B]">Financiamento Bancário</p>
                      <p className="mt-1 font-mono text-lg font-medium text-[#294366] tabular-nums">
                        {formatBRL(consortiumResult.bankTotalCost)}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-[#3E597B] tabular-nums">
                        Parcela média {formatBRL(consortiumResult.bankMonthlyInstallment)} ({consortiumResult.bankAnnualRatePct.toFixed(1)}% a.a.)
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#3E597B]">Crédito Líquido na Mão</p>
                      <p className="mt-1 font-mono text-lg font-medium text-[#14243B] tabular-nums">
                        {formatBRL(consortiumResult.netCredit)}
                      </p>
                      <p className="mt-0.5 text-xs text-[#3E597B]">
                        Após lance embutido de {embeddedBidPct}%
                      </p>
                    </div>
                  </div>

                  <ProjectionChart
                    title="Desembolso Acumulado ao Longo do Prazo"
                    primaryLabel="Consórcio Mapeal · NS"
                    secondaryLabel="Financiamento Bancário"
                    data={consortiumResult.chartSeries.map((pt) => ({
                      label: pt.label,
                      primaryValue: pt.consortiumPaid,
                      secondaryValue: pt.bankPaid,
                    }))}
                  />
                </div>

                <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#C2D0E0] pt-5 sm:flex-row sm:items-center">
                  <p className="text-xs text-[#3E597B]">
                    Simulação base sem atualização anual de índice. Na consultoria, analisamos histórico de lances reais por grupo.
                  </p>
                  <button
                    type="button"
                    onClick={handleAttachToConsultancy}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1D324E] px-5 py-3 text-xs font-semibold text-[#FCFAF7] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#294366] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5833E]"
                  >
                    Levar Simulação para Consultoria
                    <ArrowRight className="h-4 w-4 text-[#DEC796]" aria-hidden="true" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#C2D0E0] pb-6">
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-[#87692C]">
                        Patrimônio Projetado em {years} Anos
                      </p>
                      <p className="mt-1 font-mono text-3xl font-medium tracking-tight text-[#14243B] tabular-nums sm:text-4xl">
                        {formatBRL(investmentResult.finalBalance)}
                      </p>
                      <p className="mt-1 text-xs text-[#3E597B]">
                        Rendimento composto acumulado:{' '}
                        <span className="font-mono font-medium text-[#14243B] tabular-nums">
                          +{formatBRL(investmentResult.totalYield)}
                        </span>
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs font-semibold tracking-wide text-[#294366]">
                        Renda Passiva Mensal Estimada
                      </p>
                      <p className="mt-1 font-mono text-2xl font-medium text-[#87692C] tabular-nums sm:text-3xl">
                        {formatBRL(investmentResult.monthlyPassiveIncome)}/mês
                      </p>
                      <p className="mt-1 text-xs text-[#3E597B]">
                        Estimativa sustentável no horizonte final
                      </p>
                    </div>
                  </div>

                  <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-[#3E597B]">Total Investido do Bolso</p>
                      <p className="mt-1 font-mono text-lg font-medium text-[#14243B] tabular-nums">
                        {formatBRL(investmentResult.totalContributed)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#3E597B]">Juros sobre Juros</p>
                      <p className="mt-1 font-mono text-lg font-medium text-[#87692C] tabular-nums">
                        +{formatBRL(investmentResult.totalYield)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#3E597B]">Multiplicador de Capital</p>
                      <p className="mt-1 font-mono text-lg font-medium text-[#14243B] tabular-nums">
                        {(
                          investmentResult.finalBalance /
                          Math.max(1, investmentResult.totalContributed)
                        ).toFixed(2)}
                        x
                      </p>
                    </div>
                  </div>

                  <ProjectionChart
                    title="Evolução Patrimonial vs. Total Aportado"
                    primaryLabel="Patrimônio Acumulado"
                    secondaryLabel="Total Aportado"
                    data={investmentResult.chartSeries.map((pt) => ({
                      label: pt.label,
                      primaryValue: pt.balance,
                      secondaryValue: pt.contributed,
                    }))}
                  />
                </div>

                <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#C2D0E0] pt-5 sm:flex-row sm:items-center">
                  <p className="text-xs text-[#3E597B]">
                    Podemos combinar esta carteira com cartas contempladas para acelerar o retorno líquido.
                  </p>
                  <button
                    type="button"
                    onClick={handleAttachToConsultancy}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1D324E] px-5 py-3 text-xs font-semibold text-[#FCFAF7] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#294366] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5833E]"
                  >
                    Levar Projeção para Consultoria
                    <ArrowRight className="h-4 w-4 text-[#DEC796]" aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
