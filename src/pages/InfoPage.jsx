import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './InfoPage.css';

export default function InfoPage() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('loading');

  // Gera um título amigável para melhorar a leitura no topo da página.
  const title = useMemo(() => {
    if (!slug) return 'Informações';
    return slug
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }, [slug]);

  useEffect(() => {
    document.title = title ? `${title} | EdukaEAD` : 'EdukaEAD';
  }, [title]);

  useEffect(() => {
    let isMounted = true;

    async function loadMarkdown() {
      if (!slug) {
        if (isMounted) setStatus('not-found');
        return;
      }

      try {
        const response = await fetch(`/pages/${slug}.md`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Arquivo não encontrado');
        const markdown = await response.text();
        if (!isMounted) return;
        setContent(markdown);
        setStatus('ok');
      } catch (error) {
        if (!isMounted) return;
        setStatus('not-found');
      }
    }

    loadMarkdown();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <section className="info-page fluid-section">
        <div className="fluid-container">
          <div className="info-card glass-panel">
            <p className="info-loading">Carregando conteúdo...</p>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'not-found') {
    return (
      <section className="info-page fluid-section">
        <div className="fluid-container">
          <div className="info-card glass-panel">
            <h1 className="info-title">Conteúdo não encontrado</h1>
            <p className="info-error">
              Não localizamos o arquivo em <code>/public/pages/{slug}.md</code>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="info-page fluid-section">
      <div className="fluid-container">
        <article className="info-card glass-panel">
          <p className="info-eyebrow">Informações</p>
          <h1 className="info-title">{title}</h1>
          <div className="info-divider" />
          <div className="info-markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </section>
  );
}
