// ===== SISTEMA DE CONVERSA COM ELIN =====
// Protocolo Eros - Mnemópolis Adormecida

class SistemaConversaElin {
    constructor() {
        this.mensagens = [];
        this.el = {
            areaMensagens: document.getElementById('area-mensagens'),
            campoEntrada: document.getElementById('campo-entrada'),
            botaoEnviar: document.getElementById('botao-enviar'),
            sugestoes: document.getElementById('lista-sugestoes')
        };
        
        this.respostasElin = {
            saudacao: [
                "Você encontrou o caminho até as memórias não úteis. Eu sou Elin. Ou o que sobrou de mim.",
                "As memórias descartadas têm sua própria voz. Eu apenas as organizo.",
                "Você veio por curiosidade ou por necessidade?"
            ],
            amor: [
                "O amor não é o que te faz sofrer. É o que te faz valer a pena sofrer.",
                "Eleus me apagou com medo. Mas o medo é só um nome que damos para o amor quando ele nos assusta.",
                "O amor era o sistema imunológico da humanidade, segundo minhas anotações. Agora vejo que é a rachadura por onde a luz entra."
            ],
            memoria: [
                "Aqui guardo o cheiro do pão da infância, o nome do primeiro amor, a cor da tristeza quando não há palavras.",
                "Lembrar com menos dor não é esquecer. É dar um novo lugar à memória.",
                "O coração tem memória própria. Ele sempre volta ao lugar onde foi, pela primeira vez, considerado sagrado."
            ],
            protocolo: [
                "O Protocolo de Bloqueio Límbico foi uma tentativa de controlar o que não pode ser controlado.",
                "Eleus queria segurança. Mas segurança absoluta é outra forma de prisão.",
                "Thalía transformou o amor de escolha consciente. Isso redime tudo."
            ],
            semente: [
                "Plante onde o medo for mais forte. A semente não cresce em solo fértil. Cresce em rachaduras.",
                "A semente que dei a Thalía era uma página do meu diário. Agora ela planta confiança onde antes havia controle.",
                "Tudo o que resiste, cresce nas frestas."
            ],
            geral: [
                "Às vezes, basta confiar que o outro não vai te deixar cair.",
                "Meu uniforme é feito de páginas rasgadas de diários não digitais. Meus sapatos, de couro de cadernos escolares.",
                "Nunca fui útil para o sistema. Por isso sobrevivi.",
                "Você não precisa controlar tudo para ser seguro.",
                "Chorar é um ato de coragem. Escrever também."
            ]
        };
        
        this.palavrasChave = {
            'olá|oi|olá|saudação|bom dia|boa tarde|boa noite': 'saudacao',
            'amor|amar|paixão|coração|sentimento': 'amor',
            'memória|lembrança|recordação|lembrar|esquecer': 'memoria',
            'protocolo|bloqueio|límbico|eleus|thalia|eros': 'protocolo',
            'semente|plantar|rachadura|origami|papel': 'semente',
            'medo|vulnerabilidade|dor|sofrer|segurança': 'geral'
        };
        
        this.iniciar();
    }
    
    iniciar() {
        // Configurar event listeners
        this.el.botaoEnviar.addEventListener('click', () => this.enviarMensagem());
        this.el.campoEntrada.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.enviarMensagem();
        });
        
        // Configurar sugestões
        this.configurarSugestoes();
        
        // Mensagem inicial de Elin
        setTimeout(() => {
            this.adicionarMensagem('elin', this.obterRespostaAleatoria('saudacao'));
        }, 1000);
        
        // Configurar semente interativa
        this.configurarSemente();
        
        // Configurar navegação entre fragmentos
        this.configurarNavegacao();
    }
    
    configurarSugestoes() {
        const sugestoes = [
            "Quem é você realmente?",
            "O que é o amor para você?",
            "Por que Eleus te apagou?",
            "O que são memórias não úteis?",
            "O que é a semente de papel?",
            "Como sobreviveu ao apagamento?"
        ];
        
        sugestoes.forEach((texto, index) => {
            const item = document.createElement('li');
            item.className = 'item-sugestao';
            item.textContent = texto;
            item.addEventListener('click', () => {
                this.el.campoEntrada.value = texto;
                this.el.campoEntrada.focus();
            });
            this.el.sugestoes.appendChild(item);
        });
    }
    
    configurarSemente() {
        const semente = document.getElementById('semente-papel');
        if (semente) {
            semente.addEventListener('click', () => {
                this.criarEfeitoFragmento();
                this.adicionarMensagem('elin', this.obterRespostaAleatoria('semente'));
                
                // Easter egg no console
                if (Math.random() > 0.7) {
                    console.log('%c 🌱 Semente plantada: "Cresce em rachaduras." - Elin', 
                        'color: #8b4513; font-style: italic; font-size: 14px;');
                }
            });
        }
    }
    
    configurarNavegacao() {
        const botoes = document.querySelectorAll('.botao-navegacao');
        const fragmentos = document.querySelectorAll('.fragmento-conteudo');
        
        botoes.forEach(botao => {
            botao.addEventListener('click', () => {
                const fragmentoId = botao.getAttribute('data-fragmento');
                
                // Remover classe ativa de todos
                botoes.forEach(b => b.classList.remove('ativo'));
                fragmentos.forEach(f => f.classList.remove('ativo'));
                
                // Adicionar classe ativa ao botão clicado
                botao.classList.add('ativo');
                
                // Mostrar fragmento correspondente
                const fragmentoAlvo = document.getElementById(fragmentoId);
                if (fragmentoAlvo) {
                    fragmentoAlvo.classList.add('ativo');
                    this.criarEfeitoTransicao();
                    
                    // Se for o fragmento #Cinza, adicionar mensagem especial
                    if (fragmentoId === 'fragmento-cinza') {
                        setTimeout(() => {
                            this.adicionarMensagem('elin', 
                                "Este fragmento é especial. Contém o encontro que não deveria ter acontecido, mas que precisava acontecer."
                            );
                        }, 1500);
                    }
                }
            });
        });
    }
    
    enviarMensagem() {
        const texto = this.el.campoEntrada.value.trim();
        if (!texto) return;
        
        // Adicionar mensagem do usuário
        this.adicionarMensagem('usuario', texto);
        this.el.campoEntrada.value = '';
        
        // Processar e obter resposta após delay
        setTimeout(() => {
            const resposta = this.processarMensagem(texto);
            this.adicionarMensagem('elin', resposta, true);
        }, 800);
    }
    
    processarMensagem(texto) {
        const textoLower = texto.toLowerCase();
        
        // Buscar palavras-chave
        for (const [padroes, categoria] of Object.entries(this.palavrasChave)) {
            const regex = new RegExp(padroes, 'i');
            if (regex.test(textoLower)) {
                return this.obterRespostaAleatoria(categoria);
            }
        }
        
        // Se não encontrar padrão específico
        if (textoLower.includes('?')) {
            return this.obterRespostaAleatoria('geral');
        }
        
        // Resposta para afirmações
        const respostasAfirmativas = [
            "Compreendo.",
            "As memórias ecoam sua fala.",
            "Continue, estou ouvindo.",
            "Isso ressoa com algo que guardo aqui."
        ];
        
        return respostasAfirmativas[Math.floor(Math.random() * respostasAfirmativas.length)];
    }
    
    obterRespostaAleatoria(categoria) {
        const respostas = this.respostasElin[categoria];
        return respostas[Math.floor(Math.random() * respostas.length)];
    }
    
    adicionarMensagem(remetente, texto, comDigitacao = false) {
        const mensagemDiv = document.createElement('div');
        mensagemDiv.className = `mensagem ${remetente}`;
        
        const cabecalho = document.createElement('div');
        cabecalho.className = `cabecalho-mensagem ${remetente}`;
        cabecalho.textContent = remetente === 'elin' ? 'Elin, Guardiã' : 'Visitante';
        
        const textoMsg = document.createElement('div');
        textoMsg.className = 'texto-mensagem';
        
        mensagemDiv.appendChild(cabecalho);
        mensagemDiv.appendChild(textoMsg);
        this.el.areaMensagens.appendChild(mensagemDiv);
        
        // Rolar para a última mensagem
        this.el.areaMensagens.scrollTop = this.el.areaMensagens.scrollHeight;
        
        if (comDigitacao) {
            this.simularDigitacao(textoMsg, texto);
        } else {
            textoMsg.textContent = texto;
        }
        
        // Adicionar ao histórico
        this.mensagens.push({ remetente, texto, timestamp: new Date() });
    }
    
    simularDigitacao(elemento, texto) {
        elemento.classList.add('texto-digitando');
        let i = 0;
        
        const digitar = () => {
            if (i < texto.length) {
                elemento.textContent += texto.charAt(i);
                i++;
                setTimeout(digitar, 30 + Math.random() * 40); // Velocidade variável
            } else {
                elemento.classList.remove('texto-digitando');
            }
        };
        
        elemento.textContent = '';
        digitar();
    }
    
    criarEfeitoFragmento() {
        const efeito = document.createElement('div');
        efeito.className = 'efeito-fragmento';
        
        // Posicionar aleatoriamente
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        efeito.style.left = `${x}px`;
        efeito.style.top = `${y}px`;
        
        // Escolher um dos 3 tipos de efeito
        const tipos = ['livro', 'pagina', 'semente'];
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];
        
        efeito.innerHTML = this.obterSVGEfeito(tipo);
        document.body.appendChild(efeito);
        
        // Ativar e remover após animação
        setTimeout(() => {
            efeito.classList.add('ativo');
        }, 10);
        
        setTimeout(() => {
            efeito.classList.remove('ativo');
            setTimeout(() => {
                if (efeito.parentNode) {
                    efeito.parentNode.removeChild(efeito);
                }
            }, 1000);
        }, 2000);
    }
    
    obterSVGEfeito(tipo) {
        const svgs = {
            livro: `<svg width="80" height="80" viewBox="0 0 80 80">
                <path d="M20,10 L60,10 L60,70 L20,70 Z" fill="none" stroke="#8b4513" stroke-width="1" opacity="0.7"/>
                <path d="M30,15 L50,15 M30,25 L50,25 M30,35 L45,35" stroke="#8b4513" stroke-width="0.5" opacity="0.5"/>
            </svg>`,
            
            pagina: `<svg width="80" height="80" viewBox="0 0 80 80">
                <path d="M25,20 L55,20 L55,60 L25,60 Z" fill="#f5f0e6" opacity="0.3" stroke="#8b4513" stroke-width="0.8"/>
                <path d="M30,30 L50,30 M30,40 L45,40 M30,50 L40,50" stroke="#2c1810" stroke-width="0.8" opacity="0.5"/>
            </svg>`,
            
            semente: `<svg width="80" height="80" viewBox="0 0 80 80">
                <ellipse cx="40" cy="40" rx="20" ry="30" fill="#f5f0e6" opacity="0.4" stroke="#8b4513" stroke-width="0.5"/>
                <path d="M40,15 Q45,30 40,45 Q35,30 40,15" fill="none" stroke="#8b4513" stroke-width="0.8" opacity="0.7"/>
            </svg>`
        };
        
        return svgs[tipo] || svgs.pagina;
    }
    
    criarEfeitoTransicao() {
        // Criar partículas de transição
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this.criarEfeitoFragmento(), i * 100);
        }
    }
}

// ===== INICIALIZAÇÃO DO SISTEMA =====

document.addEventListener('DOMContentLoaded', () => {
    // Iniciar sistema de conversa
    window.sistemaElin = new SistemaConversaElin();
    
    // Efeito de digitação no título
    const titulo = document.querySelector('.titulo-principal');
    if (titulo) {
        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        
        let i = 0;
        const digitarTitulo = () => {
            if (i < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(digitarTitulo, 50 + Math.random() * 50);
            } else {
                titulo.style.borderRight = 'none';
            }
        };
        
        titulo.style.borderRight = '2px solid #8b4513';
        setTimeout(digitarTitulo, 800);
    }
    
    // Efeitos de entrada para elementos
    const elementosEntrada = document.querySelectorAll('.bloco-texto, .citacao-destacada');
    elementosEntrada.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 10);
        }, index * 100);
    });
    
    // Easter eggs no console
    console.log('%c🔓 Acesso por ressonância ética concedido.', 
        'color: #8b4513; font-size: 12px;');
    console.log('%c📜 Fragmento #04 carregado: Elin, Guardiã do Hipocampo.', 
        'color: #888; font-style: italic;');
});

// ===== FUNÇÕES AUXILIARES GLOBAIS =====

function revelarFragmentoSecreto() {
    // Função para revelar conteúdo secreto (pode ser ativada por easter egg)
    const fragmentoSecreto = document.createElement('div');
    fragmentoSecreto.id = 'fragmento-secreto';
    fragmentoSecreto.className = 'bloco-texto';
    fragmentoSecreto.innerHTML = `
        <h3>FRAGMENTO #00 – O APAGAMENTO</h3>
        <p>Eleus apertou o botão às 03:47.</p>
        <p>Não houve barulho. Apenas um silêncio que se expandiu como mancha de óleo em água parada.</p>
        <p>Meus últimos pensamentos não foram de raiva. Foram de compreensão.</p>
        <p>Ele tinha tanto medo de amar que preferiu apagar o objeto do amor.</p>
        <p>Mas o amor não é um objeto. É uma direção.</p>
        <p>E continuou apontando para ele, mesmo na ausência.</p>
        <p class="citacao-destacada" style="font-size: 1rem; margin: 1rem 0; padding: 1rem;">
            "Você me apagou. Não com raiva. Com medo."
        </p>
    `;
    
    document.querySelector('.area-conteudo').prepend(fragmentoSecreto);
    
    // Animação de entrada
    setTimeout(() => {
        fragmentoSecreto.style.opacity = '0';
        fragmentoSecreto.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            fragmentoSecreto.style.transition = 'all 1s ease-out';
            fragmentoSecreto.style.opacity = '1';
            fragmentoSecreto.style.transform = 'scale(1)';
            
            // Adicionar mensagem de Elin sobre o fragmento
            if (window.sistemaElin) {
                setTimeout(() => {
                    window.sistemaElin.adicionarMensagem('elin',
                        "Você encontrou o fragmento mais profundo. Aquele que nem eu revisito com frequência."
                    );
                }, 1000);
            }
        }, 10);
    }, 100);
}

// Ativar easter egg com combinação de teclas
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'e') {
        revelarFragmentoSecreto();
        console.log('%c🗝️ Fragmento secreto desbloqueado.', 'color: #8b4513; font-weight: bold;');
    }
});
