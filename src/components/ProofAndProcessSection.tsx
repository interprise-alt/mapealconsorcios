const CASE_STUDIES = [
  {
    client: 'Dr. Henrique Vasconcelos',
    role: 'Diretor Clínico · Instituto Vasconcelos, Campinas',
    metric: 'R$ 540 mil economizados',
    period: 'Operação de 180 meses · Contemplada no 9º mês',
    summary:
      'Precisava expandir a clínica comprando dois conjuntos comerciais de R$ 1,4M sem liquidar sua carteira em LCI. Estruturamos duas cartas com lance embutido de 20% e fluxo de meia parcela; a economia total frente ao financiamento bancário atingiu R$ 540 mil.',
  },
  {
    client: 'Marina Bittencourt',
    role: 'Sócia-fundadora · Bittencourt Arquitetura, São Paulo',
    metric: '+R$ 9.400/mês de renda líquida',
    period: 'Carteira de 2 imóveis · Horizonte de 24 meses',
    summary:
      'Buscava renda passiva imobiliária mantendo R$ 350 mil rendendo no Tesouro Selic. Utilizou os rendimentos mensais para amortizar duas cotas imobiliárias, contempladas nos meses 7 e 14, hoje alugadas com saldo positivo após parcela.',
  },
  {
    client: 'Eduardo Monteiro',
    role: 'Gerente Financeiro · Transportadora Sul-Oeste, Curitiba',
    metric: '42% menos custo de capital',
    period: 'Renovação de 4 utilitários · 72 meses',
    summary:
      'Pagava CET de 23% a.a. em CDC bancário na renovação de frota. Migrou para grupos empresariais selecionados com lance composto pela venda dos seminovos, reduzindo o custo anual efetivo da frota para 2,5% a.a.',
  },
];

const PROCESS_STEPS = [
  {
    step: '01. Diagnóstico de Fluxo de Caixa',
    description:
      'Mapeamos sua capacidade de aporte mensal, reserva disponível em renda fixa e prazo desejado para aquisição ou renda.',
  },
  {
    step: '02. Auditoria de Grupos e Lances',
    description:
      'Comparamos o histórico de contemplação de mais de 12 administradoras autorizadas pelo Banco Central para escolher grupos com menor concorrência de lance.',
  },
  {
    step: '03. Acompanhamento até a Escritura',
    description:
      'Gerenciamos os lances mensais em assembleia, análise documental pós-contemplação e integração com a carteira de investimentos.',
  },
];

export function ProofAndProcessSection() {
  return (
    <section id="resultados" className="border-t border-[#E5DBCA] bg-[#FCFAF7] py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Case Studies */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#87692C]">
            Resultados Comprovados
          </p>
          <h2
            className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#14243B] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Casos reais de economia de juros e multiplicação patrimonial.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {CASE_STUDIES.map((item) => (
            <article
              key={item.client}
              className="flex flex-col justify-between rounded-xl border border-[#DFD6C5] bg-[#F8F4EC]/70 p-6 sm:p-7"
            >
              <div>
                <p className="font-mono text-2xl font-medium tracking-tight text-[#1D324E] tabular-nums">
                  {item.metric}
                </p>
                <p className="mt-1 text-xs text-[#87692C]">{item.period}</p>

                <p className="mt-5 text-sm leading-relaxed text-[#294366]">{item.summary}</p>
              </div>

              <div className="mt-6 border-t border-[#E5DBCA] pt-4">
                <p className="text-sm font-semibold text-[#14243B]">{item.client}</p>
                <p className="text-xs text-[#3E597B]">{item.role}</p>
              </div>
            </article>
          ))}
        </div>

        {/* 3-step transparent methodology */}
        <div className="mt-16 border-t border-[#E5DBCA] pt-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-wide text-[#87692C]">
                Metodologia de Assessoria
              </p>
              <h3 className="mt-2 font-editorial text-3xl font-semibold text-[#14243B]">
                Como conduzimos sua operação em parceria com a NS Consórcios.
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
              {PROCESS_STEPS.map((item) => (
                <div key={item.step} className="border-t border-[#C2D0E0] pt-4">
                  <h4 className="font-editorial text-xl font-semibold text-[#14243B]">
                    {item.step}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#3E597B]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
