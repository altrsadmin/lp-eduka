import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTracking } from '../hooks/useTracking';
import './Header.css';

// Link padrão do CTA do header (mesmo texto do themes.js → global.waLink)
const HEADER_WA_LINK =
    'https://wa.me/551151925444?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20consultor%20de%20carreiras.';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Guardas Municipais', path: '/guardas' },
    { name: 'Professores', path: '/professores' },
    { name: 'Carreira Pública', path: '/carreira-publica' },
    { name: 'Carreira Privada', path: '/carreira-privada' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { track } = useTracking();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fecha menu ao mudar de rota
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleNav = (path, label) => {
        track('nav-click', { destino: path, label, origem: location.pathname });
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Verifica se o link é a rota ativa
    const isActive = (path) =>
        path === '/' ? location.pathname === '/' : location.pathname === path;

    return (
        <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
            <div className="fluid-container header-inner">

                {/* Logo */}
                <div className="header-logo" onClick={() => handleNav('/', 'Logo')}>
                    <img src="/eduka-ead-logo.png" alt="Eduka EAD Logo" />
                </div>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul className="nav-list">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleNav(link.path, link.name)}
                                    className={`nav-btn${isActive(link.path) ? ' active' : ''}`}
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA + Toggle */}
                <div className="header-actions">
                    <a
                        href={HEADER_WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline header-cta"
                    >
                        Falar com consultores
                    </a>
                    <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu glass-panel">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNav(link.path, link.name)}
                            className={`mobile-nav-btn${isActive(link.path) ? ' active' : ''}`}
                        >
                            {link.name}
                        </button>
                    ))}
                    <a
                        href={HEADER_WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-accent mobile-cta"
                    >
                        Falar com consultores
                    </a>
                </div>
            )}
        </header>
    );
}
