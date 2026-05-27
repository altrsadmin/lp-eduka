import React from 'react';

export default function OEduka() {
    return (
        <div className="animate-fade-in" style={{ padding: '80px 0' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '24px' }}>O Eduka EAD</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '48px' }}>
                        Há mais de uma década, o Eduka Polo Educacional tem como compromisso oferecer ensino superior de excelência, impulsionando a trajetória profissional de nossos alunos.
                    </p>
                </div>

                <div className="glass-panel" style={{ padding: '40px', marginTop: '48px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--accent-primary)' }}>Nossa Missão</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.8 }}>
                        Temos como missão principal proporcionar acesso a uma educação transformadora, unindo tecnologia, tutoria especializada e parcerias com as melhores instituições do país. No Eduka EAD, você encontra suporte local em um polo estruturado, para que sua experiência digital seja complementada por um atendimento humanizado e próximo.
                    </p>
                </div>
            </div>
        </div>
    );
}
