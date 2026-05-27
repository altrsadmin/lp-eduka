// Badges da jornada (mercado / primeira graduação / carreira privada)
export const CASCATA_STEPS_MERCADO = [
    { num: '01', title: 'Tecnólogo', sub: '2 anos · diploma MEC', highlight: 'Base sólida' },
    { num: '02', title: 'Pós-Graduação', sub: 'Especialização 360h', highlight: '+Especialidade' },
    { num: '03', title: 'Bacharelado', sub: 'com aproveitamento de estudos', highlight: '+Senioridade' },
    { num: '04', title: 'MBA', sub: 'sobre a base já conquistada', highlight: 'Liderança' },
];

export const CASCATA_JORNADA_MERCADO = {
    title: 'A Jornada Inteligente de Formação',
    subtitle: 'Cada diploma potencializa o próximo. Uma estratégia do tecnólogo ao MBA — sem desperdiçar o que você já conquistou.',
    steps: CASCATA_STEPS_MERCADO,
};

export const THEMES = {
    global: {
        waLink: 'https://wa.me/551151925444?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20consultor%20de%20carreiras.',
        hero: {
            image: '/eduka-ead-alunos-ensino-superior-sao-paulo.png',
            tag: 'Consultoria de Carreira EAD',
            headlinePre: 'Nós não vendemos cursos.',
            headlineGradient: 'Desenhamos a sua ',
            headlineAccent: 'Trajetória.',
            subtitle: 'Mais de 5.000 profissionais confiaram ao Eduka EAD a decisão acadêmica mais importante da carreira. Consultoria gratuita, título certo, avanço real.',
            cta: 'Consultoria Gratuita',
            stats: [
                'Mais de <strong>5.000 alunos</strong> apoiados.',
                '<strong>Mais de 10 anos</strong> de atuação no mercado.',
            ]
        },
        // Grid de públicos-alvo — exclusivo da home
        // Estrutura: 4 primários (linha 1) + 3 secundários (linha 2)
        audiences: {
            title: 'Para quem é o Eduka EAD?',
            subtitle: 'Atendemos profissionais em diferentes momentos de carreira. Identifique o seu perfil.',
            cards: [
                // --- 4 primários: nichos com página própria ---
                {
                    icon: 'shield',
                    title: 'Guardas Municipais',
                    desc: 'Pontuação estratégica para Promoção Vertical na GCM SP. Polo parceiro oficial do Sindguardas, com até 80% de desconto.',
                    primary: true,
                    path: '/guardas',
                    cta: 'Ver estratégia'
                },
                {
                    icon: 'graduation',
                    title: 'Professores da Rede',
                    desc: 'Evolução funcional nas redes estadual e municipal de SP. 2ª Licenciatura, Pós-Graduação e Formação Pedagógica.',
                    primary: true,
                    path: '/professores',
                    cta: 'Ver cursos'
                },
                {
                    icon: 'landmark',
                    title: 'Carreira Pública',
                    desc: 'Titulações que pontuam em editais e planos de carreira do funcionalismo público de todo o Brasil.',
                    primary: true,
                    path: '/carreira-publica',
                    cta: 'Explorar'
                },
                {
                    icon: 'briefcase',
                    title: 'Carreira Privada',
                    desc: 'Graduação, Pós-Graduação e MBA para crescer no mercado privado. Do tecnólogo ao C-level, com consultoria gratuita.',
                    primary: true,
                    path: '/carreira-privada',
                    cta: 'Ver jornada'
                },
                // --- 3 secundários: âncoras de serviço na home ---
                {
                    icon: 'bookopen',
                    title: 'Primeira Graduação',
                    desc: 'Ingresse no ensino superior com apoio de consultores especializados. Cursos aprovados pelo MEC para todas as áreas.',
                    anchor: '#primeira-graduacao',
                    cta: 'Saiba mais'
                },
                {
                    icon: 'award',
                    title: 'Pós-Graduação & MBA',
                    desc: 'Especializações e MBAs aprovados pelo MEC. Para quem quer avançar na carreira com um título que o mercado valoriza.',
                    anchor: '#pos-graduacao',
                    cta: 'Ver áreas'
                },
                {
                    icon: 'trending',
                    title: 'Transição de Carreira',
                    desc: 'Reorientação profissional com a titulação certa. Do diploma estratégico à nova posição de mercado.',
                    anchor: '#transicao',
                    cta: 'Planejar transição'
                }
            ]
        },
        // Advantage: aborda objeções ao EAD com dados reais
        advantage: {
            title: 'O EAD que o mercado reconhece.',
            desc: 'Em 2024, o EAD superou o presencial: 50,7% das matrículas no Brasil são a distância. Não por facilidade — por inteligência. Aqui, você tem os dois.',
            card1: {
                title: 'Diploma idêntico ao presencial',
                body: 'O Decreto 9.235/2017 proíbe que o diploma informe a modalidade. O que o mercado, os concursos e os conselhos de classe veem é o nome da instituição — não se foi EAD ou presencial.'
            },
            card2: {
                title: 'Instituições reconhecidas no MEC',
                body: 'Qualidade verificada pelo governo federal, diplomas com validade nacional e cursos alinhados às exigências de editais — em todo o Brasil.'
            }
        },
        niche: {
            bgImage: '/sao-paulo-centro-viaduto-cha-dia.png',
            tag: 'Polo no Centro de SP',
            title: 'Próximo de você, no coração de São Paulo.',
            desc: 'Nosso polo fica no Centro de SP, próximo ao Metrô Anhangabaú. Não é só um polo. É um escritório de carreira.',
            list: ['Atendimento presencial ou por WhatsApp', 'Cursos aprovados pelo MEC', 'Consultoria de carreira individualizada'],
            cta: 'Falar com um Consultor',
            boxTitle: 'Consultoria Gratuita',
            boxDesc: 'Sem compromisso. Você sai da conversa com um plano de carreira claro e o próximo passo definido.'
        },
        finalCta: {
            title: 'A hora de acelerar é agora.',
            desc: 'Fale com nossos consultores de carreira. Análise de currículo, plano de titulação e orientação direta para você escalar seus ganhos e sua posição no mercado.'
        },

        // Seção âncora — Primeira Graduação
        primeiraGraduacao: {
            tag: 'Seu Ponto de Partida',
            title: 'A graduação certa abre as portas certas.',
            desc: 'Para quem está ingressando no ensino superior, a escolha do curso molda os próximos anos de carreira. Nossa consultoria garante a rota mais eficiente para o seu objetivo.',
            list: [
                'Tecnólogos (2 anos) e Bacharelados — para diferentes perfis e prazos',
                'Diploma aprovado pelo MEC, aceito em concursos e conselhos de classe',
                'EAD com a mesma validade do presencial — você estuda sem parar de trabalhar',
            ],
            cta: 'Falar com um Consultor',
            // Diagrama com os mesmos badges da carreira privada
            cascata: {
                ...CASCATA_JORNADA_MERCADO,
                subtitle: 'Aproveite cada diploma no próximo. Um caminho sem desperdício — do tecnólogo ao MBA.',
            },
        },

        // Seção âncora — Pós-Graduação & MBA
        posGraduacao: {
            tag: 'Pós-Graduação & MBA',
            title: 'Avanço real, no ritmo da sua vida.',
            desc: 'Pós-graduação EAD não é facilidade — é inteligência. Você estuda sem sair do emprego, com diploma de validade nacional e reconhecimento do MEC.',
            highlights: [
                { stat: '+15%', label: 'no salário base de professores da rede pública (equiparado ao Mestrado)' },
                { stat: '360h', label: 'Especialização reconhecida que vale pontos em concursos e progressão funcional' },
                // Ref. Insper/IBGE: ~R$ 11,5 mil (pós) vs. ~R$ 6,1 mil (graduação)
                { stat: '1,5×', label: 'mais remuneração com pós vs. só graduação' },
                { stat: '~1 ano', label: 'Conclusão média — sem travar sua agenda ou abrir mão do emprego' },
            ],
            areas: ['Direito', 'Gestão e Negócios', 'Educação e Pedagogia', 'Saúde', 'Tecnologia', 'Segurança Pública'],
            fechamento: {
                desc: 'Especializações e MBAs aprovados pelo MEC em todas as áreas acima. Nossos consultores montam o plano que cabe na sua rotina — você estuda sem abrir mão do emprego e avança com título que o mercado reconhece.',
                cta: 'Falar com Consultor de Carreira',
            },
        },

        // Seção âncora — Transição de Carreira
        transicao: {
            tag: 'Transição de Carreira',
            title: 'Mudar de área requer estratégia, não apenas coragem.',
            desc: 'Na transição de carreira, existem dois caminhos principais. O ideal depende do que você já conquistou — e do tempo que quer investir para chegar à nova área.',
            caminhos: [
                {
                    icon: 'award',
                    badge: 'Preferencial',
                    preferred: true,
                    title: 'Pós-Graduação ou MBA na área de destino',
                    desc: 'Especialização alinhada ao novo mercado. Exige formação superior completa (graduação já concluída e diploma em mãos).',
                },
                {
                    icon: 'graduation',
                    badge: 'Recomendado',
                    preferred: false,
                    title: 'Iniciar uma nova formação: Tecnólogo',
                    desc: 'Ponto de partida estratégico quando ainda não há graduação completa ou quando você precisa mudar de área com mais agilidade (cerca de 2 anos).',
                },
            ],
            cta: 'Falar sobre Transição',
            waLink: 'https://wa.me/551151925444?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20transi%C3%A7%C3%A3o%20de%20carreira.',
        }
    },

    guardas: {
        themeClass: 'lp-guardas',
        waLink: 'https://wa.me/551151925444?text=Ol%C3%A1%2C%20quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20evolu%C3%A7%C3%A3o%20funcional%20da%20guarda.',
        hero: {
            // Slideshow de avaliação — duas imagens disponíveis; trocar por image: '...' quando definir a favorita
            images: [
                '/eduka-ead-guarda-civil-municipal-gcm-sp.png',
                '/eduka-ead-guardas-municipais-sp-dupla.png',
            ],
            tag: 'Acelere sua Carreira na Guarda',
            headlinePre: 'A tática comprovada para a sua',
            headlineGradient: 'Promoção ',
            headlineAccent: 'Vertical.',
            subtitle: 'Domine a nova regra de pontuação (até 160pts) e multiplique seus ganhos na corporação. Somos especialistas na carreira da Guarda Civil Metropolitana.',
            cta: 'Quero Subir de Patente',
            stats: [
                '<strong>Polo parceiro</strong> do Sindguardas-SP.',
                '<strong>~40%</strong> dos Guardas-SP promovidos em 2025 foram alunos EdukaEAD.',
            ]
        },
        advantage: {
            title: 'Pontuação Inteligente, Carreira Sólida.',
            desc: 'Crescimento real e ganhos concretos dependem de estratégia. Você pode cursar disciplinas com ou sem aproveitamento de estudos, respeitando a regra de 1 título por modalidade.',
            card1: { title: 'Sem Aproveitamento', body: 'Conquiste a nota máxima da modalidade: Tecnólogo (80 pontos), Licenciatura (120 pontos) ou Bacharelado (160 pontos).' },
            card2: { title: 'Com Aproveitamento', body: 'Encurte o tempo usando horas já cursadas. A pontuação será proporcional à carga horária efetivamente realizada (ex: 0,05 x horas letivas).' }
        },
        informational: {
            title: 'Entenda como funciona a Promoção Vertical',
            showHierarchy: true,
            content: [
                'No plano de carreira da GCM, existem <strong style="color: var(--text-primary)">Progressões</strong> (dentro do mesmo quadro) e <strong style="color: var(--text-primary)">Promoções Verticais</strong> (salto entre quadros hierárquicos). A graduação estratégica é o seu principal motor para a Promoção Vertical.',
                'O certame estabelece a regra de aceitar <strong style="color: var(--text-primary)">um título de graduação de cada modalidade</strong>. A pontuação base (Sem Aproveitamento de Estudos) é definida da seguinte forma: Tecnólogo (80 pontos), Licenciatura (120 pontos) e Bacharelado (160 pontos).',
                'Agora é possível apresentar graduações <strong style="color: var(--text-primary)">com aproveitamento de estudos (eliminação de matérias)</strong>. Nesses casos, a pontuação não é a "cheia", ela é calculada de forma reduzida multiplicando as horas letivas (ex: 0,05 x horas). Além disso, não é permitido apresentar dois títulos idênticos no certame (ex: se usar um Tecnólogo com aproveitamento, não pode usar outro Tecnólogo sem aproveitamento).',
                '<strong style="color: var(--accent-primary)">Construa sua carreira estrategicamente:</strong> O servidor inteligente não queima modalidades. O ideal é apresentar um Tecnólogo intacto (Sem Aproveitamento) para garantir os 80 pontos integrais rápidos, em seguida emendar uma Pós-Graduação (80pts) e, se desejar subir posições mais altas, usar o histórico para encurtar um Bacharelado.',
                '<a href="https://www.sindguardas-sp.org.br/site/NoticiaInterna/1575/smsu-altera-mais-uma-vez-as-regras-para-pontuacao-na-promocao-vertical" target="_blank" rel="noopener noreferrer" style="color: var(--text-muted); font-size: 0.85rem; text-decoration: underline;"><em>Fonte de referência institucional: Notícia Sindguardas-SP sobre o Decreto Municipal 64.912/2026</em></a>'
            ]
        },
        niche: {
            tag: 'Convênio Sindguardas-SP',
            title: 'O Caminho Progressivo para GCMs.',
            desc: 'Seja você um iniciante buscando os primeiros 80 pontos no Tecnólogo, ou um veterano somando Extensões. Oferecemos até 80% de desconto em formato EAD.',
            list: ['Tecnólogos (80pts) e Licenciaturas (120pts)', 'Análise de cenário e Matriz Curricular', 'Polo localizado no 1º andar do Sindguardas'],
            cta: 'Garantir meu Desconto e Pontuação',
            boxTitle: 'Tática de Pontos',
            boxDesc: 'Não lute contra a burocracia. Venha estruturar seu crescimento acadêmico embasado estritamente nas regras.'
        },
        finalCta: {
            title: 'Antecipe ao máximo a sua Pontuação.',
            desc: 'Fale com nossos consultores especialistas na carreira da Guarda Municipal. Estruture sua matriz curricular conosco para estar com os pontos na mão quando a próxima vaga abrir.'
        }
    },

    professores: {
        themeClass: 'lp-professores',
        waLink: 'https://wa.me/551151925444?text=Ol%C3%A1%2C%20quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20evolu%C3%A7%C3%A3o%20funcional%20para%20professores.',
        hero: {
            image: '/eduka-ead-professores-rede-publica-sp.png',
            tag: 'Foco: Carreira Docente',
            headlinePre: 'Evolua a sua forma de ensinar.',
            headlineGradient: 'Acelere sua ',
            headlineAccent: 'Evolução Funcional.',
            subtitle: 'Seja na rede estadual ou municipal de São Paulo, títulos refletem diretamente no seu holerite e na sua classificação. 2ª Licenciatura, Formação Pedagógica ou Pós-Graduação — com apoio de quem entende as regras.',
            cta: 'Quero Evolução Funcional',
            stats: [
                'Referência em <strong>evolução funcional</strong> docente.',
                'Instituições <strong>aprovadas pelo MEC</strong>.',
            ]
        },
        advantage: {
            title: 'Da Sala de Aula para o Próximo Nível.',
            desc: 'Carga horária exaustiva e correções de prova tomam seu tempo. Nossa estrutura EAD é a mais respeitada por educadores justamente por otimizar a rotina de quem não pode parar.',
            card1: { title: 'Aprovado pelo MEC', body: 'Certificações aceitas pelas Diretorias de Ensino e Secretarias de Educação estadual e municipal de SP.' },
            card2: { title: '2ª Licenciatura (R2)', body: 'Habilite-se para lecionar uma segunda disciplina. Mais aulas, mais pontuação e mais avanço no processo de evolução funcional.' }
        },
        // Seção informacional sobre carreira docente em SP
        informational: {
            title: 'Como a titulação impacta sua carreira e salário',
            showProfessoresCarreira: true,
            content: [
                'Na <strong style="color: var(--text-primary)">Rede Estadual SP (SEE-SP)</strong>, a nova carreira docente (LC 1.374/2022) conta com 15 referências salariais — cada avanço representa <strong style="color: var(--text-primary)">+10,5% no salário-base</strong>, com teto projetado em R$ 13.000. A titulação acadêmica acelera essa progressão: uma Especialização pode gerar avanço direto de nível sem cumprir o interstício de tempo obrigatório.',
                'Na <strong style="color: var(--text-primary)">Rede Municipal de SP (SME-SP)</strong>, a carreira é organizada em 22 faixas salariais (+6,5% por faixa). O impacto dos títulos é direto e permanente: Mestrado acrescenta <strong style="color: var(--text-primary)">+15%</strong> e Doutorado <strong style="color: var(--text-primary)">+20%</strong> sobre o salário-base — não é bônus, é reajuste definitivo.',
                'A <strong style="color: var(--text-primary)">2ª Licenciatura (R2)</strong> é uma das ferramentas mais poderosas do professor: habilita para uma segunda disciplina, amplia as possibilidades de atribuição de aulas e gera pontuação direta nos processos de evolução funcional — representando 30% do peso da avaliação não-acadêmica na rede estadual.',
                '<strong style="color: var(--accent-primary)">Sobre EAD em 2025:</strong> A Portaria MEC 378/2025 exige mínimo de 30% de carga presencial/síncrona para novas licenciaturas. Quem já está matriculado conclui normalmente. Nossos cursos estão alinhados às novas exigências — nossos consultores orientam sobre a modalidade certa para o seu caso.',
                '<a href="https://www.educacao.sp.gov.br/nova-carreira-de-professor-garante-aumento-de-salario-e-evolucao-profissional/" target="_blank" rel="noopener noreferrer" style="color: var(--text-muted); font-size: 0.85rem; text-decoration: underline;"><em>Fonte de referência: SEE-SP — Nova Carreira Docente (LC 1.374/2022)</em></a>'
            ]
        },
        niche: {
            tag: 'Impacto na Educação',
            title: 'Apoiamos quem forma a sociedade.',
            desc: 'Atendemos professores da rede pública estadual e municipal de São Paulo e de todo o estado. Nossos cursos são construídos para a realidade de quem já está em sala de aula.',
            list: [
                'Evolução funcional na rede estadual e municipal',
                'Titulações reconhecidas pelo MEC',
                'Metodologia adaptada ao professor em serviço'
            ],
            cta: 'Acelerar minha Evolução Funcional',
            boxTitle: 'Impacto Direto',
            boxDesc: 'Evolua a sua forma de ensinar enquanto o seu currículo não para de crescer.'
        },
        finalCta: {
            title: 'Sua Evolução Funcional não pode esperar.',
            desc: 'Fale com nossos consultores educacionais e descubra a rota mais ágil e segura para conquistar sua 2ª Licenciatura ou especialização reconhecida pelo MEC.'
        }
    },

    publica: {
        themeClass: 'lp-publica',
        waLink: 'https://wa.me/551151925444?text=Ol%C3%A1%2C%20quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20cursos%20para%20carreira%20p%C3%BAblica.',
        hero: {
            image: '/eduka-ead-profissionais-carreira-publica-sp.png',
            tag: 'Foco: Carreira Pública',
            headlinePre: 'A base sólida para a',
            headlineGradient: 'Sua Aprovação e ',
            headlineAccent: 'Progressão.',
            subtitle: 'Cursos focados nas reais exigências de editais e planos de carreira no setor público. Avance com solidez e segurança nas suas titulações.',
            cta: 'Quero Mais Titulação',
            stats: [
                'Especialistas em <strong>evolução funcional</strong>.',
                'Mais de <strong>10 anos</strong> atuando na área.',
            ]
        },
        advantage: {
            title: 'Educação que aprova e promove.',
            desc: 'Formação continuada e pós-graduações que fazem a diferença na pontuação de títulos e na evolução da sua carreira pública.',
            card1: { title: 'Validação Nacional', body: 'Certificações reconhecidas pelo MEC, alinhadas com as exigências de editais e planos de carreira do funcionalismo.' },
            card2: { title: 'Gestão e Prática', body: 'Conteúdo programático focado na resolução de problemas da administração pública contemporânea.' }
        },
        niche: {
            tag: 'Evolução Contínua',
            title: 'Ascensão no Setor Público.',
            desc: 'Prepare-se com quem entende os meandros da gestão pública e do direito administrativo aplicados à sua ascensão.',
            list: [
                'Caminho estruturado para o Adicional de Qualificação',
                'Material focado nas exigências de editais',
                'Flexibilidade total para o servidor em serviço'
            ],
            cta: 'Quero evoluir na carreira',
            boxTitle: 'Foco no Edital',
            boxDesc: 'O estudo estratégico que te prepara e pontua nas fases decisivas.'
        },
        finalCta: {
            title: 'Conquiste a sua Titulação Pública.',
            desc: 'Fale com nossa equipe sobre os editais atuais. Planeje sua progressão no funcionalismo público e garanta sua ascensão com diplomas reconhecidos.'
        }
    },

    // Carreira Privada — âncora de identificação para profissionais do setor privado
    // Foco: A Jornada Inteligente de Formação (cascata tecnólogo → MBA)
    privada: {
        themeClass: 'lp-privada',
        waLink: 'https://wa.me/551151925444?text=Ol%C3%A1%2C%20quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20cursos%20para%20carreira%20privada.',
        hero: {
            // Imagem temporária — criar prompt específico para carreira privada
            image: '/eduka-ead-profissionais-carreira-publica-sp.png',
            tag: 'Carreira & Crescimento Profissional',
            headlinePre: 'O diploma certo acelera',
            headlineGradient: 'sua Carreira no ',
            headlineAccent: 'Mercado Privado.',
            subtitle: 'Graduação, Pós-Graduação e MBA estratégicos para profissionais do setor privado. Do tecnólogo ao C-level — com consultoria gratuita e plano de carreira personalizado.',
            cta: 'Quero Acelerar Minha Carreira',
            stats: [
                'Diplomas <strong>reconhecidos pelo MEC</strong>.',
                '<strong>Do tecnólogo ao MBA</strong> — sua jornada inteligente.',
            ]
        },
        advantage: {
            title: 'Formação que o mercado privado valoriza.',
            desc: 'No setor privado, o diploma certo no momento certo separa quem cresce de quem espera. Nossa consultoria garante que você escolha o curso que gera resultado real.',
            card1: { title: 'Reconhecimento Nacional', body: 'Diplomas aprovados pelo MEC — válidos em todo o Brasil, aceitos pelas maiores empresas e grupos do mercado privado.' },
            card2: { title: 'Flexibilidade Total', body: 'Estude sem parar de trabalhar. Metodologia EAD adaptada para profissionais em ritmo acelerado, com diploma de validade idêntica ao presencial.' }
        },
        // Cascata é o destaque desta página — mostra a jornada completa
        cascata: CASCATA_JORNADA_MERCADO,
        niche: {
            tag: 'Crescimento Profissional',
            title: 'Do cargo atual ao próximo nível.',
            desc: 'Nossa consultoria mapeia o caminho mais rápido entre onde você está e onde quer chegar — com o diploma estratégico que o mercado privado exige e reconhece.',
            list: [
                'Tecnólogos, Bacharelados, Pós-Graduação e MBAs aprovados pelo MEC',
                'Consultoria gratuita e personalizada com análise de currículo',
                'EAD com a mesma validade do presencial — você estuda sem parar de trabalhar'
            ],
            cta: 'Iniciar Minha Jornada',
            boxTitle: 'Consultoria Gratuita',
            boxDesc: 'Você sai com um plano de carreira claro, o título certo e o próximo passo definido.'
        },
        finalCta: {
            title: 'Sua carreira no mercado privado não pode esperar.',
            desc: 'Fale com nossos consultores de carreira. Análise de currículo, plano de titulação e orientação direta para você escalar no mercado privado.'
        }
    }
};
