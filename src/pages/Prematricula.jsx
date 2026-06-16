/**
 * /prematricula — Ficha de Matrícula EdukaEAD
 * Multi-step form autônomo, sem backend.
 * Dados enviados via POST para o webhook n8n abaixo.
 */
import { useState, useEffect } from 'react';
import './Prematricula.css';
import { useTracking, getRadarId } from '../hooks/useTracking';

// CONFIG — edite aqui e dê build para atualizar
const WEBHOOK_URL = import.meta.env.DEV
  ? 'https://workflow.arelis.online/webhook-test/eduka-fichamatrlcula'
  : 'https://workflow.arelis.online/webhook/eduka-fichamatrlcula';

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
function fDate(v) {
  v = v.replace(/\D/g, '').slice(0, 8);
  if (v.length <= 2) return v;
  if (v.length <= 4) return `${v.slice(0, 2)}/${v.slice(2)}`;
  return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
}
function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  if (r !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  return r === parseInt(cpf[10]);
}
function dateToISO(br) {
  const parts = br.replace(/\D/g, '');
  if (parts.length !== 8) return br;
  return `${parts.slice(4)}-${parts.slice(2, 4)}-${parts.slice(0, 2)}`;
}

/* ─── Step -1: Boas-vindas ─── */
function StepBoasVindas({ onStart }) {
  return (
    <div className="pm-card pm-welcome">
      <span className="pm-welcome-icon">🎓</span>
      <h2 className="pm-title">Olá!</h2>
      <p className="pm-subtitle">
        Neste formulário vamos coletar seus dados cadastrais necessários.
      </p>
      <p className="pm-welcome-consult-note">
        Ainda não escolheu seu curso?{' '}
        <a href="https://wa.me/551151925444?text=Ol%C3%A1%2C%20ainda%20n%C3%A3o%20escolhi%20meu%20curso%20e%20gostaria%20de%20falar%20com%20um%20consultor" target="_blank" rel="noopener noreferrer">
          Fale com um consultor de carreira antes de preencher.
        </a>
      </p>
      <p className="pm-welcome-lgpd">
        Eles estão seguros de acordo com as normas da LGPD e não são compartilhados com terceiros.
      </p>
      <div className="pm-welcome-info">
        <p><strong>Usaremos suas informações para:</strong></p>
        <ul>
          <li>Cadastro no nosso sistema interno</li>
          <li>Envio para a instituição de ensino escolhida</li>
        </ul>
      </div>
      <p className="pm-welcome-time">
        O processo é rápido e simples, com tempo estimado de preenchimento de até 5 minutos.
      </p>
      <div className="pm-actions" style={{ justifyContent: 'center' }}>
        <button className="pm-btn-primary pm-btn-start" onClick={onStart}>Iniciar preenchimento</button>
      </div>
      <div className="pm-welcome-disclaimer">
        <p>
          Ao continuar, você concorda com nossa{' '}
          <a href="/info/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>{' '}
          e com os nossos <a href="/info/lgpd" target="_blank" rel="noopener noreferrer">termos de tratamento de dados (LGPD)</a>.
        </p>
      </div>
      <div className="pm-welcome-legal">
        <span>EDUKAEAD POLO EDUCACIONAL LTDA — CNPJ 59.684.524/0001-91</span>
        <span className="pm-welcome-legal-links">
          <a href="/info/privacidade" target="_blank" rel="noopener noreferrer">Privacidade</a>
          <span aria-hidden="true">·</span>
          <a href="/info/termos" target="_blank" rel="noopener noreferrer">Termos</a>
          <span aria-hidden="true">·</span>
          <a href="/info/lgpd" target="_blank" rel="noopener noreferrer">LGPD</a>
        </span>
      </div>
    </div>
  );
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
  const [errs, setErrs] = useState({});
  function e(f) { return errs[f] ? ' pm-input--error' : ''; }
  function next() {
    const e = {};
    if (!data.nome.trim())     e.nome = true;
    if (!data.email.trim())    e.email = true;
    if (!data.telefone.trim()) e.telefone = true;
    if (Object.keys(e).length) { setErrs(e); return; }
    setErrs({}); onNext();
  }
  return (
    <div className="pm-card">
      <h2 className="pm-title">Dados de Contato</h2>
      <p className="pm-subtitle">Para garantir sua comunicação conosco e com a instituição de ensino.</p>

      <div className="pm-field">
        <label className="pm-label">Nome Completo (Sem Abreviações) <span className="pm-req">*</span></label>
        <input className={`pm-input${e('nome')}`} value={data.nome}
          onChange={ev => { upd('nome', ev.target.value); setErrs(p => ({...p, nome: false})); }}
          placeholder="Nome completo sem abreviações" />
      </div>

      <div className="pm-row">
        <div className="pm-field">
          <label className="pm-label">E-mail <span className="pm-req">*</span></label>
          <input className={`pm-input${e('email')}`} type="email" value={data.email}
            onChange={ev => { upd('email', ev.target.value); setErrs(p => ({...p, email: false})); }}
            placeholder="seu@email.com" />
        </div>
        <div className="pm-field">
          <label className="pm-label">Telefone / WhatsApp <span className="pm-req">*</span></label>
          <input className={`pm-input${e('telefone')}`} type="tel" value={data.telefone}
            onChange={ev => { upd('telefone', fPhone(ev.target.value)); setErrs(p => ({...p, telefone: false})); }}
            placeholder="(11) 99999-8888" />
        </div>
      </div>

      {Object.values(errs).some(Boolean) && <p className="pm-error">Preencha todos os campos obrigatórios.</p>}
      <div className="pm-actions">
        <button className="pm-btn-secondary" onClick={onBack}>Voltar</button>
        <button className="pm-btn-primary" onClick={next}>Próximo</button>
      </div>
    </div>
  );
}

/* ─── Step 2: Endereço ─── */
function StepEndereco({ data, upd, cepLoading, cepError, onLookup, onNext, onBack }) {
  const [errs, setErrs] = useState({});
  function e(f) { return errs[f] ? ' pm-input--error' : ''; }
  function clr(f) { return ev => { upd(f, ev.target.value); setErrs(p => ({...p, [f]: false})); }; }
  function next() {
    const e = {};
    if (!data.cep.trim())      e.cep = true;
    if (!data.endereco.trim()) e.endereco = true;
    if (!data.numero.trim())   e.numero = true;
    if (!data.cidade.trim())   e.cidade = true;
    if (!data.estado.trim())   e.estado = true;
    if (Object.keys(e).length) { setErrs(e); return; }
    setErrs({}); onNext();
  }
  return (
    <div className="pm-card">
      <h2 className="pm-title">Endereço</h2>
      <p className="pm-subtitle">Informe seu endereço residencial completo.</p>

      <div className="pm-cep-group">
        <div className="pm-field">
          <label className="pm-label">CEP <span className="pm-req">*</span></label>
          <input className={`pm-input${e('cep')}`} value={data.cep}
            onChange={ev => { upd('cep', fCEP(ev.target.value)); setErrs(p => ({...p, cep: false})); }}
            onBlur={onLookup} placeholder="00000-000" />
        </div>
        <button className="pm-btn-cep" onClick={onLookup} disabled={cepLoading}>
          {cepLoading ? 'Buscando…' : 'Buscar'}
        </button>
      </div>
      {cepError && <p className="pm-error">{cepError}</p>}

      <div className="pm-field">
        <label className="pm-label">Logradouro <span className="pm-req">*</span></label>
        <input className={`pm-input${e('endereco')}`} value={data.endereco}
          onChange={clr('endereco')} placeholder="Rua, Avenida…" />
      </div>

      <div className="pm-row">
        <div className="pm-field">
          <label className="pm-label">Número <span className="pm-req">*</span></label>
          <input className={`pm-input${e('numero')}`} value={data.numero}
            onChange={clr('numero')} placeholder="123" />
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
          <input className={`pm-input${e('cidade')}`} value={data.cidade}
            onChange={clr('cidade')} placeholder="Cidade" />
        </div>
        <div className="pm-field">
          <label className="pm-label">UF <span className="pm-req">*</span></label>
          <input className={`pm-input${e('estado')}`} value={data.estado}
            onChange={ev => { upd('estado', ev.target.value.toUpperCase()); setErrs(p => ({...p, estado: false})); }}
            placeholder="SP" maxLength={2} />
        </div>
      </div>

      {Object.values(errs).some(Boolean) && <p className="pm-error">Preencha os campos obrigatórios.</p>}
      <div className="pm-actions">
        <button className="pm-btn-secondary" onClick={onBack}>Voltar</button>
        <button className="pm-btn-primary" onClick={next}>Próximo</button>
      </div>
    </div>
  );
}

/* ─── Step 3: Documentos ─── */
function StepDocumentos({ data, upd, onNext, onBack }) {
  const [errs, setErrs] = useState({});
  function e(f) { return errs[f] ? ' pm-input--error' : ''; }
  function clr(f, val) { upd(f, val); setErrs(p => ({...p, [f]: false})); }
  function next() {
    const e = {};
    if (!data.cpf.trim())              e.cpf = true;
    if (!validateCPF(data.cpf))        e.cpf = true;
    if (!data.rg.trim())               e.rg = true;
    if (!data.data_nascimento.trim())  e.data_nascimento = true;
    const parts = data.data_nascimento.replace(/\D/g, '');
    if (parts.length !== 8)            e.data_nascimento = true;
    if (!data.nome_mae.trim())         e.nome_mae = true;
    if (!data.naturalidade.trim())     e.naturalidade = true;
    if (Object.keys(e).length) { setErrs(e); return; }
    setErrs({}); onNext();
  }
  return (
    <div className="pm-card">
      <h2 className="pm-title">Documentos</h2>
      <p className="pm-subtitle">Dados do seu documento de identificação.</p>

      <div className="pm-field">
        <label className="pm-label">CPF <span className="pm-req">*</span></label>
        <input className={`pm-input${e('cpf')}`} value={data.cpf} inputMode="numeric"
          onChange={ev => clr('cpf', fCPF(ev.target.value))} placeholder="000.000.000-00" />
        {errs.cpf && data.cpf.replace(/\D/g,'').length === 11 && <span className="pm-field-error">CPF inválido.</span>}
      </div>

      <div className="pm-row">
        <div className="pm-field">
          <label className="pm-label">RG <span className="pm-req">*</span></label>
          <input className={`pm-input${e('rg')}`} value={data.rg}
            onChange={ev => clr('rg', ev.target.value)} placeholder="00.000.000-0" />
        </div>
        <div className="pm-field">
          <label className="pm-label">Data de Nascimento <span className="pm-req">*</span></label>
          <input className={`pm-input${e('data_nascimento')}`} value={data.data_nascimento} inputMode="numeric"
            onChange={ev => clr('data_nascimento', fDate(ev.target.value))}
            placeholder="DD/MM/AAAA" maxLength={10} />
        </div>
      </div>

      <div className="pm-field">
        <label className="pm-label">Naturalidade <span className="pm-req">*</span></label>
        <span className="pm-tip">Cidade de nascimento.</span>
        <input className={`pm-input${e('naturalidade')}`} value={data.naturalidade}
          onChange={ev => clr('naturalidade', ev.target.value)} placeholder="Ex: São Paulo / SP" />
      </div>

      <div className="pm-field">
        <label className="pm-label">Nome da Mãe <span className="pm-req">*</span></label>
        <input className={`pm-input${e('nome_mae')}`} value={data.nome_mae}
          onChange={ev => clr('nome_mae', ev.target.value)} placeholder="Nome completo da mãe" />
      </div>

      {Object.values(errs).some(Boolean) && <p className="pm-error">Verifique os campos destacados.</p>}
      <div className="pm-actions">
        <button className="pm-btn-secondary" onClick={onBack}>Voltar</button>
        <button className="pm-btn-primary" onClick={next}>Próximo</button>
      </div>
    </div>
  );
}

/* ─── Step 4: Perfil Profissional ─── */
const AREAS = [
  'Guardas Municipais',
  'Professores',
  'Carreira Pública',
  'Carreira Privada',
  'Estudante',
  'Aposentados',
  'Outros',
];

function StepPerfil({ data, upd, onNext, onBack }) {
  const [error, setError] = useState('');
  function next() {
    if (!data.grupo) { setError('Selecione a opção mais próxima da sua área.'); return; }
    setError(''); onNext();
  }
  return (
    <div className="pm-card">
      <h2 className="pm-title">Perfil Profissional</h2>
      <p className="pm-subtitle">Qual área mais representa sua atuação profissional?</p>

      <div className="pm-field">
        <div className="pm-radio-grid pm-radio-grid--col1">
          {AREAS.map(a => (
            <div key={a} className="pm-radio-pill">
              <input type="radio" id={`area-${a}`} name="area_atuacao" value={a}
                checked={data.grupo === a} onChange={() => upd('grupo', a)} />
              <label htmlFor={`area-${a}`}>{a}</label>
            </div>
          ))}
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

/* ─── Step 5: Comercial ─── */
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
        <label className="pm-label">Nos ajude a melhorar: quão fácil foi o preenchimento deste formulário?</label>
        <span className="pm-tip">Opcional. 1 = muito difícil, 5 = muito fácil.</span>
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
        <Row label="Naturalidade" value={data.naturalidade} />
      </div>

      <div className="pm-review-section">
        <p className="pm-review-section-title">Finalização</p>
        <Row label="Área de atuação" value={data.grupo} />
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
      <div className="pm-done-image-wrap">
        <img
          src="/okform-edukaead-sucesso-noenvio.jpg"
          alt="Equipe EdukaEAD celebrando"
          className="pm-done-image"
        />
      </div>
      <h2 className="pm-done-title">Agradecemos sua resposta =)</h2>
      <p className="pm-done-text">
        {nome ? <><strong>{nome}</strong>, muito obrigado</> : 'Muito obrigado'} pelo preenchimento!
        Nossa equipe vai dar continuidade ao seu processo de matrícula.{' '}
        <strong className="pm-done-close">Pode fechar esta tela.</strong>
      </p>
      <div className="pm-done-doc-cta">
        <p className="pm-done-doc-claim">Aproveite e envie uma cópia do seu documento agora — é rápido e seguro.</p>
        <a href="/documentos" className="pm-btn-primary pm-done-btn">Enviar meu documento</a>
      </div>
      <div className="pm-done-actions">
        <a href="/" className="pm-btn-secondary pm-done-btn">Voltar ao site</a>
      </div>
    </div>
  );
}

/* ─── Componente principal ─── */
export default function Prematricula() {
  const [step, setStep] = useState(-1);
  const [data, setData] = useState({
    consultor: '', codigo_promocional: '',
    nome: '', email: '', telefone: '',
    cep: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
    cpf: '', rg: '', data_nascimento: '', nome_mae: '', naturalidade: '',
    grupo: '',
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

    // Limpa parâmetros da URL sem recarregar a página
    if (p.toString()) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    track('prematricula-view', { consultor: p.get('consultor') || '', promo: p.get('promo') || '' });

    fetch('/consultores.json')
      .then(r => r.json())
      .then(j => setConsultores(j.consultores || []))
      .catch(() => {});
  }, []);

  // Scroll para o topo ao trocar de etapa
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  function upd(field, value) { setData(d => ({ ...d, [field]: value })); }

  const STEP_NAMES = ['consultor', 'contato', 'endereco', 'documentos', 'perfil', 'comercial', 'revisao', 'concluido'];
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
        body: JSON.stringify({ ...payload, data_nascimento: dateToISO(payload.data_nascimento) }),
      });
      if (!res.ok) throw new Error('http');
      track('prematricula-done', { radarId: payload.radarId });
      goStep(7);
    } catch {
      setSubmitError('Erro ao enviar. Tente novamente.');
      track('prematricula-error', { radarId: payload.radarId });
    }
    finally { setSubmitting(false); }
  }

  const showProgress = step >= 1 && step <= 6;
  const progressPct  = step <= 5 ? (step / 5) * 100 : 100;
  const progressLabel = step === 6 ? 'Revisão' : `Etapa ${step} de 5`;
  const hasProg      = showProgress;

  function startForm() {
    track('prematricula-start', {});
    goStep(0);
  }

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
        {step === -1 && <StepBoasVindas onStart={startForm} />}
        {step === 0 && <StepConsultor  data={data} upd={upd} consultores={consultores} onNext={() => goStep(1)} />}
        {step === 1 && <StepContato    data={data} upd={upd} onNext={() => goStep(2)} onBack={() => goStep(0)} />}
        {step === 2 && <StepEndereco   data={data} upd={upd} cepLoading={cepLoading} cepError={cepError} onLookup={lookupCEP} onNext={() => goStep(3)} onBack={() => goStep(1)} />}
        {step === 3 && <StepDocumentos data={data} upd={upd} onNext={() => goStep(4)} onBack={() => goStep(2)} />}
        {step === 4 && <StepPerfil     data={data} upd={upd} onNext={() => goStep(5)} onBack={() => goStep(3)} />}
        {step === 5 && <StepComercial  data={data} upd={upd} onNext={() => goStep(6)} onBack={() => goStep(4)} />}
        {step === 6 && <StepRevisao    data={data} submitting={submitting} submitError={submitError} onSubmit={handleSubmit} onBack={() => goStep(5)} />}
        {step === 7 && <StepConcluido  data={data} />}
      </main>
    </div>
  );
}
