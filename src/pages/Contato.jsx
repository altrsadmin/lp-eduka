import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { getRadarId } from '../hooks/useTracking';

export default function Contato() {
    return (
        <div className="animate-fade-in" style={{ padding: '80px 0' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '24px' }}>Fale Conosco</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        Estamos prontos para ajudar você a dar o próximo passo na sua carreira. Entre em contato com a nossa equipe.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 2fr)', gap: '48px', alignItems: 'start' }}>

                    {/* Informações de Contato */}
                    <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Nossos Canais</h2>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                            <MapPin size={24} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                            <div>
                                <h3 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>Endereço Principal</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Rua Comandante Taylor, 311<br />Ipiranga - São Paulo/SP</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Phone size={24} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                            <div>
                                <h3 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>Telefone/WhatsApp</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>(11) 98573-0062<br />(11) 97868-3774</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Mail size={24} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                            <div>
                                <h3 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>E-mail</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>contato@edukaead.com.br</p>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/5511978683774?radarId=${getRadarId()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '16px' }}
                            data-umami-event="click-whatsapp"
                            data-umami-event-secao="pagina-contato"
                        >
                            Falar no WhatsApp
                        </a>
                    </div>

                    {/* Formulário Simples */}
                    <div className="glass-panel" style={{ padding: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '32px', color: 'var(--text-primary)' }}>Envie uma Mensagem</h2>

                        <form
                            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                const email = e.target.querySelector('[type="email"]')?.value?.trim();
                                const nome = e.target.querySelector('[type="text"]')?.value?.trim();
                                window.umami?.track('submit-form', { tipo: 'contato' });
                                if (email) window.umami?.identify({ email, nome });
                            }}
                        >
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Nome Completo</label>
                                <input type="text" placeholder="Seu nome" style={{ width: '100%', padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>E-mail</label>
                                    <input type="email" placeholder="Seu e-mail" style={{ width: '100%', padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Telefone</label>
                                    <input type="tel" placeholder="(11) 99999-9999" style={{ width: '100%', padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Mensagem</label>
                                <textarea placeholder="Como podemos te ajudar?" rows="5" style={{ width: '100%', padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff', fontSize: '1rem', resize: 'vertical', outline: 'none' }}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
