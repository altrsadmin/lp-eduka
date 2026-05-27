import React from 'react';

export default function GcmHierarchy() {
    const levels = [
        {
            id: 4,
            color: '#00E5FF', // Cyan / Light Blue
            gradient: 'linear-gradient(90deg, #00A3CC, #00E5FF)',
            roles: ['GCM Inspetor Superintendente', 'GCM Inspetor de Agrupamento'],
            vertical: true
        },
        {
            id: 3,
            color: '#10B981', // Emerald / Green
            gradient: 'linear-gradient(90deg, #059669, #10B981)',
            roles: ['GCM Inspetor de Divisão', 'GCM Inspetor'],
            vertical: true
        },
        {
            id: 2,
            color: '#84CC16', // Lime Green
            gradient: 'linear-gradient(90deg, #65A30D, #84CC16)',
            roles: ['GCM Subinspetor', 'GCM Classe Distinta'],
            vertical: true
        },
        {
            id: 1,
            color: '#EAB308', // Yellow
            gradient: 'linear-gradient(90deg, #CA8A04, #EAB308)',
            roles: ['GCM Classe Especial', 'GCM 1ª Classe', 'GCM 2ª Classe', 'GCM 3ª Classe'],
            vertical: false
        }
    ];

    return (
        <div style={{ marginTop: '48px', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '32px', textAlign: 'center' }}>
                A Estrutura de Ascensão (Promoção e Progressão)
            </h3>

            <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative' }}>

                {levels.map((level, index) => (
                    <React.Fragment key={level.id}>
                        {/* Promotion Vertical Arrow between levels */}
                        {index > 0 && (
                            <div className="scroll-animate delay-200" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4px 0' }}>
                                <div style={{ background: 'var(--accent-secondary)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.05em' }}>
                                    PROMOÇÃO VERTICAL (Pontuação)
                                </div>
                                <div style={{ width: '2px', height: '20px', background: 'var(--accent-secondary)', marginTop: '4px' }}></div>
                            </div>
                        )}

                        {/* Level Block */}
                        <div
                            className="scroll-animate"
                            style={{
                                width: `${55 + (index * 15)}%`, // Proper Pyramid shape (gets wider at the bottom, index 0 is top)
                                background: level.gradient,
                                borderRadius: '8px',
                                padding: '2px',
                                boxShadow: `0 10px 30px -10px ${level.color}80`
                            }}
                        >
                            <div style={{ background: 'var(--bg-primary)', borderRadius: '6px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {level.roles.map((role, rIndex) => (
                                    <React.Fragment key={rIndex}>
                                        {rIndex > 0 && <div style={{ height: '1px', background: `${level.color}40`, margin: '0 8px' }}></div>}
                                        <div style={{ padding: '12px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                            <span style={{ color: level.color, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                                                {role}
                                            </span>
                                            {rIndex > 0 && (
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', border: `1px solid ${level.color}40`, padding: '2px 8px', borderRadius: '4px' }}>
                                                    PROGRESSÃO
                                                </span>
                                            )}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                ))}

            </div>
        </div>
    );
}
