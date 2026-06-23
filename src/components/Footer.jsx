import React from 'react';
import { Phone, Mail, Instagram, MapPin } from 'lucide-react';
import { FOOTER_CONTACT, FOOTER_POLOS } from '../data/footer';
import { getRadarId } from '../hooks/useTracking';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="fluid-container">
                <div className="footer-grid">

                    {/* Marca */}
                    <div>
                        <div>
                            <img
                                src="/eduka-ead-logo-fundo-preto.png"
                                alt="EdukaEAD"
                                className="footer-brand-logo"
                            />
                            <p className="footer-brand-desc">
                                Polo Educacional com mais de 10 anos de experiência, parceiro de Instituições de Ensino Superior reconhecidas pelo MEC. Consultoria de carreira gratuita — da matrícula à certificação.
                            </p>
                        </div>
                        <a href="/sobre" className="footer-about-btn">Sobre o EdukaEAD</a>
                    </div>

                    {/* Navegação */}
                    <div>
                        <div>
                            <h4 className="footer-col-title">Áreas de Atuação</h4>
                            <ul className="footer-nav-list">
                                <li><a href="/guardas" className="footer-nav-link">Guardas Municipais</a></li>
                                <li><a href="/professores" className="footer-nav-link">Professores</a></li>
                                <li><a href="/carreira-publica" className="footer-nav-link">Carreira Pública</a></li>
                                <li><a href="/carreira-privada" className="footer-nav-link">Carreira Privada</a></li>
                            </ul>
                        </div>
                        <a href="/prematricula" className="footer-prematricula-btn">Pré-Matrícula</a>
                    </div>

                    {/* Canais de contato */}
                    <div>
                        <h4 className="footer-col-title">Canais de contato</h4>
                        <ul className="footer-contact-list">
                            <li className="footer-contact-item">
                                <Phone size={20} className="footer-contact-icon" aria-hidden="true" />
                                <a
                                    href={`${FOOTER_CONTACT.whatsapp.href}&radarId=${getRadarId()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-contact-link"
                                    data-umami-event="click-whatsapp"
                                    data-umami-event-secao="footer"
                                >
                                    {FOOTER_CONTACT.whatsapp.display} ({FOOTER_CONTACT.whatsapp.label})
                                </a>
                            </li>
                            <li className="footer-contact-item">
                                <Mail size={20} className="footer-contact-icon" aria-hidden="true" />
                                <a
                                    href={`mailto:${FOOTER_CONTACT.email}`}
                                    className="footer-contact-link"
                                    data-umami-event="click-email"
                                    data-umami-event-secao="footer"
                                >
                                    {FOOTER_CONTACT.email}
                                </a>
                            </li>
                            <li className="footer-contact-item">
                                <Instagram size={20} className="footer-contact-icon" aria-hidden="true" />
                                <a
                                    href={FOOTER_CONTACT.instagram.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-contact-link"
                                    data-umami-event="click-instagram"
                                    data-umami-event-secao="footer"
                                >
                                    {FOOTER_CONTACT.instagram.handle}
                                </a>
                            </li>

                            {/* Endereços — últimos itens; incluir novos polos em FOOTER_POLOS */}
                            {FOOTER_POLOS.map((polo) => (
                                <li key={polo.id} className="footer-contact-item footer-contact-item--address">
                                    <MapPin size={20} className="footer-contact-icon" aria-hidden="true" />
                                    <div className="footer-contact-address">
                                        <span className="footer-polo-name">{polo.name}</span>
                                        <a
                                            href={polo.mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="footer-contact-link footer-contact-link--address"
                                        >
                                            {polo.address}
                                            <br />
                                            {polo.district}
                                            {polo.note && (
                                                <span className="footer-polo-note">{polo.note}</span>
                                            )}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Barra legal */}
                <div className="footer-bottom">
                    <p>
                        © 2026 EdukaEAD — EDUKAEAD POLO EDUCACIONAL LTDA — CNPJ 59.684.524/0001-91
                    </p>
                    <div className="footer-bottom-meta">
                        <ul className="footer-legal-links" aria-label="Links legais">
                            <li><a href="/info/privacidade" className="footer-legal-link">Privacidade</a></li>
                            <li><a href="/info/termos" className="footer-legal-link">Termos</a></li>
                            <li><a href="/info/lgpd" className="footer-legal-link">LGPD</a></li>
                        </ul>
                        <span className="footer-version">{__APP_VERSION__}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
