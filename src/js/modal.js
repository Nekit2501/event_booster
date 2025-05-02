document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';
  const modal = document.getElementById('eventModal');
  const modalContent = modal.querySelector('.modal-content');
  const closeModal = modal.querySelector('.modal-close');

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

  // Display Events
  function displayEvents(page) {
    eventContainer.innerHTML = ''; // Clear previous content
    const start = (page - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const currentEvents = allEventIds.slice(start, end);
    currentEvents.forEach(fetchEvent);
    updatePagination();
  }

  // Pagination
  function updatePagination() {
    pagination.innerHTML = '';
    const pageCount = Math.ceil(allEventIds.length / eventsPerPage);
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement('button');
      btn.className = `page-btn${i === currentPage ? ' active' : ''}`;
      btn.textContent = i;
      btn.addEventListener('click', () => {
        currentPage = i;
        displayEvents(i);
      });
      pagination.appendChild(btn);
    }
  }

  // Create Event Card
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
      <div>${eventData.dates?.start?.localDate || ''} ${eventData.dates?.start?.localTime || ''}</div>
      <div>${eventData._embedded?.venues?.[0]?.city?.name || ''}</div>`;

    card.appendChild(img);
    card.appendChild(info);
    card.addEventListener('click', () => openModal(eventData.id));
    eventContainer.appendChild(card);
  }

  // Fetch Event Data
  function fetchEvent(eventId) {
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => createEventCard(data))
      .catch(err => {
        console.error('Failed to fetch event:', err);
        const fallbackCard = document.createElement('div');
        fallbackCard.className = 'event-card';
        fallbackCard.textContent = 'Failed to load event';
        eventContainer.appendChild(fallbackCard);
      });
  }

  // Fetch Event Details for Modal
  function fetchEventDetails(eventId) {
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('eventTitle').textContent = data.name || 'Unknown Title';
        document.getElementById('eventDescription').textContent = data.info || 'No description available.';
        document.getElementById('eventDate').textContent = `${data.dates?.start?.localDate} ${data.dates?.start?.localTime || ''}`;
        document.getElementById('eventLocation').textContent = `${data._embedded?.venues?.[0]?.name}, ${data._embedded?.venues?.[0]?.city?.name}`;
        document.getElementById('eventArtists').textContent = data._embedded?.attractions?.map(a => a.name).join(', ') || 'N/A';
        document.getElementById('ticketLink').href = data.url || '#';
        document.getElementById('eventImage').src = data.images?.[0]?.url || 'https://placehold.co/400x400';
      })
      .catch(err => {
        console.error('Failed to fetch event details:', err);
        document.getElementById('eventTitle').textContent = 'Error loading event';
        document.getElementById('eventDescription').textContent = 'Please try again later.';
      });
  }

  // Open Modal
  function openModal(eventId) {
    fetchEventDetails(eventId);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalContent.classList.remove('animate__zoomOutDown');
    modalContent.classList.add('animate__zoomInUp');
  }

  // Close Modal
  function closeModalFunc() {
    modalContent.classList.remove('animate__zoomInUp');
    modalContent.classList.add('animate__zoomOutDown');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 500);
  }

  closeModal.addEventListener('click', closeModalFunc);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModalFunc();
  });

  // Initialize
  displayEvents(currentPage);
});
