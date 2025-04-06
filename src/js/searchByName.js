import debounce from 'debounce';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';

const countryInput = document.getElementById('countryInp');
const listButton = document.querySelector('.header-pos_svgList');
const eventInput = document.getElementById('eventInp');

import countryMap from './countries.json';

const countries = countryMap.map(item => item.country);
const countriesCode = countryMap.map(item => item.countryCode);
console.log(countries);
console.log(countriesCode);

function getCountryID(countryMatch) {
  const match = countryMap.find(
    item => item.country.toLowerCase() === countryMatch.trim().toLowerCase()
  );
  if (match) {
    return match.countryCode;
  } else {
    createToast('CountryCode не знайдений');
  }
}

countryInput.addEventListener(
  'input',
  debounce(async e => {
    try {
      const evValue = eventInput.value;
      const id = getCountryID(countryInput.value);
      if (id) {
        console.log(`Country ID: ${id}`);
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${evValue}&countryCode=${id}`
        );
        console.log(await response.json());
      } else {
        createToast('Країну не знайдено');
      }
    } catch (error) {
      createToast(error.message); // redirect
    }
  }, 500)
);

function createToast(text) {
  return Toastify({
    text: text,
    duration: 3000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'red',
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

// Toastify({
//   text: 'This is a toast',
//   duration: 3000,
//   destination: 'https://github.com/apvarun/toastify-js',
//   newWindow: true,
//   close: true,
//   gravity: 'top', // `top` or `bottom`
//   position: 'left', // `left`, `center` or `right`
//   stopOnFocus: true, // Prevents dismissing of toast on hover
//   style: {
//     background: 'linear-gradient(to right, #00b09b, #96c93d)',
//   },
//   onClick: function () {}, // Callback after click
// }).showToast();
