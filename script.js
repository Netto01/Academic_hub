// Lista de links com descrição
const links = [
    { 
        title: "ILovePDF", 
        url: "https://www.ilovepdf.com/pt", 
        category: "ferramentas", 
        description: "Plataforma online para manipular arquivos PDF, como converter, comprimir, editar e organizar." 
    },
    { 
        title: "ILoveIMG", 
        url: "https://www.iloveimg.com/pt", 
        category: "ferramentas", 
        description: "Ferramenta online para editar e manipular imagens, como comprimir, redimensionar e converter formatos." 
    },
    { 
        title: "OnlineDocTranslator", 
        url: "https://www.onlinedoctranslator.com/pt/", 
        category: "ferramentas", 
        description: "Plataforma para traduzir documentos mantendo o layout original, suportando PDF, Word, PowerPoint e mais." 
    },
    { 
        title: "DeepSeek", 
        url: "https://www.deepseek.com/", 
        category: "tecnologia", 
        description: "Ferramenta de IA para análise de dados, automação de tarefas e geração de insights." 
    },
    { 
        title: "Convertio", 
        url: "https://convertio.co/pt/", 
        category: "ferramentas", 
        description: "Conversor online de arquivos, suportando mais de 300 formatos, como documentos, imagens, áudios e vídeos." 
    },
    { 
        title: "Freepik", 
        url: "https://www.freepik.com/", 
        category: "design", 
        description: "Biblioteca de recursos gráficos gratuitos e premium, como vetores, fotos, ícones e mockups." 
    },
    { 
        title: "MORE", 
        url: "https://more.ufsc.br/inicio", 
        category: "educacao", 
        description: "Ferramenta para gerar referências bibliográficas de acordo com normas acadêmicas, como ABNT e APA." 
    },
    { 
        title: "ChatGPT", 
        url: "https://chatgpt.com/", 
        category: "tecnologia", 
        description: "Plataforma de IA para interações em linguagem natural, geração de textos e resolução de problemas." 
    },
    { 
        title: "Humata.ai", 
        url: "https://www.humata.ai/", 
        category: "tecnologia", 
        description: "Ferramenta de IA para analisar, resumir e extrair insights de documentos de texto." 
    },
    { 
        title: "SSSInstagram", 
        url: "https://sssinstagram.com/pt", 
        category: "ferramentas", 
        description: "Plataforma para baixar fotos, vídeos, stories e reels do Instagram de forma rápida e gratuita." 
    },
    { 
        title: "Zeemo.ai", 
        url: "https://zeemo.ai/pt/tools/youtube-video-downloader", 
        category: "ferramentas", 
        description: "Ferramenta para baixar vídeos do YouTube em diferentes formatos e qualidades, como MP4 e MP3." 
    },
    { 
        title: "Lucidchart", 
        url: "https://www.lucidchart.com/pages", 
        category: "design", 
        description: "Plataforma de diagramação para criar fluxogramas, mapas mentais, organogramas e wireframes." 
    },
    { 
        title: "PushinPay", 
        url: "https://pushinpay.com.br/", 
        category: "financas", 
        description: "Plataforma brasileira de pagamentos digitais e soluções financeiras, com foco em transações seguras e eficientes." 
    },
    { 
        title: "CapCut", 
        url: "https://www.capcut.com/pt-br/login?enter_from=log_out&current_page=work_space", 
        category: "ferramentas", 
        description: "O CapCut é um aplicativo de edição de vídeos gratuito e intuitivo." 
    },
    { 
        title: "BibGuru", 
        url: "https://app.bibguru.com/p/aea27f1b-f09c-4a91-add6-bd42116546ce", 
        category: "educacao", 
        description: "O BibGuru é uma ferramenta online que ajuda a criar citações e bibliografias automaticamente em diversos formatos (como APA, MLA, Chicago, entre outros)." 
    }
];

// Seleciona o botão de alternância de tema
const themeToggle = document.getElementById('themeToggle');

// Verifica se há uma preferência de tema salva no localStorage
const savedTheme = localStorage.getItem('theme');

// Aplica o tema salvo (se existir)
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
} else {
    // Define o tema padrão (claro)
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
}

// Função para alternar o tema
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Aplica o novo tema
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Altera o ícone do botão
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// ========== SISTEMA DE FILTROS ==========
const filterButtons = document.querySelectorAll('.filter-button');
let activeCategory = 'all';

// Ativar filtro inicial
document.querySelector('.filter-button[data-category="all"]').classList.add('active');

// Handler de filtros
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Atualizar filtro ativo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        activeCategory = button.dataset.category;
        
        // Combinar com busca atual
        const searchTerm = document.getElementById('searchBar').value.toLowerCase();
        applyFilters(searchTerm, activeCategory);
    });
});

// ========== SISTEMA DE BUSCA EM TEMPO REAL ==========
document.getElementById('searchBar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Pega o valor digitado
    applyFilters(searchTerm, activeCategory); // Aplica os filtros
});

// Função combinada de filtros
function applyFilters(searchTerm, category) {
    const filteredLinks = links.filter(link => {
        const matchesSearch = link.title.toLowerCase().includes(searchTerm) || 
                             link.description.toLowerCase().includes(searchTerm); // Busca na descrição
        const matchesCategory = category === 'all' || link.category === category;
        return matchesSearch && matchesCategory;
    });
    displayLinks(filteredLinks);
}

// ========== GERENCIAMENTO DE LINKS ==========
function trackClick(url) {
    const clickStats = JSON.parse(localStorage.getItem('clickStats')) || {};
    clickStats[url] = (clickStats[url] || 0) + 1;
    localStorage.setItem('clickStats', JSON.stringify(clickStats));
}

function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('URL copiada com sucesso!');
    });
}

// ========== RENDERIZAÇÃO DE LINKS ==========
function displayLinks(linksToShow) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    linksToShow.forEach(link => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${link.title}</h3>
            <p>Categoria: ${link.category}</p>
            <div class="description">${link.description}</div>
            <div class="link-actions">
                <a href="${link.url}" target="_blank">Visitar Link</a>
                <button class="copy-url" data-url="${link.url}">Copiar URL</button>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}

// ========== FUNCIONALIDADE DE PIX ==========
function setupPixDonation() {
    const pixKey = "f528cfe5-ffb5-4623-b364-20cb7f946e96"; // Substitua pela sua chave Pix
    const donationSection = document.createElement('div');
    donationSection.className = 'donation-section';
    donationSection.innerHTML = `
        <h2>Gostou do Academic Hub?</h2>
        <p>
            Se este site te ajudou de alguma forma e você quer apoiar voluntariamente, 
            ficaremos muito gratos pela sua contribuição! 💖
        </p>
        <button id="copyPixButton" class="donation-button"> Copiar Chave Pix</button>
        <p class="donation-note">
            Contribuições são opcionais e não afetam o uso do Academic Hub.
        </p>
    `;
    document.querySelector('.container').appendChild(donationSection);

    // Copiar chave Pix
    document.getElementById('copyPixButton').addEventListener('click', () => {
        navigator.clipboard.writeText(pixKey)
            .then(() => alert('Chave Pix copiada! 🎉'))
            .catch(() => alert('Erro ao copiar a chave Pix. 😢'));
    });
}

// ========== EVENT LISTENERS GLOBAIS ==========
document.addEventListener('click', (e) => {
    // Copiar URL
    if (e.target.classList.contains('copy-url')) {
        copyToClipboard(e.target.dataset.url);
    }
    
    // Trackear cliques
    if (e.target.tagName === 'A' && e.target.href) {
        trackClick(e.target.href);
    }
});

// ========== INICIALIZAÇÃO ==========
displayLinks(links); // Exibir todos os links inicialmente
setupPixDonation(); // Configurar a seção de doações via Pix

// ========== SISTEMA DE ABAS ==========
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove a classe 'active' de todos os botões e conteúdos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Adiciona a classe 'active' ao botão clicado e ao conteúdo correspondente
        const tabId = this.getAttribute('data-tab');
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});