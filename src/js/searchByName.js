// Перший інпут має шукати за назвою події(евробачення тощо).
// Другий за назвою(якщо є у першому інпуті )
// та країною місця проведення яку мають вказати у другому.
// Якщо у першому немає вводу то мають
// знаходитись усі події у обраному місті
import debounce from 'debounce';
const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';

const countryInput = document.querySelector('.header-pos_input');
const listButton = document.querySelector('.header-pos_svgList');

countryInput.addEventListener(
  'input',
  debounce(async e => {
    try {
      const evValue = countryInput.value;
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
