import debounce from 'debounce';
import { renderCards } from './cards';
import Toastify from 'toastify-js';
export const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';

const eventInput = document.getElementById('eventInp');
const searchButton = document.querySelector('.header-pos_svgSearch');

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
      renderCards(embeddedEv);
    } catch (error) {
      console.log(error);
      // createToast('Ooops...');
    }
  }, 500)
);

export function createToast(text) {
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
