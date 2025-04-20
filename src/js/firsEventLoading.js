import { renderCards } from './cards';
import { API_KEY } from './searchByCountry';
import geohash from 'ngeohash';

// const language = navigator.language || navigator.userAgent;

document.addEventListener('DOMContentLoaded', e => {
  RenderGeolocation(e);
});

// fetchIventsGeo(getLocation());
// RenderGeolocation();

async function RenderGeolocation() {
  try {
    const { latitude, longitude } = await getLocation();
    const events = await fetchIventsGeo(longitude, latitude);
    console.log(longitude, latitude);
    await renderCards(events);
    console.log(events);
  } catch (error) {
    console.error('Error fetching geolocation:', error);
  }
}

async function fetchIventsGeo(longitude, latitude) {
  try {
    const geohashValue = await geohash.encode(latitude, longitude);
    console.log(geohashValue);
    console.log(await longitude);
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&geoPoint=${geohashValue}&radius=50&unit=km`
    );
    const data = await response.json();
    console.log(data);
    return data._embedded.events;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Геолокація не підтримується'));
    }
  });
}
