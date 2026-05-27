import React from 'react';

const COURSES = [
    { id: 1, title: 'Graduação', desc: 'Inicie sua carreira com nota máxima no MEC.' },
    { id: 2, title: '2ª Graduação Intensiva', desc: 'Amplie suas oportunidades rapidamente.' },
    { id: 3, title: '2° Licenciatura / R2', desc: 'Formação para professores e bacharéis.' },
    { id: 4, title: 'Pós-Graduação', desc: 'Especialize-se e avance na profissão.' },
    { id: 5, title: 'Aperfeiçoamento', desc: 'Atualização rápida e focada no mercado.' },
    { id: 6, title: 'Extensão Universitária', desc: 'Cursos curtos para enriquecer o currículo.' },
];

export default function Cursos() {
    return (
        <div className="animate-fade-in" style={{ padding: '80px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '24px' }}>Nossos Cursos</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        Uma infinidade de opções de qualidade para acelerar sua carreira, todas certificadas e reconhecidas.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {COURSES.map(course => (
                        <div key={course.id} className="glass-panel" style={{ padding: '32px', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>{course.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{course.desc}</p>
                            <a href="https://wa.me/5511978683774" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%' }}>
                                Saiba Mais
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
