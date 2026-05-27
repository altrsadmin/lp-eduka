import React from 'react';
import './ProfessoresCarreira.css';

// Dados de carreira baseados em pesquisa: LC 1.374/2022 (estado) e SME-SP (municipal)
const estadoSteps = [
    {
        label: 'Entrada (Ref. 1–5)',
        title: 'Início de carreira',
        sub: 'Salário-base Nova Carreira: R$ 5.300',
        color: '#EAB308'
    },
    {
        label: 'Ref. 6–8',
        title: '+ Especialização / Extensão',
        sub: 'Avanço direto de nível sem interstício de tempo',
        color: '#84CC16'
    },
    {
        label: 'Ref. 9–12',
        title: '+ 2ª Licenciatura (R2)',
        sub: 'Nova disciplina + 30% do peso na evolução funcional',
        color: '#10B981'
    },
    {
        label: 'Ref. 13–15',
        title: '+ Mestrado / Doutorado',
        sub: 'Teto de carreira: até R$ 13.000',
        color: '#00E5FF'
    },
];

const municipalSteps = [
    {
        label: 'Faixa 11 ou 13',
        title: 'Entrada na carreira',
        sub: 'Piso 2025: R$ 5.050',
        color: '#EAB308'
    },
    {
        label: 'Faixas intermediárias',
        title: '+ Especialização / Extensão',
        sub: '+pontuação para progressão de faixa (+6,5% por faixa)',
        color: '#84CC16'
    },
    {
        label: 'Faixas superiores',
        title: '+ Mestrado',
        sub: '+15% permanente sobre o salário-base',
        color: '#6366F1'
    },
    {
        label: 'Faixa máxima',
        title: '+ Doutorado',
        sub: '+20% permanente | Teto: R$ 8.000–10.000',
        color: '#00E5FF'
    },
];

// Tabela de impacto direto dos títulos
const impactRows = [
    {
        titulo: 'Especialização (360h)',
        estadoSP: 'Avanço de nível direto na carreira antiga; pontuação na nova carreira',
        municipalSP: 'Pontuação para progressão de faixa'
    },
    {
        titulo: '2ª Licenciatura (R2)',
        estadoSP: 'Nova disciplina + 30% do peso na avaliação de evolução funcional',
        municipalSP: 'Amplia atribuição de aulas + pontuação para progressão'
    },
    {
        titulo: 'Mestrado',
        estadoSP: '+15% sobre o salário-base (nível acadêmico)',
        municipalSP: '+15% permanente sobre o salário-base'
    },
    {
        titulo: 'Doutorado',
        estadoSP: '+20% sobre o salário-base (nível máximo)',
        municipalSP: '+20% permanente sobre o salário-base'
    },
];

export default function ProfessoresCarreira() {
    return (
        <div className="prof-carreira-wrapper">
            <h3 className="prof-carreira-title">
                A Estrutura das Redes e o Impacto da Titulação
            </h3>

            {/* Escadas de carreira — Estado vs Municipal */}
            <div className="prof-carreira-grid">
                <div className="prof-carreira-col">
                    <div className="prof-col-header estado">
                        <span className="prof-col-name">Rede Estadual</span>
                        <span className="prof-col-sub">SEE-SP · 15 referências · +10,5% cada</span>
                    </div>
                    <div className="prof-ladder">
                        {estadoSteps.map((step, i) => (
                            <div
                                key={i}
                                className="prof-step scroll-animate"
                                style={{ '--step-color': step.color }}
                            >
                                <span className="prof-step-label">{step.label}</span>
                                <span className="prof-step-title">{step.title}</span>
                                <span className="prof-step-sub">{step.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="prof-carreira-col">
                    <div className="prof-col-header municipal">
                        <span className="prof-col-name">Rede Municipal</span>
                        <span className="prof-col-sub">SME-SP · 22 faixas · +6,5% cada</span>
                    </div>
                    <div className="prof-ladder">
                        {municipalSteps.map((step, i) => (
                            <div
                                key={i}
                                className="prof-step scroll-animate"
                                style={{ '--step-color': step.color }}
                            >
                                <span className="prof-step-label">{step.label}</span>
                                <span className="prof-step-title">{step.title}</span>
                                <span className="prof-step-sub">{step.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabela de impacto */}
            <div className="prof-impact scroll-animate">
                <h4 className="prof-impact-heading">Impacto direto dos títulos no salário</h4>
                <div className="prof-impact-rows">
                    {impactRows.map((row, i) => (
                        <div key={i} className="prof-impact-row">
                            <div className="prof-impact-titulo">{row.titulo}</div>
                            <div className="prof-impact-cell">
                                <span className="prof-impact-rede">Estado SP</span>
                                {row.estadoSP}
                            </div>
                            <div className="prof-impact-cell">
                                <span className="prof-impact-rede">Municipal SP</span>
                                {row.municipalSP}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
