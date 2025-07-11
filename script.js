document.addEventListener('DOMContentLoaded', function() {
    // --- AOS (Animate On Scroll) Initialization ---
    // Inicializa a biblioteca AOS para animações de rolagem
    AOS.init({
        duration: 1000, // Duração padrão da animação (em ms)
        once: true      // Animar apenas uma vez ao rolar para baixo
    });

    // --- Destaque do item de menu ativo na navegação ---
    const sections = document.querySelectorAll('section[id]'); // Seleciona todas as seções com um ID
    const navLinks = document.querySelectorAll('.menu a');     // Seleciona todos os links de navegação
    const header = document.querySelector('header');          // Seleciona o cabeçalho para ajustar o offset

    function highlightNavLink() {
        let current = '';
        // Calcula a altura do cabeçalho para ajustar o ponto de detecção da seção
        const headerOffset = header.offsetHeight;

        // Itera sobre cada seção para verificar qual está visível
        sections.forEach(section => {
            // Calcula a posição do topo da seção, ajustando pela altura do cabeçalho fixo
            // O '- 1' é um pequeno ajuste para garantir que a seção esteja totalmente visível no topo da viewport
            const sectionTop = section.offsetTop - headerOffset - 1; 
            const sectionHeight = section.offsetHeight; // Usar offsetHeight para incluir padding/border
            
            // Verifica se a posição atual do scroll da janela está dentro dos limites da seção
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.id; // Define o ID da seção atual
            }
        });

        // Remove a classe 'active' de todos os links e adiciona ao link da seção atual
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Verifica se o href do link contém o ID da seção atual (ex: href="#inicio" e current="inicio")
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // --- Botão "Voltar ao Topo" ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        // Adiciona ou remove a classe 'show' baseada na posição do scroll
        // O botão é visível quando o scroll da página é maior que 300px
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show'); // Adiciona classe para tornar visível com transição
        } else {
            backToTopBtn.classList.remove('show'); // Remove classe para esconder
        }
    });

    // O clique no botão já funciona pelo atributo href="#inicio" e pela propriedade CSS 'scroll-behavior: smooth' no body.

    // --- Efeito de Digitação (Typewriter Effect) ---
    const typedTextSpan = document.getElementById('typed-text');
    // Frases que serão digitadas e apagadas
    const phrases = [
        "Estudante criativa apaixonada por design, natureza e tecnologia.",
        "Transformando ideias em experiências digitais.",
        "Criando sites bonitos, funcionais e com significado."
    ];
    let phraseIndex = 0; // Índice da frase atual no array 'phrases'
    let charIndex = 0;   // Índice do caractere atual sendo digitado/apagado
    let isDeleting = false; // Flag para indicar se está digitando ou apagando
    const typingSpeed = 70; // Velocidade de digitação (milissegundos por caractere)
    const deletingSpeed = 40; // Velocidade de exclusão (milissegundos por caractere)
    const pauseTime = 1500; // Tempo de pausa antes de digitar/apagar a próxima frase (milissegundos)

    function typeWriterEffect() {
        const currentPhrase = phrases[phraseIndex]; // Pega a frase atual

        if (isDeleting) {
            // Se estiver apagando, remove um caractere
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Se estiver digitando, adiciona um caractere
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        // Define a velocidade baseada se está digitando ou apagando
        let currentTypingSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Se terminou de digitar a frase, pausa e começa a apagar
            currentTypingSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Se terminou de apagar a frase, muda para a próxima frase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Avança para a próxima frase, fazendo loop no array
            currentTypingSpeed = typingSpeed; // Reinicia a velocidade para digitar a nova frase
        }

        // Chama a função novamente após o tempo determinado para o próximo caractere/ação
        setTimeout(typeWriterEffect, currentTypingSpeed);
    }

    // --- Inicia todas as funcionalidades ao carregar a página ---
    highlightNavLink(); // Define o link ativo inicial (útil se a página carregar no meio do scroll)
    typeWriterEffect(); // Inicia o efeito de digitação na frase principal
});
