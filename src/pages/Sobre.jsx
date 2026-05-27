import React, { useEffect, useRef } from 'react';
import {
    ArrowRight,
    Award,
    Users,
    BookOpen,
    MessageCircle,
    GraduationCap,
    Layers,
    TrendingUp,
    Briefcase,
    Target,
    CheckCircle2,
} from 'lucide-react';
import { SOBRE_CONTENT } from '../data/sobre';
import '../components/LandingPage.css';
import './Sobre.css';

// Mapa de ícones usados na página
const SOBRE_ICONS = {
    award: Award,
    users: Users,
    book: BookOpen,
    graduation: GraduationCap,
    layers: Layers,
    bookopen: BookOpen,
    trending: TrendingUp,
    briefcase: Briefcase,
};

export default function Sobre() {
    const { hero, stats, quemSomos, pilares, consultoria, modalidades, coach, finalCta } = SOBRE_CONTENT;
    const observerRef = useRef(null);

    // Animações ao rolar — mesmo padrão do LandingPage
    useEffect(() => {
        const elements = document.querySelectorAll('.scroll-animate');
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('is-visible');
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        elements.forEach((el) => observerRef.current.observe(el));
        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <div className="sobre-wrapper">

            {/* Hero */}
            <section className="sobre-hero fluid-section">
                <div className="fluid-container">
                    <div className="sobre-hero-content">
                        <div className="hero-tag animate-fade-in-up">
                            <span className="hero-tag-dot"></span>
                            <span className="hero-tag-text">{hero.tag}</span>
                        </div>
                        <h1 className="hero-title animate-fade-in-up delay-100">
                            {hero.titlePre}{' '}
                            <span className="text-gradient-accent">{hero.titleAccent}</span>
                        </h1>
                        <p className="hero-subtitle animate-fade-in-up delay-200">{hero.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Números de credibilidade */}
            <section className="fluid-section sobre-stats-section">
                <div className="fluid-container">
                    <div className="sobre-stats scroll-animate">
                        {stats.map((item, i) => (
                            <div key={i} className="sobre-stat">
                                <span className="sobre-stat-value">{item.value}</span>
                                <span className="sobre-stat-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quem somos — narrativa */}
            <section className="fluid-section sobre-section">
                <div className="fluid-container">
                    <div className="sobre-narrativa scroll-animate">
                        <div className="niche-tag">{quemSomos.eyebrow}</div>
                        <h2 className="section-title sobre-narrativa-title">{quemSomos.title}</h2>
                        {quemSomos.paragraphs.map((p, i) => (
                            <p key={i} className="sobre-narrativa-p">{p}</p>
                        ))}
                    </div>

                    <div className="sobre-grid">
                        {pilares.map((pilar, i) => {
                            const Icon = SOBRE_ICONS[pilar.icon] || Award;
                            return (
                                <div
                                    key={pilar.title}
                                    className={`sobre-card glass-panel scroll-animate delay-${(i + 1) * 100}`}
                                >
                                    <div className="sobre-card-icon">
                                        <Icon size={32} aria-hidden="true" />
                                    </div>
                                    <h3 className="sobre-card-title">{pilar.title}</h3>
                                    <p className="sobre-card-body">{pilar.body}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Consultoria de carreira */}
            <section className="fluid-section sobre-consultoria-section">
                <div className="fluid-container">
                    <div className="sobre-consultoria-inner scroll-animate">
                        <div className="sobre-consultoria-content">
                            <div className="niche-tag">{consultoria.tag}</div>
                            <h2 className="section-title">{consultoria.title}</h2>
                            <p className="sobre-consultoria-desc">{consultoria.desc}</p>
                            <ul className="sobre-consultoria-list">
                                {consultoria.points.map((point, i) => (
                                    <li key={i} className="sobre-consultoria-item">
                                        <CheckCircle2 size={22} className="sobre-consultoria-icon" aria-hidden="true" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="sobre-consultoria-visual glass-panel scroll-animate delay-200">
                            <Target size={48} className="sobre-consultoria-visual-icon" aria-hidden="true" />
                            <p className="sobre-consultoria-visual-text">
                                Consultoria gratuita antes de qualquer matrícula — porque o título certo muda tudo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modalidades de cursos */}
            <section className="fluid-section sobre-modalidades-section">
                <div className="fluid-container">
                    <div className="sobre-modalidades-header scroll-animate">
                        <h2 className="section-title">{modalidades.title}</h2>
                        <p className="sobre-modalidades-subtitle">{modalidades.subtitle}</p>
                    </div>
                    <div className="sobre-modalidades-grid">
                        {modalidades.items.map((item, i) => {
                            const Icon = SOBRE_ICONS[item.icon] || BookOpen;
                            return (
                                <article
                                    key={item.title}
                                    className={`sobre-modalidade-card glass-panel scroll-animate delay-${(i % 3 + 1) * 100}`}
                                >
                                    <div className="sobre-modalidade-icon">
                                        <Icon size={26} aria-hidden="true" />
                                    </div>
                                    <h3 className="sobre-modalidade-title">{item.title}</h3>
                                    <p className="sobre-modalidade-desc">{item.desc}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Ju Álves — supervisão da consultoria */}
            <section className="fluid-section sobre-coach-section">
                <div className="fluid-container">
                    <div className="sobre-coach-inner scroll-animate">
                        <div className="sobre-coach-content">
                            <div className="niche-tag">{coach.tag}</div>
                            <h2 className="section-title">
                                {coach.titlePre ? (
                                    <>
                                        {coach.titlePre}{' '}
                                        <span className="text-gradient-accent">{coach.titleAccent}</span>
                                    </>
                                ) : (
                                    <span className="text-gradient-accent">{coach.titleAccent}</span>
                                )}
                            </h2>
                            <p className="sobre-coach-desc">{coach.desc}</p>
                            <div className="sobre-coach-bio glass-panel">
                                <p className="sobre-bio-label">{coach.bioLabel}</p>
                                <p>{coach.bioIntro}</p>
                                <ul className="sobre-habilitacoes">
                                    {coach.habilitacoes.map((h) => (
                                        <li key={h}>{h}</li>
                                    ))}
                                </ul>
                            </div>
                            {coach.email && (
                                <p className="sobre-coach-contact">
                                    <span className="sobre-coach-contact-label">{coach.contactLabel}</span>
                                    <a href={`mailto:${coach.email}`} className="sobre-coach-contact-email">
                                        {coach.email}
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section id="contato" className="fluid-section small-padding finalcta-section">
                <div className="fluid-container finalcta-container scroll-animate">
                    <div className="finalcta-panel">
                        <h2 className="section-title finalcta-title scroll-animate delay-100">
                            {finalCta.title}
                        </h2>
                        <p className="finalcta-desc scroll-animate delay-200">{finalCta.desc}</p>
                        <div className="finalcta-action scroll-animate delay-300">
                            <span className="finalcta-label">
                                <MessageCircle size={18} />
                                {finalCta.label}
                            </span>
                            <a
                                href={finalCta.waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary sobre-finalcta-btn"
                            >
                                {finalCta.cta}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
