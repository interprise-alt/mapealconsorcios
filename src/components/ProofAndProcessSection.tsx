import { Star } from 'lucide-react';

interface GoogleTestimonial {
  author: string;
  context: string;
  highlight?: string;
  quote: string;
  rating: number;
}

const GOOGLE_TESTIMONIALS: GoogleTestimonial[] = [
  {
    author: 'Adelino Arlindo Dognini',
    context: 'Avaliação verificada no Google · NS Assessoria Consórcios',
    highlight: 'Atendimento transparente e sem pressão',
    quote:
      'Excelente atendimento da Suelen! Muito atenciosa, educada e prestativa. Tirou todas as minhas dúvidas com muita clareza, sem pressão e sempre me deixando muito à vontade para decidir. Esse tipo de atendimento transmite confiança.',
    rating: 5,
  },
  {
    author: 'José Júnior',
    context: 'Avaliação verificada no Google · NS Assessoria Consórcios',
    highlight: 'Carta de crédito e alavancagem patrimonial · Ótimo preço',
    quote:
      'Excelente profissional! Iniciamos uma conversa sobre carta de crédito e alavancar patrimônio e, em um simples bate-papo para alinhamento dos objetivos, a Suelen conseguiu me apresentar ótimos planos.',
    rating: 5,
  },
  {
    author: 'Luciane Aquino',
    context: 'Avaliação verificada no Google · NS Assessoria Consórcios',
    highlight: 'Acompanhamento completo · Ótimo preço',
    quote:
      'Tive uma ótima experiência com a NS Consórcios! Quero agradecer especialmente à Suelen, que me ajudou durante todo o processo com muita atenção e paciência.',
    rating: 5,
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
      'Comparamos o histórico de contemplação de administradoras autorizadas pelo Banco Central para escolher grupos com menor concorrência de lance.',
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
        {/* Verified Google Reviews Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#87692C]">
              Avaliações Reais dos Clientes
            </p>
            <h2
              className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#14243B] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Confiança comprovada por quem já planejou seu consórcio conosco.
            </h2>
          </div>

          <div className="shrink-0 border-t border-[#E5DBCA] pt-4 lg:border-t-0 lg:pt-0 lg:text-right">
            <div className="flex items-center gap-2 lg:justify-end">
              <span className="font-mono text-2xl font-semibold text-[#14243B] tabular-nums">
                5,0
              </span>
              <div className="flex items-center gap-0.5" aria-label="Nota 5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#C4A25D] text-[#C4A25D]"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <p className="mt-1 text-xs text-[#3E597B]">
              103 avaliações no Google · NS Assessoria Consórcios (Ipatinga - MG)
            </p>
          </div>
        </div>

        {/* 3 Real Testimonials */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {GOOGLE_TESTIMONIALS.map((item) => (
            <article
              key={item.author}
              className="flex flex-col justify-between rounded-xl border border-[#DFD6C5] bg-[#F8F4EC]/70 p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-0.5" aria-label={`${item.rating} estrelas`}>
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-3.5 w-3.5 fill-[#C4A25D] text-[#C4A25D]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-[#87692C]">Google</span>
                </div>

                {item.highlight && (
                  <p className="mt-3 text-xs font-semibold text-[#1D324E]">{item.highlight}</p>
                )}

                <blockquote className="mt-3 text-sm leading-relaxed text-[#294366]">
                  “{item.quote}”
                </blockquote>
              </div>

              <div className="mt-6 border-t border-[#E5DBCA] pt-4">
                <p className="text-sm font-semibold text-[#14243B]">{item.author}</p>
                <p className="text-xs text-[#3E597B]">{item.context}</p>
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
