// Перший інпут має шукати за назвою події(евробачення тощо).
// Другий за назвою(якщо є у першому інпуті )
// та країною місця проведення яку мають вказати у другому.
// Якщо у першому немає вводу то мають
// знаходитись усі події у обраному місті
import debounce from 'debounce';
const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';

const eventInput = document.querySelector('.header-pos_input');
const countryInput = document.querySelector('.header-pos_input');
const searchButton = document.querySelector('.header-pos_svgSearch');
const listButton = document.querySelector('.header-pos_svgList');
// let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${evValue}`;

eventInput.addEventListener(
  'input',
  debounce(async e => {
    try {
      const evValue = eventInput.value;
      console.log(evValue);
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${evValue}`
      );
      const data = await response.json();
      const embeddedEv = data._embedded.events;
    } catch (error) {
      console.log(error);
    }
  }, 300)
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
