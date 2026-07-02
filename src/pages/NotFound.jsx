import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Página não encontrada | EdukaEAD';
    }, []);

    return (
        <section className="fluid-section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
            <div className="fluid-container" style={{ textAlign: 'center' }}>
                <div className="glow-orb cyan" style={{ width: 300, height: 300, top: '20%', left: '50%', transform: 'translateX(-50%)' }} />

                <p className="animate-fade-in-up" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(6rem, 20vw, 12rem)',
                    fontWeight: 800,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    404
                </p>

                <h1 className="animate-fade-in-up delay-100" style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    marginTop: '8px',
                }}>
                    Ops, essa página se perdeu no caminho
                </h1>

                <p className="animate-fade-in-up delay-200" style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    marginTop: '16px',
                    maxWidth: 480,
                    margin: '16px auto 0',
                }}>
                    Não encontramos o endereço que você acessou. Mas fique tranquilo(a),
                    vamos te ajudar a voltar para o caminho certo.
                </p>

                <div className="animate-fade-in-up delay-300" style={{
                    display: 'flex',
                    gap: 12,
                    justifyContent: 'center',
                    marginTop: '40px',
                    flexWrap: 'wrap',
                }}>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline"
                    >
                        <ArrowLeft size={18} /> Voltar
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-accent"
                    >
                        <Home size={18} /> Ir para a Home
                    </button>
                </div>
            </div>
        </section>
    );
}
