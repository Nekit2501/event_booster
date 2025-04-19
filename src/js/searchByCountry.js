import debounce from 'debounce';
const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';
import { pagination, paginationMarkup, simpleTemplating } from './pagination';
import { createToast } from './searchByName';
// paginationMarkup(100, 1);
// console.log(paginationMarkup(100, 1));
// document.querySelector('.c').innerHTML = paginationMarkup(100, 1);

export async function createRequest(evValue, page = 1) {
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${evValue}&page=${page}`
    );
    const data = await response.json();
    // console.log(data);
    const embeddedEv = data._embedded.events;
    const totalPage = data.page.totalPages;

    pagination(totalPage);
  } catch (error) {
    createToast('Введіть повну назву');
    // console.log(error);
  }
}

const eventInput = document.getElementById('eventInp');
const countryInput = document.querySelector('.header-pos_input');
const searchButton = document.querySelector('.header-pos_svgSearch');
const listButton = document.querySelector('.header-pos_svgList');
// let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${evValue}`;

eventInput.addEventListener(
  'input',
  debounce(async e => {
    try {
      e.preventDefault();
      const evValue = eventInput.value;
      localStorage.setItem('key', JSON.stringify(evValue));
      createRequest(evValue);
    } catch (error) {
      console.log(error);
    }
  }, 700)
);

// const resultsContainer = document.createElement('div');
// resultsContainer.classList.add('results-container');

// const searchInput = document.getElementById('search');
// const messageDiv = document.getElementById('message');
// const countryList = document.getElementById('country-list');
// const resultDiv = document.getElementById('result');

// async function fetchCountries(main) {
//   if (!main) return [];
//   try {
//     const response = await fetch(`https://restcountries.com/v2/name/${main}`);
//     if (!response.ok) throw new Error('Country not found');
//     return await response.json();
//   } catch (error) {
//     return [];
//   }
// }

// const handleSearch = async () => {
//   const main = searchInput.value.trim();
//   const results = await fetchCountries(main);
//   messageDiv.textContent = '';
//   countryList.innerHTML = '';
//   resultDiv.innerHTML = '';

//   if (results.length > 10) {
//     messageDiv.textContent =
//       'Too many matches found. Please specify your search.';
//   } else if (results.length > 1) {
//     results.forEach(country => {
//       const li = document.createElement('li');
//       li.textContent = country.name;
//       countryList.appendChild(li);
//     });
//   } else if (results.length === 1) {
//     const country = results[0];
//     resultDiv.innerHTML = `
//                     <h2>${country.name}</h2>
//                     <p>Capital: ${country.capital}</p>
//                     <p>Population: ${country.population.toLocaleString()}</p>
//                     <p>Languages: ${country.languages
//                       .map(lang => lang.name)
//                       .join(', ')}</p>
//                     <img src="${country.flag}" alt="Flag of ${country.name}">
//                 `;
//   } else {
//     messageDiv.textContent = 'No matches found.';
//   }
// };

// searchInput.addEventListener('input', handleSearch);
