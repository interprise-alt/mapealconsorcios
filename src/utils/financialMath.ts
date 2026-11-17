import {
  ConsortiumCategory,
  ConsortiumInput,
  ConsortiumResult,
  InvestmentInput,
  InvestmentProfile,
  InvestmentResult,
} from '../types/consultancy';

export const CATEGORY_DEFAULTS: Record<
  ConsortiumCategory,
  {
    label: string;
    minCredit: number;
    maxCredit: number;
    stepCredit: number;
    defaultCredit: number;
    minTerm: number;
    maxTerm: number;
    defaultTerm: number;
    defaultAdminFee: number;
    defaultReserveFund: number;
    bankAnnualRatePct: number;
    description: string;
  }
> = {
  imoveis: {
    label: 'Imóveis',
    minCredit: 150000,
    maxCredit: 2500000,
    stepCredit: 25000,
    defaultCredit: 600000,
    minTerm: 60,
    maxTerm: 220,
    defaultTerm: 180,
    defaultAdminFee: 16.5,
    defaultReserveFund: 2.0,
    bankAnnualRatePct: 11.4,
    description: 'Aquisição residencial, comercial, construção ou quitação de financiamento.',
  },
  veiculos: {
    label: 'Veículos e Frota',
    minCredit: 60000,
    maxCredit: 800000,
    stepCredit: 10000,
    defaultCredit: 180000,
    minTerm: 36,
    maxTerm: 100,
    defaultTerm: 72,
    defaultAdminFee: 14.0,
    defaultReserveFund: 2.0,
    bankAnnualRatePct: 21.8,
    description: 'Renovação de automóveis, utilitários e caminhões sem juros bancários.',
  },
  alavancagem: {
    label: 'Alavancagem Patrimonial',
    minCredit: 300000,
    maxCredit: 3000000,
    stepCredit: 50000,
    defaultCredit: 900000,
    minTerm: 100,
    maxTerm: 220,
    defaultTerm: 200,
    defaultAdminFee: 15.5,
    defaultReserveFund: 1.5,
    bankAnnualRatePct: 12.2,
    description: 'Estruturação de cartas para renda de aluguel ou venda contemplada.',
  },
};

export const INVESTMENT_PROFILES: Record<
  InvestmentProfile,
  { label: string; annualRatePct: number; subtitle: string }
> = {
  conservador: {
    label: 'Renda Fixa & Liquidez',
    annualRatePct: 10.75,
    subtitle: 'Tesouro Selic, CDBs de primeira linha e LCI/LCA isentas.',
  },
  moderado: {
    label: 'Carteira Balanceada',
    annualRatePct: 12.6,
    subtitle: 'Prefixados, IPCA+ e fundos imobiliários selecionados.',
  },
  arrojado: {
    label: 'Alavancagem & Renda',
    annualRatePct: 14.8,
    subtitle: 'Combinação de renda fixa com estratégia de cartas imobiliárias.',
  },
};

export function formatBRL(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1_000_000) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatBRLPrecise(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function calculateConsortium(input: ConsortiumInput): ConsortiumResult {
  const {
    category,
    creditValue,
    termMonths,
    adminFeePct,
    reserveFundPct,
    embeddedBidPct,
    halfInstallment,
  } = input;

  const totalRateMultiplier = 1 + (adminFeePct + reserveFundPct) / 100;
  const totalCost = creditValue * totalRateMultiplier;
  const fullMonthly = totalCost / termMonths;
  const initialInstallment = halfInstallment ? fullMonthly * 0.5 : fullMonthly;

  const embeddedBidValue = creditValue * (embeddedBidPct / 100);
  const netCredit = Math.max(0, creditValue - embeddedBidValue);

  // Compare against traditional Price table financing for equivalent net credit
  const bankAnnualRatePct = CATEGORY_DEFAULTS[category].bankAnnualRatePct;
  const bankMonthlyRate = Math.pow(1 + bankAnnualRatePct / 100, 1 / 12) - 1;
  const principalForBank = netCredit > 0 ? netCredit : creditValue;

  const factor = Math.pow(1 + bankMonthlyRate, termMonths);
  const bankMonthlyInstallment =
    (principalForBank * (bankMonthlyRate * factor)) / (factor - 1);
  const bankTotalCost = bankMonthlyInstallment * termMonths;

  // Adjust consortium cost proportional to net credit if embedded bid reduces credit used,
  // or show total letter cost vs financing equivalent of full creditValue for fair comparison
  const bankFullCreditMonthly =
    (creditValue * (bankMonthlyRate * factor)) / (factor - 1);
  const bankFullCreditTotal = bankFullCreditMonthly * termMonths;

  const estimatedSavings = Math.max(0, bankFullCreditTotal - totalCost);
  const savingsPct =
    bankFullCreditTotal > 0 ? (estimatedSavings / bankFullCreditTotal) * 100 : 0;

  const years = termMonths / 12;
  const effectiveAnnualCostPct =
    years > 0 ? (Math.pow(totalRateMultiplier, 1 / years) - 1) * 100 : 0;

  const steps = 6;
  const chartSeries = Array.from({ length: steps + 1 }, (_, i) => {
    const month = Math.round((termMonths / steps) * i);
    const label = month === 0 ? 'Início' : `${month}m`;
    return {
      month,
      label,
      consortiumPaid: Math.round(fullMonthly * month),
      bankPaid: Math.round(bankFullCreditMonthly * month),
    };
  });

  return {
    monthlyInstallment: fullMonthly,
    initialInstallment,
    totalCost,
    netCredit,
    embeddedBidValue,
    bankMonthlyInstallment: bankFullCreditMonthly,
    bankTotalCost: bankFullCreditTotal,
    estimatedSavings,
    savingsPct,
    effectiveAnnualCostPct,
    bankAnnualRatePct,
    chartSeries,
  };
}

export function calculateInvestment(input: InvestmentInput): InvestmentResult {
  const { initialDeposit, monthlyContribution, years, annualRatePct } = input;
  const monthlyRate = Math.pow(1 + annualRatePct / 100, 1 / 12) - 1;

  const chartSeries: InvestmentResult['chartSeries'] = [
    {
      year: 0,
      label: 'Hoje',
      contributed: Math.round(initialDeposit),
      balance: Math.round(initialDeposit),
    },
  ];

  let currentBalance = initialDeposit;
  let currentContributed = initialDeposit;

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      currentBalance = currentBalance * (1 + monthlyRate) + monthlyContribution;
      currentContributed += monthlyContribution;
    }
    chartSeries.push({
      year: y,
      label: `${y}a`,
      contributed: Math.round(currentContributed),
      balance: Math.round(currentBalance),
    });
  }

  const totalYield = Math.max(0, currentBalance - currentContributed);
  // Conservative real withdrawal / monthly yield estimate at ~0.72% real+nominal net equivalent
  const monthlyPassiveIncome = currentBalance * monthlyRate * 0.85;

  return {
    finalBalance: currentBalance,
    totalContributed: currentContributed,
    totalYield,
    monthlyPassiveIncome,
    chartSeries,
  };
}
