/**
 * /documentos — Envio de Documentos EdukaEAD
 * Formulário desacoplado para upload de documentos via webhook n8n.
 */
import { useState } from 'react';
import './Documentos.css';

const WEBHOOK_URL = import.meta.env.DEV
  ? 'https://workflow.arelis.online/webhook-test/eduka-documento-intake'
  : 'https://workflow.arelis.online/webhook/eduka-documento-intake';

const TIPOS = [
  { value: 'rg',          label: 'RG — Registro Geral' },
  { value: 'cnh',         label: 'CNH — Carteira de Motorista' },
  { value: 'certidao',    label: 'Certidão (nascimento/casamento)' },
  { value: 'conclusao',   label: 'Certificado de Conclusão' },
  { value: 'diploma',     label: 'Diploma' },
  { value: 'outro',       label: 'Outro documento' },
];

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

/* ─── Validação CPF ─── */
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

function fCPF(v) {
  v = v.replace(/\D/g, '').slice(0, 11);
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
}

/* ─── Badges de segurança ─── */
function SecurityBadges() {
  return (
    <div className="doc-security-badges">
      <span className="doc-badge">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Transmissão criptografada
      </span>
      <span className="doc-badge">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Dados protegidos
      </span>
    </div>
  );
}

/* ─── Rodapé legal ─── */
function LegalFooter({ showClaim = false }) {
  return (
    <div className="doc-welcome-legal">
      {showClaim && (
        <p className="doc-legal-claim">
          Ao enviar seu documento por este formulário, o armazenamento do arquivo é controlado e registrado de forma segura. O acesso é restrito à nossa equipe e ao processo de envio à instituição de ensino.
        </p>
      )}
      <span>EDUKAEAD POLO EDUCACIONAL LTDA — CNPJ 59.684.524/0001-91</span>
      <span className="doc-welcome-legal-links">
        <a href="/info/privacidade" target="_blank" rel="noopener noreferrer">Privacidade</a>
        <span aria-hidden="true">·</span>
        <a href="/info/termos" target="_blank" rel="noopener noreferrer">Termos</a>
        <span aria-hidden="true">·</span>
        <a href="/info/lgpd" target="_blank" rel="noopener noreferrer">LGPD</a>
      </span>
    </div>
  );
}

/* ─── Tela 0: Boas-vindas ─── */
function StepBoasVindas({ onStart }) {
  return (
    <div className="doc-card doc-welcome">
      <span className="doc-welcome-icon">📄</span>
      <h2 className="doc-title">Envio de Documentos</h2>
      <p className="doc-subtitle">
        Já fez sua pré-matrícula e seu consultor solicitou um documento? Envie aqui de forma segura.
      </p>
      <SecurityBadges />
      <div className="doc-welcome-info">
        <p><strong>Como funciona:</strong></p>
        <ul>
          <li>Informe seu CPF</li>
          <li>Selecione o tipo de documento</li>
          <li>Anexe o arquivo (PDF ou imagem, máx. 10MB)</li>
        </ul>
      </div>
      <div className="doc-actions" style={{ justifyContent: 'center', marginTop: '1rem' }}>
        <button className="doc-btn-primary doc-btn-start" onClick={onStart}>
          Enviar documento
        </button>
      </div>
      <LegalFooter showClaim />
    </div>
  );
}

/* ─── Tela 1: Upload ─── */
function StepUpload({ cpf, setCpf, onDone }) {
  const [tipo, setTipo] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [fileErr, setFileErr] = useState('');
  const [cpfErr, setCpfErr] = useState(false);
  const [tipoErr, setTipoErr] = useState(false);
  const [arquivoErr, setArquivoErr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleFile(ev) {
    const file = ev.target.files[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setFileErr('Arquivo deve ter no máximo 10MB.');
      setArquivo(null);
      ev.target.value = '';
      return;
    }
    setArquivo(file);
    setFileErr('');
    setArquivoErr(false);
  }

  async function handleSubmit() {
    const cpfInvalid = !cpf.trim() || !validateCPF(cpf);
    const tipoInvalid = !tipo;
    const arquivoInvalid = !arquivo;
    setCpfErr(cpfInvalid);
    setTipoErr(tipoInvalid);
    setArquivoErr(arquivoInvalid);
    if (cpfInvalid || tipoInvalid || arquivoInvalid) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      const form = new FormData();
      form.append('cpf', cpf.replace(/\D/g, ''));
      form.append('tipo_documento', tipo);
      form.append('documento', arquivo, arquivo.name);
      form.append('timestamp', new Date().toISOString());
      form.append('source', 'edukaead-documentos');
      const res = await fetch(WEBHOOK_URL, { method: 'POST', body: form });
      if (!res.ok) throw new Error('http');
      onDone();
    } catch {
      setSubmitError('Erro ao enviar. Verifique sua conexão e tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="doc-card">
      <h2 className="doc-title">Seus dados</h2>
      <p className="doc-subtitle">Informe o CPF cadastrado e selecione o documento a enviar.</p>
      <SecurityBadges />

      <div className="doc-field">
        <label className="doc-label">CPF <span className="doc-req">*</span></label>
        <input
          className={`doc-input${cpfErr ? ' doc-input--error' : ''}`}
          value={cpf}
          inputMode="numeric"
          onChange={ev => { setCpf(fCPF(ev.target.value)); setCpfErr(false); }}
          placeholder="000.000.000-00"
        />
        {cpfErr && cpf.replace(/\D/g, '').length === 11 && <span className="doc-field-error">CPF inválido.</span>}
        {cpfErr && cpf.replace(/\D/g, '').length < 11 && <span className="doc-field-error">Informe o CPF completo.</span>}
      </div>

      <div className="doc-field">
        <label className="doc-label">Tipo de documento <span className="doc-req">*</span></label>
        <select
          className={`doc-input doc-select${tipoErr ? ' doc-input--error' : ''}`}
          value={tipo}
          onChange={ev => { setTipo(ev.target.value); setTipoErr(false); }}
        >
          <option value="">Selecione…</option>
          {TIPOS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        {tipoErr && <span className="doc-field-error">Selecione o tipo do documento.</span>}
      </div>

      <div className="doc-field">
        <label className="doc-label">Arquivo <span className="doc-req">*</span></label>
        <span className="doc-tip">PDF ou imagem. Máximo 10MB.</span>
        <label className={`doc-upload-area${arquivoErr || fileErr ? ' doc-input--error' : ''}${arquivo ? ' doc-upload-area--ok' : ''}`}>
          <input type="file" accept="image/jpeg,image/png,image/webp,.pdf" capture={undefined} className="doc-upload-input" onChange={handleFile} />
          {arquivo ? (
            <span className="doc-upload-name">✓ {arquivo.name}</span>
          ) : (
            <span className="doc-upload-placeholder">
              <span className="doc-upload-icon">📎</span>
              Clique para selecionar o arquivo
            </span>
          )}
        </label>
        {fileErr && <span className="doc-field-error">{fileErr}</span>}
        {arquivoErr && !fileErr && <span className="doc-field-error">Selecione um arquivo.</span>}
      </div>

      {submitError && <p className="doc-error">{submitError}</p>}

      <div className="doc-actions">
        <button className="doc-btn-primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Enviando…' : 'Enviar documento'}
        </button>
      </div>
      <LegalFooter />
    </div>
  );
}

/* ─── Tela 2: Confirmação ─── */
function StepConcluido({ cpf, onOutro }) {
  return (
    <div className="doc-card doc-done">
      <span className="doc-done-icon">✅</span>
      <h2 className="doc-done-title">Documento recebido!</h2>
      <p className="doc-done-text">
        Documento enviado com sucesso para o CPF <strong>{cpf}</strong>.
        Nossa equipe já está processando e você será informado pelo consultor responsável.{' '}
        <strong className="doc-done-close">Pode fechar esta tela.</strong>
      </p>
      <div className="doc-done-actions">
        <button className="doc-btn-primary doc-done-btn" onClick={onOutro}>
          Enviar outro documento
        </button>
        <a href="/" className="doc-btn-secondary doc-done-btn">Voltar ao site</a>
      </div>
    </div>
  );
}

/* ─── Componente principal ─── */
export default function Documentos() {
  const [step, setStep] = useState(0);
  const [cpf, setCpf] = useState('');

  function handleOutro() {
    setStep(1);
  }

  return (
    <div className="doc-page">
      <header className="doc-header">
        <img src="/eduka-ead-logo.png" alt="EdukaEAD" className="doc-logo" />
      </header>
      <main className="doc-main">
        {step === 0 && <StepBoasVindas onStart={() => setStep(1)} />}
        {step === 1 && <StepUpload cpf={cpf} setCpf={setCpf} onDone={() => setStep(2)} />}
        {step === 2 && <StepConcluido cpf={cpf} onOutro={handleOutro} />}
      </main>
    </div>
  );
}
