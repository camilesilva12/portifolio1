document.addEventListener('DOMContentLoaded', function() {
    // --- AOS (Animate On Scroll) Initialization ---
    // AOS.init() já está no HTML, mas se você tiver configurações específicas
    // que dependam de elementos carregados, poderia vir aqui.
    // Por enquanto, o script no HTML já é suficiente.

    // --- Destacar item de menu ativo na navegação ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu a');
    const header = document.querySelector('header');

    function highlightNavLink() {
        let current = '';
        const headerOffset = header.offsetHeight; // Altura do cabeçalho fixo

        sections.forEach(section => {
            // Calcula a posição do topo da seção, ajustando pela altura do cabeçalho fixo
            // O '- 1' é um pequeno ajuste para garantir que a seção esteja realmente visível
            const sectionTop = section.offsetTop - headerOffset - 1; 
            const sectionHeight = section.offsetHeight; 
            
            // Verifica se a posição atual do scroll está dentro dos limites da seção
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.id; // Define o ID da seção atual
            }
        });

        // Remove a classe 'active' de todos os links e adiciona ao link da seção atual
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Verifica se o href do link contém o ID da seção atual
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // --- Botão Voltar ao Topo ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        // Adiciona ou remove a classe 'show' baseada na posição do scroll
        // O botão é visível quando o scroll é maior que 300px
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // O clique no botão já funciona via href="#inicio" e scroll-behavior: smooth no CSS.

    // --- Efeito de Digitação (Typewriter) ---
    const typedTextSpan = document.getElementById('typed-text');
    const phrases = [
        "Estudante criativa apaixonada por design, natureza e tecnologia.",
        "Transformando ideias em experiências digitais.",
        "Criando sites bonitos, funcionais e com significado."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 70; // Velocidade de digitação (ms por caractere)
    const deletingSpeed = 40; // Velocidade de exclusão (ms por caractere)
    const pauseTime = 1500; // Tempo de pausa antes de digitar/apagar a próxima frase (ms)

    function typeWriterEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Apagando texto: diminui o charIndex
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Digitanto texto: aumenta o charIndex
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentTypingSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Terminou de digitar a frase, pausa e então começa a apagar
            currentTypingSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Terminou de apagar a frase, muda para a próxima frase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Loop para a próxima frase
            currentTypingSpeed = typingSpeed; // Reinicia a velocidade de digitação
        }

        // Chama a função novamente após o tempo determinado
        setTimeout(typeWriterEffect, currentTypingSpeed);
    }

    // --- Inicia todas as funcionalidades ao carregar a página ---
    highlightNavLink(); // Define o link ativo inicial
    typeWriterEffect(); // Inicia o efeito de digitação
});
