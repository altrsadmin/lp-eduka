/**
 * /prematricula — Ficha de Matrícula EdukaEAD
 * Multi-step form autônomo, sem backend.
 * Dados enviados via POST para o webhook n8n abaixo.
 */
import { useState, useEffect } from 'react';
import './Prematricula.css';
import { useTracking, getRadarId } from '../hooks/useTracking';

// CONFIG — edite aqui e dê build para atualizar
const WEBHOOK_URL = 'https://workflow.arelis.online/webhook/eduka-fichamatrlcula';

/* ─── Formatadores ─── */
function fPhone(v) {
  v = v.replace(/\D/g, '').slice(0, 11);
  if (v.length <= 2) return v;
  if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
}
function fCPF(v) {
  v = v.replace(/\D/g, '').slice(0, 11);
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
}
function fCEP(v) {
  v = v.replace(/\D/g, '').slice(0, 8);
  return v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5)}` : v;
}

/* ─── Step 0: Consultor ─── */
function StepConsultor({ data, upd, consultores, onNext }) {
  return (
    <div className="pm-card">
      <h2 className="pm-title">Olá! Antes de começar…</h2>
      <p className="pm-subtitle">
        Se você foi indicado por um consultor ou possui um código promocional, informe abaixo.
        Ambos são opcionais — pode pular.
      </p>

      <div className="pm-field">
        <label className="pm-label">Nome do Consultor</label>
        <span className="pm-tip">Opcional. Digite ou selecione.</span>
        <input
          className="pm-input"
          list="pm-consult-list"
          value={data.consultor}
          onChange={e => upd('consultor', e.target.value)}
          placeholder="Nome do consultor"
          autoComplete="off"
        />
        <datalist id="pm-consult-list">
          {consultores.map(n => <option key={n} value={n} />)}
        </datalist>
      </div>

      <div className="pm-field">
        <label className="pm-label">Código Promocional</label>
        <span className="pm-tip">Opcional. Deixe em branco se não tiver.</span>
        <input
          className="pm-input"
          value={data.codigo_promocional}
          onChange={e => upd('codigo_promocional', e.target.value)}
          placeholder="Código promocional"
        />
      </div>

      <div className="pm-actions">
        <button className="pm-btn-primary" onClick={onNext}>Próximo</button>
      </div>
    </div>
  );
}

/* ─── Step 1: Contato ─── */
function StepContato({ data, upd, onNext, onBack }) {
  const [error, setError] = useState('');
  function next() {
    if (!data.nome.trim() || !data.email.trim() || !data.telefone.trim()) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    setError(''); onNext();
  }
  return (
    <div className="pm-card">
      <h2 className="pm-title">Dados de Contato</h2>
      <p className="pm-subtitle">Para garantir sua comunicação conosco e com a instituição de ensino.</p>

      <div className="pm-field">
        <label className="pm-label">Nome Completo (Sem Abreviações) <span className="pm-req">*</span></label>
        <input className="pm-input" value={data.nome}
          onChange={e => upd('nome', e.target.value)} placeholder="Nome completo sem abreviações" />
      </div>

      <div className="pm-row">
        <div className="pm-field">
          <label className="pm-label">E-mail <span className="pm-req">*</span></label>
          <input className="pm-input" type="email" value={data.email}
            onChange={e => upd('email', e.target.value)} placeholder="seu@email.com" />
        </div>
        <div className="pm-field">
          <label className="pm-label">Telefone / WhatsApp <span className="pm-req">*</span></label>
          <input className="pm-input" type="tel" value={data.telefone}
            onChange={e => upd('telefone', fPhone(e.target.value))} placeholder="(11) 99999-8888" />
        </div>
      </div>

      {error && <p className="pm-error">{error}</p>}
      <div className="pm-actions">
        <button className="pm-btn-secondary" onClick={onBack}>Voltar</button>
        <button className="pm-btn-primary" onClick={next}>Próximo</button>
      </div>
    </div>
  );
}

/* ─── Step 2: Endereço ─── */
function StepEndereco({ data, upd, cepLoading, cepError, onLookup, onNext, onBack }) {
  const [error, setError] = useState('');
  function next() {
    if (!data.cep.trim() || !data.endereco.trim() || !data.numero.trim() || !data.cidade.trim() || !data.estado.trim()) {
      setError('Preencha os campos obrigatórios.'); return;
    }
    setError(''); onNext();
  }
  return (
    <div className="pm-card">
      <h2 className="pm-title">Endereço</h2>
      <p className="pm-subtitle">Informe seu endereço residencial completo.</p>

      <div className="pm-cep-group">
        <div className="pm-field">
          <label className="pm-label">CEP <span className="pm-req">*</span></label>
          <input className="pm-input" value={data.cep}
            onChange={e => upd('cep', fCEP(e.target.value))}
            onBlur={onLookup} placeholder="00000-000" />
        </div>
        <button className="pm-btn-cep" onClick={onLookup} disabled={cepLoading}>
          {cepLoading ? 'Buscando…' : 'Buscar'}
        </button>
      </div>
      {cepError && <p className="pm-error">{cepError}</p>}

      <div className="pm-field">
        <label className="pm-label">Logradouro <span className="pm-req">*</span></label>
        <input className="pm-input" value={data.endereco}
          onChange={e => upd('endereco', e.target.value)} placeholder="Rua, Avenida…" />
      </div>

      <div className="pm-row">
        <div className="pm-field">
          <label className="pm-label">Número <span className="pm-req">*</span></label>
          <input className="pm-input" value={data.numero}
            onChange={e => upd('numero', e.target.value)} placeholder="123" />
        </div>
        <div className="pm-field">
          <label className="pm-label">Complemento</label>
          <input className="pm-input" value={data.complemento}
            onChange={e => upd('complemento', e.target.value)} placeholder="Apto, Bloco…" />
        </div>
      </div>

      <div className="pm-field">
        <label className="pm-label">Bairro <span className="pm-req">*</span></label>
        <input className="pm-input" value={data.bairro}
          onChange={e => upd('bairro', e.target.value)} placeholder="Bairro" />
      </div>

      <div className="pm-row">
        <div className="pm-field">
          <label className="pm-label">Cidade <span className="pm-req">*</span></label>
          <input className="pm-input" value={data.cidade}
            onChange={e => upd('cidade', e.target.value)} placeholder="Cidade" />
        </div>
        <div className="pm-field">
          <label className="pm-label">UF <span className="pm-req">*</span></label>
          <input className="pm-input" value={data.estado}
            onChange={e => upd('estado', e.target.value.toUpperCase())} placeholder="SP" maxLength={2} />
        </div>
      </div>

      {error && <p className="pm-error">{error}</p>}
      <div className="pm-actions">
        <button className="pm-btn-secondary" onClick={onBack}>Voltar</button>
        <button className="pm-btn-primary" onClick={next}>Próximo</button>
      </div>
    </div>
  );
}

/* ─── Step 3: Documentos ─── */
function StepDocumentos({ data, upd, onNext, onBack }) {
  const [error, setError] = useState('');
  function next() {
    if (!data.cpf.trim() || !data.rg.trim() || !data.data_nascimento.trim()) {
      setError('Preencha CPF, RG e data de nascimento.'); return;
    }
    setError(''); onNext();
  }
  return (
    <div className="pm-card">
      <h2 className="pm-title">Documentos</h2>
      <p className="pm-subtitle">Dados do seu documento de identificação.</p>

      <div className="pm-field">
        <label className="pm-label">CPF <span className="pm-req">*</span></label>
        <input className="pm-input" value={data.cpf}
          onChange={e => upd('cpf', fCPF(e.target.value))} placeholder="000.000.000-00" />
      </div>

      <div className="pm-row">
        <div className="pm-field">
          <label className="pm-label">RG <span className="pm-req">*</span></label>
          <input className="pm-input" value={data.rg}
            onChange={e => upd('rg', e.target.value)} placeholder="00.000.000-0" />
        </div>
        <div className="pm-field">
          <label className="pm-label">Data de Nascimento <span className="pm-req">*</span></label>
          <input className="pm-input" type="date" value={data.data_nascimento}
            onChange={e => upd('data_nascimento', e.target.value)} />
        </div>
      </div>

      <div className="pm-field">
        <label className="pm-label">Nome da Mãe</label>
        <input className="pm-input" value={data.nome_mae}
          onChange={e => upd('nome_mae', e.target.value)} placeholder="Nome completo da mãe (opcional)" />
      </div>

      {error && <p className="pm-error">{error}</p>}
      <div className="pm-actions">
        <button className="pm-btn-secondary" onClick={onBack}>Voltar</button>
        <button className="pm-btn-primary" onClick={next}>Próximo</button>
      </div>
    </div>
  );
}

/* ─── Step 4: Comercial ─── */
function StepComercial({ data, upd, onNext, onBack }) {
  const [error, setError] = useState('');
  function next() {
    if (!data.dia_vencimento) { setError('Selecione o melhor dia de vencimento.'); return; }
    setError(''); onNext();
  }
  return (
    <div className="pm-card">
      <h2 className="pm-title">Finalização</h2>
      <p className="pm-subtitle">Quase lá! Só mais duas informações rápidas.</p>

      <div className="pm-field">
        <label className="pm-label">Melhor dia de vencimento <span className="pm-req">*</span></label>
        <span className="pm-tip">Escolha o dia do mês mais conveniente.</span>
        <div className="pm-radio-grid">
          {['5', '10', '15', '20'].map(d => (
            <div key={d} className="pm-radio-pill">
              <input type="radio" id={`venc-${d}`} name="dia_vencimento" value={d}
                checked={data.dia_vencimento === d} onChange={() => upd('dia_vencimento', d)} />
              <label htmlFor={`venc-${d}`}>Dia {d}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="pm-field" style={{ marginTop: '1.25rem' }}>
        <label className="pm-label">Como foi o preenchimento?</label>
        <span className="pm-tip">Opcional. 1 = difícil, 5 = muito fácil.</span>
        <div className="pm-likert">
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className="pm-likert-item">
              <input type="radio" id={`fac-${n}`} name="facilidade" value={n}
                checked={Number(data.facilidade_preenchimento) === n}
                onChange={() => upd('facilidade_preenchimento', n)} />
              <label htmlFor={`fac-${n}`}>{n}</label>
            </div>
          ))}
        </div>
        <div className="pm-likert-ends"><span>Difícil</span><span>Muito fácil</span></div>
      </div>

      {error && <p className="pm-error">{error}</p>}
      <div className="pm-actions">
        <button className="pm-btn-secondary" onClick={onBack}>Voltar</button>
        <button className="pm-btn-primary" onClick={next}>Revisar</button>
      </div>
    </div>
  );
}

/* ─── Step 5: Revisão ─── */
function StepRevisao({ data, submitting, submitError, onSubmit, onBack }) {
  function Row({ label, value }) {
    if (!value) return null;
    return (
      <div className="pm-review-row">
        <span className="pm-review-key">{label}</span>
        <span className="pm-review-val">{value}</span>
      </div>
    );
  }
  return (
    <div className="pm-card">
      <h2 className="pm-title">Revisão</h2>
      <p className="pm-subtitle">Confira seus dados antes de enviar.</p>

      {(data.consultor || data.codigo_promocional) && (
        <div className="pm-review-section">
          <p className="pm-review-section-title">Informações adicionais</p>
          <Row label="Consultor" value={data.consultor} />
          <Row label="Cód. promo" value={data.codigo_promocional} />
        </div>
      )}

      <div className="pm-review-section">
        <p className="pm-review-section-title">Contato</p>
        <Row label="Nome" value={data.nome} />
        <Row label="E-mail" value={data.email} />
        <Row label="Telefone" value={data.telefone} />
      </div>

      <div className="pm-review-section">
        <p className="pm-review-section-title">Endereço</p>
        <Row label="CEP" value={data.cep} />
        <Row label="Logradouro" value={data.endereco} />
        <Row label="Número" value={data.numero} />
        <Row label="Complemento" value={data.complemento} />
        <Row label="Bairro" value={data.bairro} />
        <Row label="Cidade / UF" value={data.cidade && data.estado ? `${data.cidade} / ${data.estado}` : data.cidade || data.estado} />
      </div>

      <div className="pm-review-section">
        <p className="pm-review-section-title">Documentos</p>
        <Row label="CPF" value={data.cpf} />
        <Row label="RG" value={data.rg} />
        <Row label="Nascimento" value={data.data_nascimento} />
        <Row label="Nome da mãe" value={data.nome_mae} />
      </div>

      <div className="pm-review-section">
        <p className="pm-review-section-title">Finalização</p>
        <Row label="Vencimento" value={data.dia_vencimento ? `Dia ${data.dia_vencimento}` : ''} />
        <Row label="Facilidade" value={data.facilidade_preenchimento ? `${data.facilidade_preenchimento} / 5` : ''} />
      </div>

      {submitError && <p className="pm-error" style={{ marginBottom: '0.5rem' }}>{submitError}</p>}

      <div className="pm-actions">
        <button className="pm-btn-secondary" onClick={onBack} disabled={submitting}>Voltar</button>
        <button className="pm-btn-primary" onClick={onSubmit} disabled={submitting}>
          {submitting ? 'Enviando…' : 'Confirmar e Enviar'}
        </button>
      </div>
    </div>
  );
}

/* ─── Step 6: Concluído ─── */
function StepConcluido({ data }) {
  const nome = data.nome ? data.nome.split(' ')[0] : '';
  return (
    <div className="pm-card pm-done">
      <span className="pm-done-icon">🎓</span>
      <h2 className="pm-done-title">Ficha enviada!</h2>
      <p className="pm-done-text">
        {nome ? `${nome}, muito obrigado` : 'Muito obrigado'} pelo preenchimento.
        Nossa equipe vai entrar em contato em breve pelo e-mail{' '}
        <strong>{data.email}</strong> para os próximos passos da sua matrícula.
      </p>
    </div>
  );
}

/* ─── Componente principal ─── */
export default function Prematricula() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    consultor: '', codigo_promocional: '',
    nome: '', email: '', telefone: '',
    cep: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
    cpf: '', rg: '', data_nascimento: '', nome_mae: '',
    dia_vencimento: '', facilidade_preenchimento: '',
    source: 'edukaead-prematricula', representante: '', origem: '', radarId: '',
  });
  const [consultores, setConsultores] = useState([]);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { track, identify } = useTracking();

  useEffect(() => {
    document.title = 'Ficha de Matrícula | EdukaEAD';
    const p = new URLSearchParams(window.location.search);
    const up = {};
    if (p.get('rep'))       up.representante      = p.get('rep');
    if (p.get('ori'))       up.origem             = p.get('ori');
    if (p.get('consultor')) up.consultor          = p.get('consultor');
    if (p.get('promo'))     up.codigo_promocional = p.get('promo');

    // radarId: prioriza URL, senão usa o gerado pelo Radar ou localStorage
    const rid = p.get('radarId')?.trim() || getRadarId();
    up.radarId = rid;
    identify({ radarId: rid });

    if (Object.keys(up).length) setData(d => ({ ...d, ...up }));

    track('prematricula-view', { consultor: p.get('consultor') || '', promo: p.get('promo') || '' });

    fetch('/consultores.json')
      .then(r => r.json())
      .then(j => setConsultores(j.consultores || []))
      .catch(() => {});
  }, []);

  // Scroll para o topo ao trocar de etapa
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  function upd(field, value) { setData(d => ({ ...d, [field]: value })); }

  const STEP_NAMES = ['consultor', 'contato', 'endereco', 'documentos', 'comercial', 'revisao', 'concluido'];
  function goStep(n) {
    track('prematricula-step', { step: STEP_NAMES[n] ?? n, stepNum: n });
    setStep(n);
  }

  async function lookupCEP() {
    const cep = data.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;
    setCepLoading(true); setCepError('');
    track('prematricula-cep-lookup', { cep });
    try {
      const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const j = await r.json();
      if (j.erro) { setCepError('CEP não encontrado.'); return; }
      setData(d => ({ ...d, endereco: j.logradouro || '', bairro: j.bairro || '', cidade: j.localidade || '', estado: j.uf || '' }));
    } catch { setCepError('Erro ao buscar CEP.'); }
    finally { setCepLoading(false); }
  }

  async function handleSubmit() {
    setSubmitting(true); setSubmitError('');
    const payload = {
      ...data,
      radarId: data.radarId || getRadarId(), // garante radarId mesmo sem URL param
      student_name: data.nome,
      timestamp: new Date().toISOString(),
    };
    track('prematricula-submit', { consultor: payload.consultor, radarId: payload.radarId });
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('http');
      track('prematricula-done', { radarId: payload.radarId });
      goStep(6);
    } catch {
      setSubmitError('Erro ao enviar. Tente novamente.');
      track('prematricula-error', { radarId: payload.radarId });
    }
    finally { setSubmitting(false); }
  }

  const showProgress = step >= 1 && step <= 5;
  const progressPct  = step <= 4 ? (step / 4) * 100 : 100;
  const progressLabel = step === 5 ? 'Revisão' : `Etapa ${step} de 4`;
  const hasProg      = showProgress;

  return (
    <div className="pm-page">
      <header className="pm-header">
        <img src="/eduka-ead-logo.png" alt="EdukaEAD" className="pm-logo" />
      </header>

      {hasProg && (
        <div className="pm-progress-wrap">
          <div className="pm-progress-bar">
            <div className="pm-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="pm-progress-text">{progressLabel}</p>
        </div>
      )}

      <main className="pm-main" style={{ paddingTop: hasProg ? '8.5rem' : '5.5rem' }}>
        {step === 0 && <StepConsultor  data={data} upd={upd} consultores={consultores} onNext={() => goStep(1)} />}
        {step === 1 && <StepContato    data={data} upd={upd} onNext={() => goStep(2)} onBack={() => goStep(0)} />}
        {step === 2 && <StepEndereco   data={data} upd={upd} cepLoading={cepLoading} cepError={cepError} onLookup={lookupCEP} onNext={() => goStep(3)} onBack={() => goStep(1)} />}
        {step === 3 && <StepDocumentos data={data} upd={upd} onNext={() => goStep(4)} onBack={() => goStep(2)} />}
        {step === 4 && <StepComercial  data={data} upd={upd} onNext={() => goStep(5)} onBack={() => goStep(3)} />}
        {step === 5 && <StepRevisao    data={data} submitting={submitting} submitError={submitError} onSubmit={handleSubmit} onBack={() => goStep(4)} />}
        {step === 6 && <StepConcluido  data={data} />}
      </main>
    </div>
  );
}
