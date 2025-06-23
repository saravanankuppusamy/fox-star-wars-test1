let nameH1;
let climateSpan;
let terrainSpan;
let gravitySpan;
let diameterSpan;
let populationSpan;
let rotationPeriodSpan;
let surfaceWaterSpan;
let charactersUl;
let filmsUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  climateSpan = document.querySelector('span#climate');
  terrainSpan = document.querySelector('span#terrain');
  gravitySpan = document.querySelector('span#gravity');
  diameterSpan = document.querySelector('span#diameter');
  populationSpan = document.querySelector('span#population');
  rotationPeriodSpan = document.querySelector('span#rotation_period');
  surfaceWaterSpan = document.querySelector('span#surface_water');
  filmsUl = document.querySelector('#films>ul');
  charactersUl = document.querySelector('#characters>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  try {
    const planet = await fetchPlanet(id);
    planet.characters = await fetchCharacters(planet);
    planet.films = await fetchFilms(planet);

    renderPlanet(planet);
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
}
async function fetchPlanet(id) {
  let url = `${baseUrl}/planets/${id}`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}
async function fetchCharacters(planet) {
  let url = `${baseUrl}/planets/${planet.id}/characters`;
  return await fetch(url)
    .then(res => res.json())
}
async function fetchFilms(planet) {
  let url = `${baseUrl}/planets/${planet.id}/films`;
  return await fetch(url)
    .then(res => res.json())
}

const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say the name
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  terrainSpan.textContent = planet?.terrain;
  gravitySpan.textContent = planet?.gravity;
  diameterSpan.textContent = planet?.diameter;
  populationSpan.textContent = planet?.population;
  rotationPeriodSpan.textContent = planet?.rotation_period;
  surfaceWaterSpan.textContent = planet?.surface_water;
  const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  charactersUl.innerHTML = charactersLis.join("");
  filmsUl.innerHTML = filmsLis.join("");
}
