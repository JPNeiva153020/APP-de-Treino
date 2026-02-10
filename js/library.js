/* ============================================
   KEGEL GO - LÓGICA DA BIBLIOTECA
   ============================================ */

// Base de dados de artigos (simulada)
const articles = [
  {
    id: 1,
    title: 'A ciência por trás do controle ejaculatório',
    description: 'Entenda como os exercícios funcionam no seu corpo.',
    category: 'performance',
    tags: ['ejaculação', 'controle', 'ciência'],
    readTime: 7,
    verified: true,
    author: 'Dr. André Silva, Urologista',
    image: '🧬',
  },
  {
    id: 2,
    title: 'O guia definitivo da Testosterona',
    description: 'Como sono, dieta e exercícios impactam seus níveis.',
    category: 'hormonal',
    tags: ['testosterona', 'hormônios', 'saúde'],
    readTime: 8,
    verified: true,
    author: 'Dr. Carlos Mendes, Endocrinologista',
    image: '⚗️',
  },
  {
    id: 3,
    title: 'Sono e Ereção: A conexão invisível',
    description: 'Como sua mente trava seu corpo.',
    category: 'mental',
    tags: ['sono', 'ereção', 'ansiedade'],
    readTime: 4,
    verified: false,
    author: 'Psicólogo Clínico',
    image: '😴',
  },
  {
    id: 4,
    title: 'Nutrição para o Homem Moderno',
    description: 'Alimentos que impulsionam sua vitalidade.',
    category: 'lifestyle',
    tags: ['nutrição', 'dieta', 'saúde'],
    readTime: 5,
    verified: true,
    author: 'Nutricionista Especializado',
    image: '🥗',
  },
];

// Renderizar lista de artigos
function renderArticles(articlesToRender = articles) {
  const articlesList = document.getElementById('articles-list');
  if (!articlesList) return;
  
  articlesList.innerHTML = '';
  
  articlesToRender.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.className = 'article-item';
    articleElement.onclick = () => viewArticle(article.id);
    
    articleElement.innerHTML = `
      <div class="article-item-image">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 32px;">
          ${article.image}
        </div>
      </div>
      <div class="article-item-content">
        <div>
          <h4 class="article-item-title">${article.title}</h4>
          <p class="article-item-description">${article.description}</p>
        </div>
        <div class="article-item-meta">
          <span>⏱️ ${article.readTime} min leitura</span>
          ${article.verified ? '<span class="article-item-verified">✓ Verificado</span>' : ''}
        </div>
      </div>
    `;
    
    articlesList.appendChild(articleElement);
  });
}

// Filtrar por tag
function filterByTag(tag) {
  const filtered = articles.filter(article => article.tags.includes(tag));
  renderArticles(filtered);
}

// Filtrar por pilar
function filterByPillar(pillar) {
  const filtered = articles.filter(article => article.category === pillar);
  renderArticles(filtered);
}

// Ver artigo
function viewArticle(articleId) {
  const article = articles.find(a => a.id === articleId);
  if (article) {
    // Atualizar conteúdo do artigo na tela de detalhe
    const articleTitle = document.querySelector('#article-detail h2');
    const articleMeta = document.querySelector('.article-meta');
    
    if (articleTitle) {
      articleTitle.textContent = article.title;
    }
    
    if (articleMeta) {
      articleMeta.innerHTML = `Revisado por: <strong>${article.author}</strong>`;
    }
    
    kegelApp.navigateTo('article-detail');
  }
}

// Buscar artigos
function searchArticles(query) {
  const filtered = articles.filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.description.toLowerCase().includes(query.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
  renderArticles(filtered);
}

// Configurar event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Renderizar artigos iniciais
  renderArticles();
  
  // Configurar busca
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      if (e.target.value.trim()) {
        searchArticles(e.target.value);
      } else {
        renderArticles();
      }
    });
  }
});
