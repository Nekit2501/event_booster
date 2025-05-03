document.addEventListener('DOMContentLoaded', async () => {
  // Constants and DOM elements
  const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';
  const eventContainer = document.querySelector('.event-container');
  const modal = document.getElementById('eventModal');
  const modalContent = modal.querySelector('.modal-content');
  const closeModal = modal.querySelector('.modal-close');

  const eventList = document.querySelector('.events');
  const eventTitle = document.getElementById('eventTitle');
  const eventDescription = document.getElementById('eventDescription');
  const eventDate = document.getElementById('eventDate');
  const eventLocation = document.getElementById('eventLocation');
  const eventArtists = document.getElementById('eventArtists');
  const ticketLink = document.getElementById('ticketLink');
  const eventImage = document.getElementById('eventImage');

  const eventContainer = document.getElementById('eventContainer');
  const pagination = document.getElementById('pagination');

  const allEventIds = [
    'vv178ZbJGkSQO-lJ',
    'Z7r9jZ1AdX9fP',
    'G5vYZ9xj1R51T',
    'vvG1HZ94OZKtR',
    'k7vGF9oPLKqBo',
    '1AvfZ9GkE9pZK',
  ];

  let currentPage = 1;
  const eventsPerPage = 4;

  function displayEvents(page) {
    eventContainer.innerHTML = '';
    const start = (page - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const currentEvents = allEventIds.slice(start, end);
    currentEvents.forEach(fetchEvent);
    updatePagination();
  }

  function updatePagination() {
    pagination.innerHTML = '';
    const pageCount = Math.ceil(allEvents.length / eventsPerPage);
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = `pag-button ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = '&lt;';
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderEvents();
        renderPagination();
      }
    });
    pagination.appendChild(prevBtn);
    
    // Page buttons
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement('button');
      btn.className = `pag-button ${i === currentPage ? 'active' : ''}`;
      btn.textContent = i;
      btn.addEventListener('click', () => {
        currentPage = i;
        renderEvents();
        renderPagination();
      });
      pagination.appendChild(btn);
    }
  }

  function createEventCard(eventData) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.setAttribute('data-event-id', eventData.id);

    const img = document.createElement('img');
    img.src = eventData.images?.[0]?.url || 'https://placehold.co/180x227';
    img.alt = 'Event Image';

    const info = document.createElement('div');
    info.className = 'event-info';
    info.innerHTML = `
      <strong>${eventData.name}</strong>
      <div>${eventData.dates?.start?.localDate || ''} ${
      eventData.dates?.start?.localTime || ''
    }</div>
      <div>${eventData._embedded?.venues?.[0]?.city?.name || ''}</div>`;

    card.appendChild(img);
    card.appendChild(info);
    card.addEventListener('click', () => openModal(eventData.id));
    eventContainer.appendChild(card);
  }

  function fetchEvent(eventId) {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => createEventCard(data))
      .catch(err => console.error('Failed to fetch event:', err));
  }

  function fetchEventDetails(eventId) {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        eventTitle.textContent = data.name || 'Unknown Title';
        eventDescription.textContent = data.info || 'No description available.';
        eventDate.textContent =
          data.dates?.start?.localDate +
          ' ' +
          (data.dates?.start?.localTime || '');
        eventLocation.textContent =
          data._embedded?.venues?.[0]?.name +
          ', ' +
          data._embedded?.venues?.[0]?.city?.name;
        eventArtists.textContent =
          data._embedded?.attractions?.map(a => a.name).join(', ') || 'N/A';
        ticketLink.href = data.url || '#';
        eventImage.src =
          data.images?.[0]?.url || 'https://placehold.co/400x400';
      })
      .catch(err => {
        console.error('Failed to fetch event:', err);
        eventTitle.textContent = 'Error loading event';
        eventDescription.textContent = 'Please try again later.';
      });
  }

  function openModal(eventId) {
    fetchEventDetails(eventId);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalContent.classList.remove('animate__zoomOutDown');
    modalContent.classList.add('animate__zoomInUp');
  }

  function closeModalFunc() {
    modalContent.classList.remove('animate__zoomInUp');
    modalContent.classList.add('animate__zoomOutDown');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 500);
  }

  eventList.addEventListener('click', event => {
    if (!event.target.tagName === 'IMG') {
      console.log('abc');
      return;
    } else {
      const id = event.target.id;
      console.log(id);
      openModal(id);
    }
  });

  closeModal.addEventListener('click', closeModalFunc);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModalFunc();
  });

  displayEvents(currentPage);
});