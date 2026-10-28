const lookData = [
  {
    id: 1,
    name: 'Noir Romance',
    color: 'vermelho',
    occasion: 'noite',
    style: 'elegante',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    description: 'Vestido estruturado com corte sofisticado e presença marcante.',
    tags: ['Vestido', 'Vermelho', 'Noite']
  },
  {
    id: 2,
    name: 'Midnight Layers',
    color: 'preto',
    occasion: 'noite',
    style: 'gótico',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    description: 'Camadas pesadas, contraste dramático e energia sedutora.',
    tags: ['Jaqueta', 'Preto', 'Gótico']
  },
  {
    id: 3,
    name: 'Silver Muse',
    color: 'prata',
    occasion: 'dia',
    style: 'elegante',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    description: 'Brilho discreto para quem quer luxo atemporal e refinamento.',
    tags: ['Acessório', 'Prata', 'Dia']
  },
  {
    id: 4,
    name: 'Velvet Bloom',
    color: 'vermelho',
    occasion: 'noite',
    style: 'dark feminine',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    description: 'Texturas suaves e linhas que valorizam a presença feminina.',
    tags: ['Saia', 'Vermelho', 'Dark']
  },
  {
    id: 5,
    name: 'Urban Quiet',
    color: 'preto',
    occasion: 'dia',
    style: 'casual',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    description: 'Minimalismo urbano com toque sofisticado e confortável.',
    tags: ['Casual', 'Preto', 'Dia']
  },
  {
    id: 6,
    name: 'Pearl Echo',
    color: 'prata',
    occasion: 'dia',
    style: 'vintage',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    description: 'Fusão entre clássico e contemporâneo com delicadeza editorial.',
    tags: ['Vintage', 'Prata', 'Elegante']
  }
];

const inspirationData = [
  {
    id: 101,
    category: 'elegante',
    title: 'Elegante',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 102,
    category: 'dark feminine',
    title: 'Dark feminine',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 103,
    category: 'casual',
    title: 'Casual',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 104,
    category: 'vintage',
    title: 'Vintage',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 105,
    category: 'gótico',
    title: 'Gótico',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 106,
    category: 'elegante',
    title: 'Minimal luxe',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
  }
];

const favoritesKey = 'velvet-muse-favorites';
let selectedFavorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');

const lookGrid = document.getElementById('lookGrid');
const inspirationGrid = document.getElementById('inspirationGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const quizForm = document.getElementById('quizForm');
const styleResult = document.getElementById('styleResult');

function renderLooks(activeFilters = {}) {
  const items = lookData.filter((item) => {
    const matchesColor = !activeFilters.color || activeFilters.color === 'all' || item.color === activeFilters.color;
    const matchesOccasion = !activeFilters.occasion || activeFilters.occasion === 'all' || item.occasion === activeFilters.occasion;
    const matchesStyle = !activeFilters.style || activeFilters.style === 'all' || item.style === activeFilters.style;
    return matchesColor && matchesOccasion && matchesStyle;
  });

  lookGrid.innerHTML = items
    .map(
      (item) => `
        <article class="look-card">
          <img src="${item.image}" alt="${item.name}" />
          <div class="card-body">
            <div class="card-head">
              <h3>${item.name}</h3>
              <button class="save-btn ${selectedFavorites.includes(`look-${item.id}`) ? 'active' : ''}" data-type="look" data-id="${item.id}" aria-label="Salvar look">♥</button>
            </div>
            <div class="meta-row">
              ${item.tags.map((tag) => `<span class="meta-pill">${tag}</span>`).join('')}
            </div>
            <p>${item.description}</p>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.save-btn').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(button.dataset.type, Number(button.dataset.id)));
  });
}

function renderInspiration(category = 'all') {
  const items = category === 'all' ? inspirationData : inspirationData.filter((item) => item.category === category);

  inspirationGrid.innerHTML = items
    .map(
      (item) => `
      <article class="inspiration-card">
        <img src="${item.image}" alt="${item.title}" />
        <div class="card-body">
          <h3>${item.title}</h3>
          <button class="save-btn ${selectedFavorites.includes(`inspiration-${item.id}`) ? 'active' : ''}" data-type="inspiration" data-id="${item.id}" aria-label="Salvar inspiração">♥</button>
        </div>
      </article>
      `
    )
    .join('');

  document.querySelectorAll('.save-btn').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(button.dataset.type, Number(button.dataset.id)));
  });
}

function renderFavorites() {
  const merged = [
    ...lookData.filter((item) => selectedFavorites.includes(`look-${item.id}`)).map((item) => ({ ...item, type: 'look' })),
    ...inspirationData.filter((item) => selectedFavorites.includes(`inspiration-${item.id}`)).map((item) => ({ ...item, type: 'inspiration' }))
  ];

  if (!merged.length) {
    favoritesGrid.innerHTML = '<div class="empty-state">Nenhum item salvo ainda. Explore os looks e inspirações para criar seu moodboard.</div>';
    return;
  }

  favoritesGrid.innerHTML = merged
    .map(
      (item) => `
      <article class="favorite-item">
        <img src="${item.image}" alt="${item.name || item.title}" />
        <div class="card-body">
          <div class="card-head">
            <h3>${item.name || item.title}</h3>
            <button class="save-btn active" data-type="${item.type}" data-id="${item.id}" aria-label="Remover favorito">♥</button>
          </div>
          <div class="meta-row">
            <span class="meta-pill">${item.type === 'look' ? 'Look' : 'Inspiração'}</span>
            ${item.tags ? item.tags.map((tag) => `<span class="meta-pill">${tag}</span>`).join('') : `<span class="meta-pill">${item.category}</span>`}
          </div>
        </div>
      </article>
      `
    )
    .join('');

  document.querySelectorAll('.save-btn').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(button.dataset.type, Number(button.dataset.id)));
  });
}

function toggleFavorite(type, id) {
  const favoriteId = `${type}-${id}`;
  const existingIndex = selectedFavorites.indexOf(favoriteId);

  if (existingIndex >= 0) {
    selectedFavorites.splice(existingIndex, 1);
  } else {
    selectedFavorites.push(favoriteId);
  }

  localStorage.setItem(favoritesKey, JSON.stringify(selectedFavorites));
  renderLooks(getCurrentActiveFilters());
  renderInspiration(getCurrentActiveCategory());
  renderFavorites();
}

function getCurrentActiveCategory() {
  const activeBtn = document.querySelector('.tab-btn.active');
  return activeBtn ? activeBtn.dataset.category : 'all';
}

function getCurrentActiveFilters() {
  const filterState = {
    color: 'all',
    occasion: 'all',
    style: 'all'
  };

  document.querySelectorAll('.filter-btn').forEach((button) => {
    if (button.classList.contains('active')) {
      const { group, filter } = button.dataset;
      filterState[group] = filter;
    }
  });

  return filterState;
}

function applyFilter(event) {
  const target = event.currentTarget;
  const { group, filter } = target.dataset;

  if (group === 'color') {
    document.querySelectorAll('[data-group="color"]').forEach((button) => button.classList.remove('active'));
    target.classList.add('active');
  }

  if (group === 'occasion') {
    document.querySelectorAll('[data-group="occasion"]').forEach((button) => button.classList.remove('active'));
    target.classList.add('active');
  }

  if (group === 'style') {
    document.querySelectorAll('[data-group="style"]').forEach((button) => button.classList.remove('active'));
    target.classList.add('active');
  }

  renderLooks(getCurrentActiveFilters());
}

function applyCategory(event) {
  const target = event.currentTarget;
  document.querySelectorAll('.tab-btn').forEach((button) => button.classList.remove('active'));
  target.classList.add('active');
  renderInspiration(target.dataset.category);
}

function handleQuizSubmit(event) {
  event.preventDefault();
  const formData = new FormData(quizForm);
  const answers = {
    q1: formData.get('q1'),
    q2: formData.get('q2'),
    q3: formData.get('q3'),
    q4: formData.get('q4')
  };

  const scores = {
    elegante: 0,
    'dark feminine': 0,
    casual: 0,
    vintage: 0,
    gótico: 0
  };

  const styleMap = {
    q1: { elegante: 'elegante', 'dark feminine': 'dark feminine', casual: 'casual', vintage: 'vintage' },
    q2: { preto: 'gótico', vermelho: 'dark feminine', prata: 'elegante', branco: 'casual' },
    q3: { noite: 'gótico', dia: 'casual', elegante: 'elegante' },
    q4: { seda: 'elegante', couro: 'gótico', liso: 'casual', vintage: 'vintage' }
  };

  Object.entries(answers).forEach(([question, value]) => {
    if (!value) return;

    const mapped = styleMap[question][value];
    if (mapped) {
      scores[mapped] = (scores[mapped] || 0) + 1;
    }
  });

  const dominantStyle = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  const recommendations = {
    elegante: {
      title: 'Seu estilo é elegante e sofisticado',
      text: 'Você tem uma presença marcada por linhas limpas, peças com corte impecável e uma paleta refinada. Aposte em preto, vinho, nude e tecidos de luxo com brilho suave.'
    },
    'dark feminine': {
      title: 'Seu estilo é dark feminine',
      text: 'Sua estética combina mistério, sensualidade e feminilidade. Combine peças de alfaiataria com pretos intensos, vermelho vinho, couro e maquiagem com acabamento elegante.'
    },
    casual: {
      title: 'Seu estilo é casual com personalidade',
      text: 'Você equilibra conforto e presença. Aposte em combinações clean, sobreposições leves e detalhes sofisticados que transformam o cotidiano em uma assinatura visual.'
    },
    vintage: {
      title: 'Seu estilo é vintage chic',
      text: 'Você traz charme nostálgico com um toque contemporâneo. Explore peças com corte clássico, estampas suaves, acessórios delicados e paletas antigas.'
    },
    gótico: {
      title: 'Seu estilo é gótico elegante',
      text: 'Sua estética tem força, personalidade e drama. Invista em preto profundo, vermelho carmesim, couro, acessórios metálicos e contrastes intensos.'
    }
  };

  const result = recommendations[dominantStyle];
  styleResult.innerHTML = `
    <h3>${result.title}</h3>
    <p>${result.text}</p>
  `;
}

document.querySelectorAll('.filter-btn').forEach((button) => button.addEventListener('click', applyFilter));
document.querySelectorAll('.tab-btn').forEach((button) => button.addEventListener('click', applyCategory));
quizForm.addEventListener('submit', handleQuizSubmit);

renderLooks({ color: 'all', occasion: 'all', style: 'all' });
renderInspiration('all');
renderFavorites();
