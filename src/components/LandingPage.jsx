import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, BookOpen, ShieldCheck, TrendingUp, Target,
    CheckCircle2, MessageCircle, GraduationCap, Award, Landmark, Briefcase
} from 'lucide-react';
import GcmHierarchy from './GcmHierarchy';
import ProfessoresCarreira from './ProfessoresCarreira';
import './LandingPage.css';

// Ícones dos caminhos de transição de carreira
const TRANSICAO_ICONS = {
    award: Award,
    graduation: GraduationCap,
};

// Mapa de ícones para os cards de audiência
const AUDIENCE_ICONS = {
    shield: ShieldCheck,
    graduation: GraduationCap,
    landmark: Landmark,
    bookopen: BookOpen,
    award: Award,
    trending: TrendingUp,
    briefcase: Briefcase,
};

export default function LandingPage({ content }) {
    const observerRef = useRef(null);

    // Slideshow: índice da imagem ativa (usado quando hero.images é array)
    const [activeSlide, setActiveSlide] = useState(0);
    const heroImages = content.hero.images;

    // Reseta o slide ao navegar entre páginas
    useEffect(() => { setActiveSlide(0); }, [content]);

    // Avança o slide a cada 4s quando há múltiplas imagens
    useEffect(() => {
        if (!heroImages || heroImages.length <= 1) return;
        const id = setInterval(() => {
            setActiveSlide(i => (i + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(id);
    }, [heroImages]);

    useEffect(() => {
        const elements = document.querySelectorAll('.scroll-animate');
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(el => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [content]);

    // Hero CTA rola até a seção final (#contato) em vez de abrir o WhatsApp
    const scrollToFinalCta = (e) => {
        e.preventDefault();
        document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (!content) return null;

    // Cascata da home fica em primeiraGraduacao; demais páginas usam content.cascata
    const cascata = content.primeiraGraduacao?.cascata ?? content.cascata;

    return (
        <div className={`lp-wrapper${content.audiences ? ' lp-home' : ''}${content.themeClass ? ` ${content.themeClass}` : ''}`}>

            {/* Orbs decorativos de fundo */}
            <div className="glow-orb cyan lp-glow-top-left"></div>
            <div className="glow-orb indigo lp-glow-top-right"></div>

            {/* ============ 1. HERO ============ */}
            <section className="fluid-section hero-section">

                {/* Fundo: slideshow (images[]) ou estático (image) — renderizado abaixo do conteúdo */}
                {heroImages ? (
                    <div className="hero-bg" aria-hidden="true">
                        {heroImages.map((src, i) => (
                            <div
                                key={src}
                                className={`hero-slide${i === activeSlide ? ' active' : ''}`}
                                style={{ backgroundImage: `url('${src}')` }}
                            />
                        ))}
                        <div className="hero-bg-overlay" />
                    </div>
                ) : content.hero.image ? (
                    <div className="hero-bg" aria-hidden="true">
                        <div className="hero-slide active" style={{ backgroundImage: `url('${content.hero.image}')` }} />
                        <div className="hero-bg-overlay" />
                    </div>
                ) : null}

                <div className="fluid-container">
                    <div className="hero-inner">

                        {/* Esquerda: conteúdo principal */}
                        <div className="hero-content">
                            <div className="hero-tag animate-fade-in-up">
                                <span className="hero-tag-dot"></span>
                                <span className="hero-tag-text">{content.hero.tag}</span>
                            </div>

                            <h1 className="hero-title animate-fade-in-up delay-100">
                                {content.hero.headlinePre}{' '}
                                <span className="text-gradient">{content.hero.headlineGradient}</span>
                                <span className="text-gradient-accent">{content.hero.headlineAccent}</span>
                            </h1>

                            <p className="hero-subtitle animate-fade-in-up delay-200">
                                {content.hero.subtitle}
                            </p>

                            <div className="hero-cta-row animate-fade-in-up delay-300">
                                <a
                                    href="#contato"
                                    onClick={scrollToFinalCta}
                                    className="btn btn-accent"
                                >
                                    {content.hero.cta} <ArrowRight size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Direita: cards de métricas */}
                        <div className="hero-visual animate-fade-in-up delay-200">
                            {content.hero.stats?.map((stat, idx) => (
                                <div key={idx} className="hero-stat-card scroll-animate">
                                    <p dangerouslySetInnerHTML={{ __html: stat }} />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* ============ 2. AUDIENCES (opcional — home) ============ */}
            {content.audiences && (
                <section className="fluid-section audiences-section">
                    <div className="section-top-line"></div>
                    <div className="fluid-container">

                        <div className="audiences-header scroll-animate">
                            <h2 className="section-title">{content.audiences.title}</h2>
                            <p className="audiences-subtitle">{content.audiences.subtitle}</p>
                        </div>

                        {/* Linha 1 — 4 nichos com página própria (grid de 4 colunas) */}
                        <div className="audiences-grid-primary">
                            {content.audiences.cards.filter(c => c.primary).map((card, idx) => {
                                const IconComponent = AUDIENCE_ICONS[card.icon] || Target;
                                const cardContent = (
                                    <>
                                        <div className="audience-icon primary">
                                            <IconComponent size={26} />
                                        </div>
                                        <h3 className="audience-title">{card.title}</h3>
                                        <p className="audience-desc">{card.desc}</p>
                                        <span className="audience-cta">
                                            {card.cta} <ArrowRight size={16} />
                                        </span>
                                    </>
                                );
                                return (
                                    <Link key={idx} to={card.path} className="audience-card scroll-animate primary">
                                        {cardContent}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Linha 2 — 3 âncoras de serviço genéricas (grid de 3 colunas) */}
                        <div className="audiences-grid-secondary">
                            {content.audiences.cards.filter(c => !c.primary).map((card, idx) => {
                                const IconComponent = AUDIENCE_ICONS[card.icon] || Target;
                                const cardContent = (
                                    <>
                                        <div className="audience-icon">
                                            <IconComponent size={26} />
                                        </div>
                                        <h3 className="audience-title">{card.title}</h3>
                                        <p className="audience-desc">{card.desc}</p>
                                        <span className="audience-cta">
                                            {card.cta} <ArrowRight size={16} />
                                        </span>
                                    </>
                                );
                                // Prioridade: âncora local > WhatsApp
                                return card.anchor ? (
                                    <a key={idx} href={card.anchor} className="audience-card scroll-animate">
                                        {cardContent}
                                    </a>
                                ) : (
                                    <a key={idx} href={card.waLink} target="_blank" rel="noopener noreferrer" className="audience-card scroll-animate">
                                        {cardContent}
                                    </a>
                                );
                            })}
                        </div>

                    </div>
                </section>
            )}

            {/* ============ 2b. PRIMEIRA GRADUAÇÃO ============ */}
            {content.primeiraGraduacao && (
                <section id="primeira-graduacao" className="fluid-section grad-section">
                    <div className="section-top-line"></div>
                    <div className="fluid-container">
                        <div className="grad-inner">
                            <div className="grad-content scroll-animate">
                                <div className="niche-tag">{content.primeiraGraduacao.tag}</div>
                                <h2 className="section-title">{content.primeiraGraduacao.title}</h2>
                                <p className="grad-desc">{content.primeiraGraduacao.desc}</p>
                                <ul className="niche-list">
                                    {content.primeiraGraduacao.list.map((item, i) => (
                                        <li key={i} className="niche-list-item">
                                            <CheckCircle2 size={24} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                                            <span className="niche-list-text">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href={content.waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline scroll-animate delay-200"
                                >
                                    {content.primeiraGraduacao.cta} <ArrowRight size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ============ 2c. CASCATA DE FORMAÇÕES (após primeira graduação na home) ============ */}
            {cascata && (
                <section id="primeira-graduacao-jornada" className="fluid-section cascade-section">
                    <div className="section-top-line"></div>
                    <div className="fluid-container">
                        <div className="cascade-header scroll-animate">
                            <h2 className="section-title">{cascata.title}</h2>
                            <p className="cascade-subtitle">{cascata.subtitle}</p>
                        </div>
                        <div className="cascade-flow scroll-animate delay-100">
                            {cascata.steps.map((step, i) => (
                                <React.Fragment key={i}>
                                    <div className="cascade-step">
                                        <span className="cascade-step-num">{step.num}</span>
                                        <h4 className="cascade-step-title">{step.title}</h4>
                                        <p className="cascade-step-sub">{step.sub}</p>
                                        <span className="cascade-step-highlight">{step.highlight}</span>
                                    </div>
                                    {i < cascata.steps.length - 1 && (
                                        <div className="cascade-arrow">
                                            <ArrowRight size={20} />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============ 2d. PÓS-GRADUAÇÃO & MBA ============ */}
            {content.posGraduacao && (
                <section id="pos-graduacao" className="fluid-section posgrad-section">
                    <div className="section-top-line"></div>
                    <div className="fluid-container">
                        <div className="posgrad-header scroll-animate">
                            <div className="niche-tag">{content.posGraduacao.tag}</div>
                            <h2 className="section-title">{content.posGraduacao.title}</h2>
                            <p className="grad-desc">{content.posGraduacao.desc}</p>
                        </div>
                        <div className="posgrad-stats scroll-animate delay-100">
                            {content.posGraduacao.highlights.map((h, i) => (
                                <div key={i} className="posgrad-stat">
                                    <span className="posgrad-stat-num">{h.stat}</span>
                                    <span className="posgrad-stat-label">{h.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="posgrad-areas scroll-animate delay-200">
                            {content.posGraduacao.areas.map((area, i) => (
                                <span key={i} className="posgrad-area-tag">{area}</span>
                            ))}
                        </div>

                        {content.posGraduacao.fechamento && (
                            <div className="posgrad-fechamento scroll-animate delay-300">
                                <p className="posgrad-fechamento-desc">
                                    {content.posGraduacao.fechamento.desc}
                                </p>
                                <a
                                    href="#contato"
                                    onClick={scrollToFinalCta}
                                    className="btn btn-accent"
                                >
                                    {content.posGraduacao.fechamento.cta} <ArrowRight size={20} />
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ============ 2e. TRANSIÇÃO DE CARREIRA ============ */}
            {content.transicao && (
                <section id="transicao" className="fluid-section small-padding transicao-section">
                    <div className="fluid-container scroll-animate">
                        <div className="transicao-panel">
                            <div className="niche-tag">{content.transicao.tag}</div>
                            <h2 className="section-title transicao-title">{content.transicao.title}</h2>
                            <p className="transicao-desc">{content.transicao.desc}</p>

                            {content.transicao.caminhos && (
                                <div className="transicao-caminhos">
                                    {content.transicao.caminhos.map((caminho, i) => {
                                        const CaminhoIcon = TRANSICAO_ICONS[caminho.icon] || Award;
                                        return (
                                            <div
                                                key={i}
                                                className={`transicao-caminho-card scroll-animate delay-${(i + 1) * 100}${caminho.preferred ? ' transicao-caminho-card--preferred' : ''}`}
                                            >
                                                <div className="transicao-caminho-card-head">
                                                    <span className={`transicao-caminho-badge${caminho.preferred ? ' transicao-caminho-badge--preferred' : ''}`}>
                                                        {caminho.badge}
                                                    </span>
                                                    <CaminhoIcon size={28} className="transicao-caminho-icon" aria-hidden="true" />
                                                </div>
                                                <h3 className="transicao-caminho-title">{caminho.title}</h3>
                                                <p className="transicao-caminho-desc">{caminho.desc}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <a
                                href={content.transicao.waLink || content.waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline transicao-cta"
                            >
                                {content.transicao.cta} <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* ============ 3. ADVANTAGE ============ */}
            <section id="vantagens" className="fluid-section advantage-section">
                <div className="section-top-line"></div>
                <div className="fluid-container">

                    <div className="advantage-header scroll-animate">
                        <h2 className="section-title">{content.advantage.title}</h2>
                        <p className="advantage-desc">{content.advantage.desc}</p>
                    </div>

                    <div className="advantage-cards">
                        <div className="advantage-card scroll-animate delay-100">
                            <div className="card-icon cyan">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="card-title">{content.advantage.card1.title}</h3>
                            <p className="card-body">{content.advantage.card1.body}</p>
                        </div>

                        <div className="advantage-card scroll-animate delay-200">
                            <div className="card-icon cyan">
                                <Target size={32} />
                            </div>
                            <h3 className="card-title">{content.advantage.card2.title}</h3>
                            <p className="card-body">{content.advantage.card2.body}</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ============ 3.5 INFORMACIONAL (opcional — ex: /guardas, /professores) ============ */}
            {content.informational && (
                <section className="fluid-section small-padding informational-section">
                    <div className="fluid-container scroll-animate delay-100">
                        <div className="info-panel">
                            <div className="info-header">
                                <BookOpen size={28} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                                <h2 className="info-title">{content.informational.title}</h2>
                            </div>
                            <div className="info-content">
                                {content.informational.content.map((paragraph, idx) => (
                                    <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                                ))}
                                {/* Hierarquia GCM — exclusivo de /guardas */}
                                {content.informational.showHierarchy && <GcmHierarchy />}
                                {/* Carreira docente — exclusivo de /professores */}
                                {content.informational.showProfessoresCarreira && <ProfessoresCarreira />}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ============ 4. NICHE ============ */}
            {/* bg-image-overlay ativa imagem de fundo via CSS var --section-bg — definida pelo tema */}
            <section
                id="autoridade"
                className="fluid-section niche-section bg-image-overlay"
                style={content.niche.bgImage
                    ? { '--section-bg': `url('${content.niche.bgImage}')` }
                    : undefined
                }
            >
                <div className="fluid-container">
                    <div className="niche-grid">

                        {/* Esquerda: contexto e lista */}
                        <div className="niche-content">
                            <div className="niche-tag scroll-animate">{content.niche.tag}</div>

                            <h2 className="section-title niche-title scroll-animate delay-100">
                                {content.niche.title}
                            </h2>

                            <p className="niche-desc scroll-animate delay-200">
                                {content.niche.desc}
                            </p>

                            <ul className="niche-list scroll-animate delay-300">
                                {content.niche.list.map((item, idx) => (
                                    <li key={idx} className="niche-list-item">
                                        <CheckCircle2 size={24} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                                        <span className="niche-list-text">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={content.waLink || 'https://wa.me/551151925444'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline scroll-animate delay-400"
                            >
                                {content.niche.cta} <ArrowRight size={20} />
                            </a>
                        </div>

                        {/* Direita: painel visual */}
                        <div className="niche-visual scroll-animate">
                            <div className="niche-panel">
                                <div className="niche-panel-icon">
                                    <ShieldCheck size={28} />
                                </div>
                                <h4 className="niche-panel-title">{content.niche.boxTitle}</h4>
                                <p className="niche-panel-desc">{content.niche.boxDesc}</p>
                                <div className="niche-panel-divider"></div>
                                <p className="niche-panel-tagline">EdukaEAD — Consultoria de Carreira</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============ 5. FINAL CTA ============ */}
            <section id="contato" className="fluid-section small-padding finalcta-section">
                <div className="glow-orb cyan finalcta-glow"></div>

                <div className="fluid-container finalcta-container scroll-animate">
                    <div className="finalcta-panel">
                        <h2 className="section-title finalcta-title scroll-animate delay-100">
                            {content.finalCta.title}
                        </h2>
                        <p className="finalcta-desc scroll-animate delay-200">
                            {content.finalCta.desc}
                        </p>
                        <div className="finalcta-action scroll-animate delay-300">
                            <span className="finalcta-label">
                                <MessageCircle size={18} />
                                Atendimento via WhatsApp
                            </span>
                            <a
                                href={content.waLink || 'https://wa.me/551151925444'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ padding: '20px 52px', fontSize: '1.2rem' }}
                            >
                                Falar Agora
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
