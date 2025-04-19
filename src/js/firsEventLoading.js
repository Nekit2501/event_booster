import { renderCards } from './cards';
import { API_KEY } from './searchByCountry';
import geohash from 'ngeohash';

const language = navigator.language || navigator.userAgent;
console.log(language);
console.log(' adfghfg');
document.addEventListener('DOMContentLoaded', e => {
  locate(e);
});
console.log(getCords());

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(position);
      const { longtitude, latidude } = position.coords;
    },
    error => {
      console.log(error.message);
    }
  );
} else {
  console.log('Геолокація не підтримується');
}

const browserInfo = `Браузер ${navigator.appCodeName} , ${navigator.appVersion} 
`;

function getCords() {
  let cords = null;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        console.log(position.coords);
        const { longitude, latitude } = position.coords;
        const geohashValue = geohash.encode(latitude, longitude);
        cords = geohashValue;

        return cords;
      },
      error => {
        console.log(error.message);
      }
    );
    return cords;
  } else {
    console.log('Геолокація не підтримується');
  }
  return cords;
}

console.log(browserInfo);
async function locate(e) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        console.log(position.coords);
        const { longitude, latitude } = position.coords;

        const geohashValue = geohash.encode(latitude, longitude);
        console.log(geohashValue);
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&geoPoint=${geohashValue}&radius=50&unit=km`
        );
        const data = await response.json();
        const event = data._embedded.events;
        renderCards(event);
      },
      error => {
        console.log(error.message);
      }
    );
  } else {
    console.log('Геолокація не підтримується');
  }
}
