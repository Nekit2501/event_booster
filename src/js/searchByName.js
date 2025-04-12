import debounce from 'debounce';
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
    } catch (error) {
      console.log(error);
    }
  }, 300)
);
