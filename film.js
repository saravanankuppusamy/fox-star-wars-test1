let nameH1;
let releaseDateSpan;
let directorSpan;
let episodeIdSpan;
let charactersUl;
let planetsUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  releaseDateSpan = document.querySelector('span#release_date');
  episodeIdSpan = document.querySelector('span#episode_id');
  directorSpan = document.querySelector('span#director');
  planetsUl = document.querySelector('#planets>ul');
  charactersUl = document.querySelector('#characters>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  try {
    const film = await fetchFilm(id)
    film.characters = await fetchCharacters(film);
    film.planets = await fetchPlanets(film);
    renderFilm(film);
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
}

async function fetchFilm(id) {
  let url = `${baseUrl}/films/${id}`;
  const film = await fetch(url)
    .then(res => res.json())
  return film;
}

async function fetchCharacters(film) {
  let url = `${baseUrl}/films/${film.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchPlanets(film) {
  let url = `${baseUrl}/films/${film.id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json())
  return planets;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say the title
  nameH1.textContent = film?.title;
  directorSpan.textContent = film?.director;
  episodeIdSpan.textContent = film?.episode_id;
  releaseDateSpan.textContent = film?.release_date;
  const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</a></li>`)
  charactersUl.innerHTML = charactersLis.join("");
  planetsUl.innerHTML = planetsLis.join("");
}
