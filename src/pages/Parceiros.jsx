import React from 'react';

export default function Parceiros() {
    return (
        <div className="animate-fade-in" style={{ padding: '80px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '24px' }}>Instituições Parceiras</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        Trabalhamos em conjunto com instituições avaliadas com nota máxima, garantindo o melhor ensino.
                    </p>
                </div>

                <div className="glass-panel" style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', textAlign: 'center' }}>
                    {/* Logo Placeholder - assuming there would be a unicv logo or just text */}
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', display: 'inline-block' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>UniCV</h2>
                    </div>

                    <div style={{ maxWidth: '800px' }}>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--accent-primary)' }}>Centro Universitário Cidade Verde</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '32px' }}>
                            Nosso principal polo parceiro com mais de 20 anos de trajetória. A UniCV tem presença marcada em mais de 700 polos espalhados pelo Brasil e atuação internacional (Japão, Inglaterra, Portugal, Espanha), tudo isso chancelado com a nota máxima no MEC (5).
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                            <div className="glass-panel" style={{ padding: '24px' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>20+</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Anos de Tradição</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '24px' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>700+</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Polos no Mundo</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '24px' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>MEC 5</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Nota Máxima</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
