import { API_KEY } from "./searchByCountry";


const language = navigator.language || navigator.userAgent;
console.log(language);
console.log(' adfghfg');

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

const browserInfo = `Браузер ${navigator.appCodeName} , ${navigator.appVersion} `;

console.log(browserInfo);
async function locate(e) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
              const { longtitude, latidude } = position.coords;
              const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${}`); 
        },
        error => {
          console.log(error.message);
        }
      );
    } else {
      console.log('Геолокація не підтримується');
    }
}
