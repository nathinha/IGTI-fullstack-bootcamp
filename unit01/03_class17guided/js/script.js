let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationCountries = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationCountries = document.querySelector(
    '#totalPopulationCountries'
  );
  totalPopulationFavorites = document.querySelector(
    '#totalPopulationFavorites'
  );

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.br,
      population,
      formattedPopulation: formatNumber(population),
      flag,
    };
  });

  render();
}

function render() {
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  favCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  renderCountries(allCountries, tabCountries, '+');
  renderCountries(favCountries, tabFavorites, '-');
  renderSummary();

  handleCountryButtons();
}

function renderCountries(countries, countriesDiv, text) {
  countriesDiv.innerHTML = '';

  const countriesElement = document.createElement('div');
  countries.forEach((country) => {
    const { name, flag, id, formattedPopulation } = country;

    const button = createButton(id, text);
    const flagImg = createFlagImg(flag, name);
    const info = createInfo(name, formattedPopulation);

    const countryElement = document.createElement('div');
    countryElement.classList = 'country';
    countryElement.appendChild(button);
    countryElement.appendChild(flagImg);
    countryElement.appendChild(info);

    countriesElement.appendChild(countryElement);
  });

  countriesDiv.appendChild(countriesElement);
}

function createButton(id, text) {
  const buttonDiv = document.createElement('div');
  const buttonLink = document.createElement('a');
  const image = document.createElement('i');
  image.classList = 'tiny material-icons';

  buttonLink.id = id;
  if (text === '+') {
    buttonLink.classList =
      'waves-effect waves-light btn btn-floating green darken-4';
    image.textContent = 'add';
    buttonLink.appendChild(image);
  } else if (text === '-') {
    buttonLink.classList =
      'waves-effect waves-light btn btn-floating red darken-4';
    image.textContent = 'delete_forever';
    buttonLink.appendChild(image);
  }

  buttonDiv.appendChild(buttonLink);

  return buttonDiv;
}

function createFlagImg(src, alt) {
  const flagDiv = document.createElement('div');
  const flagImg = document.createElement('img');
  flagImg.src = src;
  flagImg.alt = alt;
  flagDiv.appendChild(flagImg);
  return flagDiv;
}

function createInfo(name, population) {
  const infoDiv = document.createElement('div');
  const infoList = document.createElement('ul');

  const infoName = document.createElement('li');
  infoName.textContent = name;

  const infoPop = document.createElement('li');
  infoPop.textContent = population;

  infoList.appendChild(infoName);
  infoList.appendChild(infoPop);
  infoDiv.appendChild(infoList);
  return infoDiv;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favCountries.length;

  const totalPopCountries = allCountries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);

  totalPopulationCountries.textContent = formatNumber(totalPopCountries);

  const totalPopFavorites = favCountries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);

  totalPopulationFavorites.textContent = formatNumber(totalPopFavorites);
}

function handleCountryButtons() {
  const countriesButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoritesButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countriesButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoritesButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const country = allCountries.find((country) => country.id === id);
  favCountries = [...favCountries, country];

  allCountries = allCountries.filter((country) => country.id !== id);

  render();
}

function removeFromFavorites(id) {
  const country = favCountries.find((country) => country.id === id);
  allCountries = [...allCountries, country];

  favCountries = favCountries.filter((country) => country.id !== id);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
