import { FormEvent, useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, Phone, X } from 'lucide-react';
import { AttachedSimulationSummary } from '../types/consultancy';

interface LeadCaptureSectionProps {
  attachedSimulation: AttachedSimulationSummary | null;
  onClearAttachedSimulation: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const WHATSAPP_NUMBER_E164 = '5531987707470';
const WHATSAPP_DISPLAY = '(31) 98770-7470';
const CONTACT_EMAIL = 'mapealconsorcios@gmail.com';

function formatPhoneBR(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function LeadCaptureSection({
  attachedSimulation,
  onClearAttachedSimulation,
}: LeadCaptureSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [objective, setObjective] = useState('Consórcio Imobiliário');
  const [preferredWindow, setPreferredWindow] = useState('Manhã (09h – 12h)');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 3) {
      nextErrors.name = 'Informe seu nome completo.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      nextErrors.phone = 'Informe um telefone ou WhatsApp com DDD.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const code = `MPA-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedProtocol(code);
  };

  const handleResetSubmission = () => {
    setSubmittedProtocol(null);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setErrors({});
  };

  const whatsappUrl = useMemo(() => {
    const lines = [
      `Olá 2M Consórcios & Investimentos! Gostaria de solicitar um estudo personalizado.`,
      submittedProtocol ? `Protocolo: ${submittedProtocol}` : null,
      name.trim() ? `Nome: ${name.trim()}` : null,
      phone.trim() ? `Telefone/WhatsApp: ${phone.trim()}` : null,
      email.trim() ? `E-mail: ${email.trim()}` : null,
      `Objetivo: ${objective}`,
      `Melhor horário: ${preferredWindow}`,
      attachedSimulation
        ? `Simulação: ${attachedSimulation.title} — ${attachedSimulation.details} (${attachedSimulation.highlightLabel}: ${attachedSimulation.highlightValue})`
        : null,
      notes.trim() ? `Observações: ${notes.trim()}` : null,
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [
    attachedSimulation,
    email,
    name,
    notes,
    objective,
    phone,
    preferredWindow,
    submittedProtocol,
  ]);

  const directWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(
    'Olá! Vim pelo site da 2M Consórcios & Investimentos e gostaria de conversar sobre consórcios e investimentos.'
  )}`;

  return (
    <section
      id="contato"
      className="border-t border-[#CFC6BC] bg-[#ECE6DF] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wide text-[#87692C]">
              Diagnóstico Individual
            </p>
            <h2
              className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#14243B] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Receba um estudo completo de grupos e alocação para o seu objetivo.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#3E597B]">
              Em uma reunião reservada com a 2M Consórcios & Investimentos, apresentamos comparativos reais da NS Assessoria Consórcios, média de lances dos últimos 6 meses e impacto na sua carteira de investimentos.
            </p>

            <div className="tactile-panel mt-8 space-y-5 rounded-2xl p-6 text-sm text-[#294366]">
              <div>
                <p className="font-semibold text-[#14243B]">Canais diretos de atendimento</p>
                <div className="mt-2.5 flex flex-col items-start gap-2.5">
                  <a
                    href={directWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-base font-semibold text-[#1D324E] tabular-nums hover:text-[#87692C] hover:underline hover:underline-offset-4"
                  >
                    <Phone className="h-4 w-4 text-[#87692C]" aria-hidden="true" />
                    {WHATSAPP_DISPLAY}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#1D324E] hover:text-[#87692C] hover:underline hover:underline-offset-4"
                  >
                    <Mail className="h-4 w-4 text-[#87692C]" aria-hidden="true" />
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <p className="mt-2 text-xs text-[#4E6478]">
                  Atendimento direto para simulações, análise de lances e investimentos.
                </p>
              </div>

              <div className="border-t border-[#E3DCD5] pt-4">
                <p className="font-semibold text-[#14243B]">Atendimento sem custo inicial</p>
                <p className="mt-0.5 text-xs text-[#4E6478]">
                  Diagnóstico patrimonial gratuito, presencial ou por videoconferência em todo o Brasil.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: Tactile Form */}
          <div className="tactile-panel rounded-3xl p-6 sm:p-8 lg:col-span-7">
            {submittedProtocol ? (
              <div className="py-4">
                <div className="tactile-tile-sage inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#FCFAF7]">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-editorial text-3xl font-semibold text-[#14243B]">
                  Estudo pronto para envio.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3E597B]">
                  Obrigado, <span className="font-semibold text-[#14243B]">{name}</span>. Registramos seu atendimento para{' '}
                  <span className="font-semibold text-[#14243B]">{objective}</span> no período da{' '}
                  <span className="font-semibold text-[#14243B]">{preferredWindow}</span>. Clique abaixo para enviar seu resumo diretamente para o WhatsApp{' '}
                  <span className="font-mono text-xs font-medium text-[#14243B] tabular-nums">
                    {WHATSAPP_DISPLAY}
                  </span>
                  .
                </p>

                <div className="tactile-card-stone mt-6 rounded-2xl p-4">
                  <p className="text-xs text-[#4E6478]">Protocolo de atendimento</p>
                  <p className="mt-1 font-mono text-base font-semibold text-[#14243B] tabular-nums">
                    {submittedProtocol}
                  </p>
                  {attachedSimulation && (
                    <p className="mt-2 border-t border-[#CFC6BC] pt-2 text-xs text-[#294366]">
                      Simulação anexada: {attachedSimulation.title} — {attachedSimulation.details}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tactile-tile-navy inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold text-[#FCFAF7] whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    Enviar no WhatsApp {WHATSAPP_DISPLAY}
                    <ArrowUpRight className="h-4 w-4 text-[#DEC796]" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={handleResetSubmission}
                    className="tactile-button-raised rounded-xl px-4 py-3 text-xs font-semibold text-[#1D324E]"
                  >
                    Fazer nova solicitação
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {attachedSimulation && (
                  <div className="tactile-tile-slate flex items-start justify-between gap-4 rounded-2xl p-4 text-[#FCFAF7]">
                    <div>
                      <p className="text-xs font-semibold text-[#FCFAF7]">
                        {attachedSimulation.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#FCFAF7]/85">
                        {attachedSimulation.details}
                      </p>
                      <p className="mt-1 font-mono text-xs font-semibold text-[#DEC796] tabular-nums">
                        {attachedSimulation.highlightLabel}: {attachedSimulation.highlightValue}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClearAttachedSimulation}
                      aria-label="Remover simulação anexada"
                      className="rounded-lg p-1 text-[#FCFAF7]/80 hover:bg-white/15 hover:text-[#FCFAF7]"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-xs font-semibold text-[#294366]"
                    >
                      Nome completo
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Ex.: Mariana Albuquerque"
                      className={`tactile-recessed mt-1.5 w-full rounded-xl px-3.5 py-2.5 text-sm text-[#14243B] placeholder:text-[#4E6478]/65 focus:outline-none ${
                        errors.name ? 'ring-2 ring-red-700' : 'focus:ring-2 focus:ring-[#5B7083]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-700">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-xs font-semibold text-[#294366]"
                    >
                      Seu WhatsApp ou Telefone
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatPhoneBR(e.target.value));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="(31) 99999-9999"
                      className={`tactile-recessed mt-1.5 w-full rounded-xl px-3.5 py-2.5 font-mono text-sm text-[#14243B] tabular-nums placeholder:font-sans placeholder:text-[#4E6478]/65 focus:outline-none ${
                        errors.phone ? 'ring-2 ring-red-700' : 'focus:ring-2 focus:ring-[#5B7083]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-700">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-xs font-semibold text-[#294366]"
                    >
                      E-mail
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="nome@empresa.com.br"
                      className={`tactile-recessed mt-1.5 w-full rounded-xl px-3.5 py-2.5 text-sm text-[#14243B] placeholder:text-[#4E6478]/65 focus:outline-none ${
                        errors.email ? 'ring-2 ring-red-700' : 'focus:ring-2 focus:ring-[#5B7083]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-700">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-objective"
                      className="block text-xs font-semibold text-[#294366]"
                    >
                      Objetivo Principal
                    </label>
                    <select
                      id="lead-objective"
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      className="tactile-recessed mt-1.5 w-full rounded-xl px-3.5 py-2.5 text-sm text-[#14243B] focus:ring-2 focus:ring-[#5B7083] focus:outline-none"
                    >
                      <option value="Consórcio Imobiliário">Consórcio Imobiliário</option>
                      <option value="Alavancagem e Renda Passiva">
                        Alavancagem e Renda Passiva
                      </option>
                      <option value="Veículos ou Renovação de Frota">
                        Veículos ou Renovação de Frota
                      </option>
                      <option value="Carteira de Investimentos">
                        Carteira de Investimentos
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-[#294366]">
                    Melhor horário para contato
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {['Manhã (09h – 12h)', 'Tarde (13h – 17h)', 'Fim de dia (17h – 19h)'].map(
                      (slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredWindow(slot)}
                          className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${
                            preferredWindow === slot
                              ? 'tactile-tile-sage text-[#FCFAF7]'
                              : 'tactile-button-raised text-[#3E597B]'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-notes" className="block text-xs font-semibold text-[#294366]">
                    Observações (opcional)
                  </label>
                  <textarea
                    id="lead-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Conte brevemente seu prazo ou se possui capital disponível para lance..."
                    className="tactile-recessed mt-1.5 w-full rounded-xl px-3.5 py-2.5 text-sm text-[#14243B] placeholder:text-[#4E6478]/65 focus:ring-2 focus:ring-[#5B7083] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                  <p className="text-xs text-[#4E6478]">
                    Atendimento direto via {WHATSAPP_DISPLAY}.
                  </p>
                  <button
                    type="submit"
                    className="tactile-tile-navy rounded-xl px-6 py-3 text-sm font-semibold text-[#FCFAF7] whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5833E]"
                  >
                    Solicitar Estudo Personalizado
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
