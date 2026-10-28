const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle('active', item === button));

    productCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter || card.dataset.occasion === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

const styleFilters = document.querySelectorAll('.mini-filter');
const inspirationCards = document.querySelectorAll('.inspiration-card');

styleFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.style;

    styleFilters.forEach((item) => item.classList.toggle('active', item === button));

    inspirationCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.style === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

const favoriteStorageKey = 'velvet-muse-favorites';
function getFavorites() {
  const saved = localStorage.getItem(favoriteStorageKey);
  return saved ? JSON.parse(saved) : [];
}

function saveFavorites(items) {
  localStorage.setItem(favoriteStorageKey, JSON.stringify(items));
}

function updateFavoritesList() {
  const favoriteList = document.getElementById('favorite-list');
  if (!favoriteList) return;

  const favorites = getFavorites();

  if (!favorites.length) {
    favoriteList.innerHTML = '<div class="empty-state">Você ainda não salvou nenhum favorito. Explore looks e referências para montar sua citação de estilo.</div>';
    return;
  }

  favoriteList.innerHTML = favorites
    .map(
      (item) => `
        <article class="favorite-item">
          <div class="favorite-thumb">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="favorite-copy">
            <span>${item.type}</span>
            <h3>${item.name}</h3>
          </div>
        </article>
      `
    )
    .join('');
}

function toggleFavorite(button) {
  const card = button.closest('[data-id]');
  if (!card) return;

  const id = card.dataset.id;
  const favorites = getFavorites();
  const productTitle = card.querySelector('h3');
  const itemType = card.querySelector('.product-topline span') || card.querySelector('.inspiration-overlay span');
  const image = card.querySelector('img')?.src || '';

  const name = productTitle ? productTitle.textContent.trim() : card.dataset.id;
  const type = itemType ? itemType.textContent.trim() : 'Inspiração';

  const index = favorites.findIndex((item) => item.id === id);

  if (index >= 0) {
    favorites.splice(index, 1);
    button.classList.remove('active');
    button.textContent = '♡';
  } else {
    favorites.push({ id, name, type, image });
    button.classList.add('active');
    button.textContent = '♥';
  }

  saveFavorites(favorites);
  updateFavoritesList();
}

const favoriteButtons = document.querySelectorAll('.fav-btn, .save-btn');

favoriteButtons.forEach((button) => {
  const card = button.closest('[data-id]');
  if (!card) return;

  const favorites = getFavorites();
  const isSaved = favorites.some((item) => item.id === card.dataset.id);

  if (isSaved) {
    button.classList.add('active');
    button.textContent = '♥';
  }

  button.addEventListener('click', () => toggleFavorite(button));
});

const quizSteps = [...document.querySelectorAll('.quiz-step')];
const quizOptions = document.querySelectorAll('.quiz-option');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const resultTips = document.getElementById('result-tips');

const profileData = {
  'dark feminine': {
    title: 'Dark feminine',
    description: 'Uma identidade sofisticada, misteriosa e irresistivelmente feminina, com foco em contrastes marcantes e peças que ditam presença.',
    tips: ['Roupas com cortes impecáveis', 'Metalizados e detalhes em prata', 'Maquiagem marcante e elegante']
  },
  elegante: {
    title: 'Elegante clássica',
    description: 'Seu estilo tem uma energia clean, refinada e segura, valorizando linhas diretas, tecidos nobres e uma presença equilibrada.',
    tips: ['Peças estruturadas e impecáveis', 'Paleta neutra com brilho discreto', 'Acessórios minimalistas e sofisticados']
  },
  casual: {
    title: 'Casual chic',
    description: 'Você equilibra conforto e refinamento com um olhar leve, moderno e funcional, mantendo a autoestima em todas as circunstâncias.',
    tips: ['Combinações prático-luxuosas', 'Calças fluidas e camisetas elegantes', 'Sobreposição com leveza']
  },
  vintage: {
    title: 'Vintage glam',
    description: 'Você busca elegância atemporal com detalhes especiais, equilíbrio entre nostalgia e requinte, sempre com um toque de fantasia.',
    tips: ['Rendas, estampas e brilho suave', 'Silhuetas marcantes e atemporais', 'Detalhes que contam história']
  }
};

const scoreMap = { 'dark feminine': 0, elegante: 0, casual: 0, vintage: 0 };
let currentStep = 0;

const showStep = (index) => {
  quizSteps.forEach((step, stepIndex) => {
    step.classList.toggle('active', stepIndex === index);
  });
};

quizOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const selected = option.dataset.score;
    scoreMap[selected] += 1;

    const totalSteps = quizSteps.length;

    if (currentStep < totalSteps - 1) {
      currentStep += 1;
      showStep(currentStep);
      return;
    }

    const resultKey = Object.entries(scoreMap).sort((a, b) => b[1] - a[1])[0][0];
    const profile = profileData[resultKey];

    if (resultTitle) resultTitle.textContent = profile.title;
    if (resultDescription) resultDescription.textContent = profile.description;
    if (resultTips) {
      resultTips.innerHTML = profile.tips.map((tip) => `<li>${tip}</li>`).join('');
    }
  });
});

updateFavoritesList();
