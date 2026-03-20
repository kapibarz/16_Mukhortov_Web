class Card {
  constructor(name, flag, region, safety, living, salary, nature, history) {
    this.name = name;
    this.flag = flag;
    this.region = region;
    this.safety = safety;
    this.living = living;
    this.salary = salary;
    this.nature = nature;
    this.history = history;
  }

  getBadgeClass() {
    if (this.region === 'Восточная Европа') return 'badge-east';
    if (this.region === 'Западная Европа')  return 'badge-west';
    if (this.region === 'Северная Европа')  return 'badge-north';
    if (this.region === 'Южная Европа')     return 'badge-south';
    return 'badge-east';
  }

  statBar(label, value) {
    return `<div class="stat-row">
      <span class="stat-label">${label}</span>
      <div class="stat-bar-wrap"><div class="stat-bar" style="width:${value * 10}%"></div></div>
      <span class="stat-value">${value}</span>
    </div>`;
  }

  toHTML() {
    return `
      <div class="card-header">
        <span class="card-flag">${this.flag}</span>
        <div class="card-title-block">
          <div class="card-name">${this.name}</div>
          <span class="card-region-badge ${this.getBadgeClass()}">${this.region}</span>
        </div>
      </div>
      <div class="card-stats">
        ${this.statBar('Безопасность', this.safety)}
        ${this.statBar('Уровень жизни', this.living)}
        ${this.statBar('Зарплата', this.salary)}
        ${this.statBar('Природа', this.nature)}
        ${this.statBar('История', this.history)}
      </div>`;
  }
}

class EastEuropeanCard extends Card {
  constructor(name, flag, safety, living, salary, nature, history) {
    super(name, flag, 'Восточная Европа', safety, living, salary, nature, history);
  }
}

class WestEuropeanCard extends Card {
  constructor(name, flag, safety, living, salary, nature, history) {
    super(name, flag, 'Западная Европа', safety, living, salary, nature, history);
  }
}

class NorthEuropeanCard extends Card {
  constructor(name, flag, safety, living, salary, nature, history) {
    super(name, flag, 'Северная Европа', safety, living, salary, nature, history);
  }
}

class SouthEuropeanCard extends Card {
  constructor(name, flag, safety, living, salary, nature, history) {
    super(name, flag, 'Южная Европа', safety, living, salary, nature, history);
  }
}

const defaultCards = [
  new EastEuropeanCard('Польша',     '🇵🇱', 7, 7, 6, 7, 9),
  new EastEuropeanCard('Чехия',      '🇨🇿', 8, 8, 7, 7, 9),
  new EastEuropeanCard('Венгрия',    '🇭🇺', 7, 7, 5, 6, 8),
  new WestEuropeanCard('Германия',   '🇩🇪', 8, 9, 9, 7, 9),
  new WestEuropeanCard('Франция',    '🇫🇷', 7, 9, 8, 9, 10),
  new WestEuropeanCard('Нидерланды', '🇳🇱', 8, 9, 9, 6, 8),
  new NorthEuropeanCard('Норвегия',  '🇳🇴', 9, 10, 10, 10, 7),
  new NorthEuropeanCard('Швеция',    '🇸🇪', 8, 10, 9, 10, 8),
  new NorthEuropeanCard('Исландия',  '🇮🇸', 10, 9, 9, 10, 7),
  new SouthEuropeanCard('Италия',    '🇮🇹', 7, 8, 7, 9, 10),
  new SouthEuropeanCard('Испания',   '🇪🇸', 7, 8, 7, 9, 9),
  new SouthEuropeanCard('Греция',    '🇬🇷', 7, 7, 5, 9, 10),
];

function saveCards() {
  localStorage.setItem('europa_cards', JSON.stringify(cards));
}

function loadCards() {
  const saved = localStorage.getItem('europa_cards');
  if (!saved) return defaultCards;

  const parsed = JSON.parse(saved);
  const result = [];
  for (let i = 0; i < parsed.length; i++) {
    const d = parsed[i];
    let card;
    if (d.region === 'Восточная Европа')     card = new EastEuropeanCard(d.name, d.flag, d.safety, d.living, d.salary, d.nature, d.history);
    else if (d.region === 'Западная Европа') card = new WestEuropeanCard(d.name, d.flag, d.safety, d.living, d.salary, d.nature, d.history);
    else if (d.region === 'Северная Европа') card = new NorthEuropeanCard(d.name, d.flag, d.safety, d.living, d.salary, d.nature, d.history);
    else                                     card = new SouthEuropeanCard(d.name, d.flag, d.safety, d.living, d.salary, d.nature, d.history);
    result.push(card);
  }
  return result;
}

let cards = loadCards();
let editMode = false;
let activeFilter = 'all';
let editingIndex = null;

const container   = document.getElementById('cards-container');
const toggleBtn   = document.getElementById('toggle-edit');
const addBtn      = document.getElementById('btn-add');
const dialog      = document.getElementById('card-dialog');
const form        = document.getElementById('card-form');
const dialogTitle = document.getElementById('dialog-title');
const cancelBtn   = document.getElementById('btn-cancel');

function buildSite() {
  container.innerHTML = '';

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    if (activeFilter !== 'all' && card.region !== activeFilter) continue;

    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = card.toHTML();

    const footer = document.createElement('footer');
    footer.className = editMode ? 'card-footer' : 'card-footer hidden';
    footer.innerHTML = `
      <button class="btn-card-edit">Редактировать</button>
      <button class="btn-card-delete">Удалить</button>`;
    article.appendChild(footer);

    const idx = i;
    footer.querySelector('.btn-card-edit').addEventListener('click', function() { openEditDialog(idx); });
    footer.querySelector('.btn-card-delete').addEventListener('click', function() { deleteCard(idx); });

    container.appendChild(article);
  }
}

function toggleEditMode() {
  editMode = !editMode;
  if (editMode) {
    toggleBtn.classList.add('active');
    addBtn.classList.remove('hidden');
  } else {
    toggleBtn.classList.remove('active');
    addBtn.classList.add('hidden');
  }
  buildSite();
}

function openAddDialog() {
  editingIndex = null;
  dialogTitle.textContent = 'Новая карта';
  form.reset();
  dialog.showModal();
}

function openEditDialog(index) {
  editingIndex = index;
  dialogTitle.textContent = 'Редактировать карту';
  const c = cards[index];
  form.elements['name'].value    = c.name;
  form.elements['flag'].value    = c.flag;
  form.elements['region'].value  = c.region;
  form.elements['safety'].value  = c.safety;
  form.elements['living'].value  = c.living;
  form.elements['salary'].value  = c.salary;
  form.elements['nature'].value  = c.nature;
  form.elements['history'].value = c.history;
  dialog.showModal();
}

function deleteCard(index) {
  cards.splice(index, 1);
  saveCards();
  buildSite();
}

function createCardFromForm() {
  const name    = form.elements['name'].value;
  const flag    = form.elements['flag'].value;
  const region  = form.elements['region'].value;
  const safety  = Number(form.elements['safety'].value);
  const living  = Number(form.elements['living'].value);
  const salary  = Number(form.elements['salary'].value);
  const nature  = Number(form.elements['nature'].value);
  const history = Number(form.elements['history'].value);

  if (region === 'Восточная Европа') return new EastEuropeanCard(name, flag, safety, living, salary, nature, history);
  if (region === 'Западная Европа')  return new WestEuropeanCard(name, flag, safety, living, salary, nature, history);
  if (region === 'Северная Европа')  return new NorthEuropeanCard(name, flag, safety, living, salary, nature, history);
  return new SouthEuropeanCard(name, flag, safety, living, salary, nature, history);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const newCard = createCardFromForm();
  if (editingIndex !== null) {
    cards[editingIndex] = newCard;
  } else {
    cards.push(newCard);
  }
  saveCards();
  dialog.close();
  buildSite();
});

cancelBtn.addEventListener('click', function() { dialog.close(); });
toggleBtn.addEventListener('click', function() { toggleEditMode(); });
addBtn.addEventListener('click', function() { openAddDialog(); });

const filterBtns = document.querySelectorAll('.filter-btn');
for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener('click', function() {
    for (let j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.remove('active');
    }
    this.classList.add('active');
    activeFilter = this.dataset.region;
    buildSite();
  });
}

buildSite();
