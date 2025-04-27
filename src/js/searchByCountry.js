import debounce from 'debounce';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import countryMap from './countries.json';
import { renderCards } from './cards';
export const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';

const countryInput = document.getElementById('countryInp');
const listButton = document.querySelector('.header-pos_svgList');
const eventInput = document.getElementById('eventInp');

const countries = countryMap.map(item => item.country);
console.log(countries);
const countriesCode = countryMap.map(item => item.countryCode);
console.log(countriesCode);

function getCountryID(countryMatch) {
  const match = countryMap.find(
    item => item.country.toLowerCase() === countryMatch.trim().toLowerCase()
  );
  if (match) {
    return match.countryCode;
  } else {
    createToast('Подій в цій країні немає');
  }
}

countryInput.addEventListener(
  'input',
  debounce(async e => {
    try {
      e.preventDefault();
      const evValue = eventInput.value;
      const id = getCountryID(countryInput.value);
      if (id) {
        console.log(`Country ID: ${id}`);
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${evValue}&countryCode=${id}`
        );
        const data = await response.json();
        renderCards(data._embedded.events);
      } else {
        createToast('Країну не знайдено');
      }
    } catch (error) {
      createToast('Подій не знайдено'); // redirect
    }
  }, 700)
);

function createToast(text) {
  return Toastify({
    text: text,
    duration: 5000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: 'toast',
    style: {
      display: 'flex',
      width: '300px',
      height: 'auto',
      padding: '16px 24px',
      gap: '40px',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: '"Montserrat", sans-serif',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '12px',
      background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
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
