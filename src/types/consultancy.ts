export type SimulatorMode = 'consorcio' | 'investimento';

export type ConsortiumCategory = 'imoveis' | 'veiculos' | 'alavancagem';

export type InvestmentProfile = 'conservador' | 'moderado' | 'arrojado';

export interface ConsortiumInput {
  category: ConsortiumCategory;
  creditValue: number;
  termMonths: number;
  adminFeePct: number;
  reserveFundPct: number;
  embeddedBidPct: number;
  halfInstallment: boolean;
}

export interface ConsortiumResult {
  monthlyInstallment: number;
  initialInstallment: number;
  totalCost: number;
  netCredit: number;
  embeddedBidValue: number;
  bankMonthlyInstallment: number;
  bankTotalCost: number;
  estimatedSavings: number;
  savingsPct: number;
  effectiveAnnualCostPct: number;
  bankAnnualRatePct: number;
  chartSeries: {
    month: number;
    label: string;
    consortiumPaid: number;
    bankPaid: number;
  }[];
}

export interface InvestmentInput {
  profile: InvestmentProfile;
  initialDeposit: number;
  monthlyContribution: number;
  years: number;
  annualRatePct: number;
}

export interface InvestmentResult {
  finalBalance: number;
  totalContributed: number;
  totalYield: number;
  monthlyPassiveIncome: number;
  chartSeries: {
    year: number;
    label: string;
    contributed: number;
    balance: number;
  }[];
}

export interface AttachedSimulationSummary {
  mode: SimulatorMode;
  title: string;
  details: string;
  highlightLabel: string;
  highlightValue: string;
}
