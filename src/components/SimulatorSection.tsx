import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  Car,
  ChevronRight,
  LineChart,
  RotateCcw,
  TrendingUp,
} from 'lucide-react';
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
import { TactileSlider } from './TactileSlider';

interface SimulatorSectionProps {
  mode: SimulatorMode;
  onModeChange: (mode: SimulatorMode) => void;
  category: ConsortiumCategory;
  onCategoryChange: (cat: ConsortiumCategory) => void;
  onSendToLeadForm: (summary: AttachedSimulationSummary) => void;
}

const PROOF_METRICS = [
  {
    value: 'R$ 184M+',
    label: 'Em cartas estruturadas',
    detail: 'Operações auditadas em parceria',
  },
  {
    value: '94%',
    label: 'Contemplação planejada',
    detail: 'Janela de 6 a 14 meses',
  },
  {
    value: '38%',
    label: 'Economia média de capital',
    detail: 'Frente ao financiamento tradicional',
  },
  {
    value: '340+',
    label: 'Patrimônios assessorados',
    detail: 'Empresários, investidores e famílias',
  },
];

export function SimulatorSection({
  mode,
  onModeChange,
  category,
  onCategoryChange,
  onSendToLeadForm,
}: SimulatorSectionProps) {
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

  const [profile, setProfile] = useState<InvestmentProfile>('moderado');
  const [initialDeposit, setInitialDeposit] = useState<number>(120000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(3500);
  const [years, setYears] = useState<number>(10);
  const [annualRatePct, setAnnualRatePct] = useState<number>(
    INVESTMENT_PROFILES.moderado.annualRatePct
  );

  const handleSelectNav = (nextMode: SimulatorMode, nextCat?: ConsortiumCategory) => {
    onModeChange(nextMode);
    if (nextCat) {
      onCategoryChange(nextCat);
      const nextCfg = CATEGORY_DEFAULTS[nextCat];
      setCreditValue(nextCfg.defaultCredit);
      setTermMonths(nextCfg.defaultTerm);
      setAdminFeePct(nextCfg.defaultAdminFee);
      setReserveFundPct(nextCfg.defaultReserveFund);
    }
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

  const navItems: {
    id: string;
    label: string;
    sublabel: string;
    mode: SimulatorMode;
    cat?: ConsortiumCategory;
    Icon: typeof Building2;
  }[] = [
    {
      id: 'imoveis',
      label: 'Consórcio Imobiliário',
      sublabel: 'Residencial e comercial',
      mode: 'consorcio',
      cat: 'imoveis',
      Icon: Building2,
    },
    {
      id: 'veiculos',
      label: 'Veículos e Frota',
      sublabel: 'Renovação sem juros',
      mode: 'consorcio',
      cat: 'veiculos',
      Icon: Car,
    },
    {
      id: 'alavancagem',
      label: 'Alavancagem',
      sublabel: 'Renda com patrimônio',
      mode: 'consorcio',
      cat: 'alavancagem',
      Icon: TrendingUp,
    },
    {
      id: 'investimento',
      label: 'Investimentos',
      sublabel: 'Juros compostos e liquidez',
      mode: 'investimento',
      Icon: LineChart,
    },
  ];

  return (
    <section id="simulador" className="bg-[#E3DCD5] pb-14 lg:pb-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Main Tactile Cockpit Housing */}
        <div className="tactile-card-stone rounded-3xl p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
            {/* Left Vertical Tactile Rail (inspired by reference left menu widget) */}
            <aside className="tactile-panel flex flex-col justify-between rounded-2xl p-4 sm:p-5 lg:col-span-3">
              <div>
                <div className="flex items-center justify-between border-b border-[#E3DCD5] pb-3">
                  <p className="text-xs font-semibold tracking-wide text-[#87692C]">
                    Modalidade
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4E6478] hover:text-[#14243B]"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    Restaurar
                  </button>
                </div>

                <div className="mt-4 space-y-2.5" role="tablist" aria-label="Modalidades do cockpit">
                  {navItems.map((item) => {
                    const isActive =
                      item.mode === 'investimento'
                        ? mode === 'investimento'
                        : mode === 'consorcio' && category === item.cat;
                    const Icon = item.Icon;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => handleSelectNav(item.mode, item.cat)}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left transition-all duration-150 ${
                          isActive
                            ? 'tactile-tile-sage text-[#FCFAF7]'
                            : 'tactile-button-raised text-[#1D324E] hover:translate-x-0.5'
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <Icon
                            className={`h-4 w-4 shrink-0 ${
                              isActive ? 'text-[#FCFAF7]' : 'text-[#5B7083]'
                            }`}
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold">{item.label}</p>
                            <p
                              className={`truncate text-[11px] ${
                                isActive ? 'text-[#FCFAF7]/85' : 'text-[#4E6478]'
                              }`}
                            >
                              {item.sublabel}
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? 'text-[#FCFAF7]' : 'text-[#8797A6]'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 border-t border-[#E3DCD5] pt-4">
                <p className="text-[11px] leading-relaxed text-[#4E6478]">
                  {mode === 'consorcio'
                    ? catConfig.description
                    : INVESTMENT_PROFILES[profile].subtitle}
                </p>
                <button
                  type="button"
                  onClick={handleAttachToConsultancy}
                  className="tactile-tile-navy mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold text-[#FCFAF7] transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Levar para Consultoria
                  <ArrowRight className="h-3.5 w-3.5 text-[#DEC796]" aria-hidden="true" />
                </button>
              </div>
            </aside>

            {/* Center Tactile Controls Panel */}
            <div className="tactile-panel rounded-2xl p-5 sm:p-6 lg:col-span-4">
              <div className="border-b border-[#E3DCD5] pb-3">
                <h2 className="font-editorial text-2xl font-semibold text-[#14243B]">
                  {mode === 'consorcio' ? 'Ajuste da Carta' : 'Ajuste da Carteira'}
                </h2>
              </div>

              {mode === 'consorcio' ? (
                <div className="mt-5 space-y-4">
                  <TactileSlider
                    id="credit-range"
                    label="Valor da Carta de Crédito"
                    valueLabel={formatBRL(creditValue)}
                    min={catConfig.minCredit}
                    max={catConfig.maxCredit}
                    step={catConfig.stepCredit}
                    value={creditValue}
                    minLabel={formatBRL(catConfig.minCredit, true)}
                    maxLabel={formatBRL(catConfig.maxCredit, true)}
                    onChange={setCreditValue}
                  />

                  <TactileSlider
                    id="term-range"
                    label="Prazo do Grupo"
                    valueLabel={`${termMonths} meses`}
                    min={catConfig.minTerm}
                    max={catConfig.maxTerm}
                    step={6}
                    value={termMonths}
                    minLabel={`${catConfig.minTerm}m`}
                    maxLabel={`${catConfig.maxTerm}m`}
                    onChange={setTermMonths}
                  />

                  <TactileSlider
                    id="bid-range"
                    label="Lance Embutido Estratégico"
                    valueLabel={`${embeddedBidPct}% (${formatBRL(consortiumResult.embeddedBidValue)})`}
                    min={0}
                    max={40}
                    step={5}
                    value={embeddedBidPct}
                    minLabel="0%"
                    maxLabel="40%"
                    onChange={setEmbeddedBidPct}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#DED7CE] bg-[#EFEAE2]/75 p-3">
                      <label
                        htmlFor="admin-fee"
                        className="block text-[11px] font-semibold text-[#294366]"
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
                        className="tactile-recessed mt-1.5 w-full rounded-lg px-2.5 py-1.5 font-mono text-sm text-[#14243B] tabular-nums focus:outline-none"
                      />
                    </div>
                    <div className="rounded-xl border border-[#DED7CE] bg-[#EFEAE2]/75 p-3">
                      <label
                        htmlFor="reserve-fee"
                        className="block text-[11px] font-semibold text-[#294366]"
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
                        className="tactile-recessed mt-1.5 w-full rounded-lg px-2.5 py-1.5 font-mono text-sm text-[#14243B] tabular-nums focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Tactile recessed switch */}
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#DED7CE] bg-[#EFEAE2]/75 p-3.5">
                    <div>
                      <p className="text-xs font-semibold text-[#14243B]">
                        Meia Parcela até Contemplação
                      </p>
                      <p className="text-[11px] text-[#4E6478]">
                        Preserva fluxo enquanto o caixa rende.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={halfInstallment}
                      onClick={() => setHalfInstallment((prev) => !prev)}
                      className={`tactile-recessed relative inline-flex h-7 w-13 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-150 ${
                        halfInstallment ? 'bg-[#6E8579]' : 'bg-[#D8D0C6]'
                      }`}
                    >
                      <span
                        className={`tactile-button-raised inline-block h-5 w-5 transform rounded-full transition-transform duration-150 ${
                          halfInstallment ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    {(Object.keys(INVESTMENT_PROFILES) as InvestmentProfile[]).map((key) => {
                      const item = INVESTMENT_PROFILES[key];
                      const active = profile === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleSelectProfile(key)}
                          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all duration-150 ${
                            active
                              ? 'tactile-tile-slate text-[#FCFAF7]'
                              : 'tactile-button-raised text-[#1D324E]'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-semibold">{item.label}</p>
                            <p
                              className={`truncate text-[11px] ${
                                active ? 'text-[#FCFAF7]/80' : 'text-[#4E6478]'
                              }`}
                            >
                              {item.subtitle}
                            </p>
                          </div>
                          <span
                            className={`ml-3 font-mono text-xs font-semibold tabular-nums shrink-0 ${
                              active ? 'text-[#DEC796]' : 'text-[#87692C]'
                            }`}
                          >
                            {item.annualRatePct.toFixed(2)}%
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <TactileSlider
                    id="initial-deposit"
                    label="Aporte Inicial"
                    valueLabel={formatBRL(initialDeposit)}
                    min={10000}
                    max={1000000}
                    step={10000}
                    value={initialDeposit}
                    minLabel="R$ 10k"
                    maxLabel="R$ 1M"
                    onChange={setInitialDeposit}
                  />

                  <TactileSlider
                    id="monthly-contribution"
                    label="Aporte Mensal"
                    valueLabel={`${formatBRL(monthlyContribution)}/mês`}
                    min={500}
                    max={30000}
                    step={500}
                    value={monthlyContribution}
                    minLabel="R$ 500"
                    maxLabel="R$ 30k"
                    onChange={setMonthlyContribution}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <TactileSlider
                      id="years-range"
                      label="Prazo"
                      valueLabel={`${years} anos`}
                      min={3}
                      max={25}
                      step={1}
                      value={years}
                      onChange={setYears}
                    />
                    <TactileSlider
                      id="rate-range"
                      label="Taxa a.a."
                      valueLabel={`${annualRatePct.toFixed(2)}%`}
                      min={7}
                      max={18}
                      step={0.25}
                      value={annualRatePct}
                      onChange={setAnnualRatePct}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Results & Analytics Panel */}
            <div className="flex flex-col justify-between gap-5 lg:col-span-5">
              {mode === 'consorcio' ? (
                <>
                  {/* 3 Matte Pastel KPI Tiles (Navy, Sage, Slate) */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    <div className="tactile-tile-navy rounded-2xl p-3.5 text-[#FCFAF7]">
                      <p className="text-[11px] font-medium text-[#FCFAF7]/80">
                        {halfInstallment ? 'Parcela Inicial (50%)' : 'Parcela Mensal'}
                      </p>
                      <p className="mt-1.5 font-mono text-lg font-semibold tracking-tight tabular-nums xl:text-[15px]">
                        {formatBRLPrecise(consortiumResult.initialInstallment)}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-[#DEC796] tabular-nums">
                        {halfInstallment
                          ? `Integral: ${formatBRL(consortiumResult.monthlyInstallment)}`
                          : `${termMonths} meses`}
                      </p>
                    </div>

                    <div className="tactile-tile-sage rounded-2xl p-3.5 text-[#FCFAF7]">
                      <p className="text-[11px] font-medium text-[#FCFAF7]/85">
                        Economia vs. Banco
                      </p>
                      <p className="mt-1.5 font-mono text-lg font-semibold tracking-tight tabular-nums xl:text-[15px]">
                        {formatBRL(consortiumResult.estimatedSavings)}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-[#FCFAF7]/85 tabular-nums">
                        -{consortiumResult.savingsPct.toFixed(0)}% no total pago
                      </p>
                    </div>

                    <div className="tactile-tile-slate rounded-2xl p-3.5 text-[#FCFAF7]">
                      <p className="text-[11px] font-medium text-[#FCFAF7]/85">
                        Crédito Líquido
                      </p>
                      <p className="mt-1.5 font-mono text-lg font-semibold tracking-tight tabular-nums xl:text-[15px]">
                        {formatBRL(consortiumResult.netCredit)}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-[#FCFAF7]/80 tabular-nums">
                        ~{consortiumResult.effectiveAnnualCostPct.toFixed(2)}% a.a.
                      </p>
                    </div>
                  </div>

                  {/* Chart Panel */}
                  <div className="tactile-panel flex-1 rounded-2xl p-5">
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

                    <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#E3DCD5] pt-3 text-xs">
                      <div>
                        <p className="text-[#4E6478]">Custo total consórcio</p>
                        <p className="font-mono font-semibold text-[#14243B] tabular-nums">
                          {formatBRL(consortiumResult.totalCost)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#4E6478]">Financiamento equivalente</p>
                        <p className="font-mono font-semibold text-[#53695D] tabular-nums">
                          {formatBRL(consortiumResult.bankTotalCost)}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    <div className="tactile-tile-navy rounded-2xl p-3.5 text-[#FCFAF7]">
                      <p className="text-[11px] font-medium text-[#FCFAF7]/80">
                        Patrimônio em {years}a
                      </p>
                      <p className="mt-1.5 font-mono text-lg font-semibold tracking-tight tabular-nums xl:text-[15px]">
                        {formatBRL(investmentResult.finalBalance, true)}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-[#DEC796] tabular-nums">
                        {(
                          investmentResult.finalBalance /
                          Math.max(1, investmentResult.totalContributed)
                        ).toFixed(2)}
                        x o investido
                      </p>
                    </div>

                    <div className="tactile-tile-sage rounded-2xl p-3.5 text-[#FCFAF7]">
                      <p className="text-[11px] font-medium text-[#FCFAF7]/85">
                        Rendimento Composto
                      </p>
                      <p className="mt-1.5 font-mono text-lg font-semibold tracking-tight tabular-nums xl:text-[15px]">
                        +{formatBRL(investmentResult.totalYield, true)}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-[#FCFAF7]/85 tabular-nums">
                        {annualRatePct.toFixed(2)}% ao ano
                      </p>
                    </div>

                    <div className="tactile-tile-slate rounded-2xl p-3.5 text-[#FCFAF7]">
                      <p className="text-[11px] font-medium text-[#FCFAF7]/85">
                        Renda Passiva / Mês
                      </p>
                      <p className="mt-1.5 font-mono text-lg font-semibold tracking-tight tabular-nums xl:text-[15px]">
                        {formatBRL(investmentResult.monthlyPassiveIncome)}
                      </p>
                      <p className="mt-1 text-[11px] text-[#FCFAF7]/80">
                        Estimativa sustentável
                      </p>
                    </div>
                  </div>

                  <div className="tactile-panel flex-1 rounded-2xl p-5">
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

                    <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#E3DCD5] pt-3 text-xs">
                      <div>
                        <p className="text-[#4E6478]">Total aportado</p>
                        <p className="font-mono font-semibold text-[#14243B] tabular-nums">
                          {formatBRL(investmentResult.totalContributed)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#4E6478]">Renda passiva mensal</p>
                        <p className="font-mono font-semibold text-[#53695D] tabular-nums">
                          {formatBRL(investmentResult.monthlyPassiveIncome)}/mês
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Tactile Quantitative Strip directly below Cockpit */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF_METRICS.map((metric) => (
            <div key={metric.label} className="tactile-panel rounded-2xl p-5">
              <p className="font-mono text-2xl font-semibold tracking-tight text-[#14243B] tabular-nums">
                {metric.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#294366]">{metric.label}</p>
              <p className="mt-0.5 text-xs text-[#4E6478]">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
