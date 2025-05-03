document.addEventListener('DOMContentLoaded', async () => {
  // Constants and DOM elements
  const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';
  const eventContainer = document.querySelector('.event-container');
  const modal = document.getElementById('eventModal');
  const modalContent = document.querySelector('.modal-content');
  const closeModal = document.querySelector('.modal-close');
  const pagination = document.querySelector('.pagination');

  // State
  let currentPage = 1;
  const eventsPerPage = 20;
  let allEvents = [];

  // Modal functions
  function openModal(eventData) {
    // Populate modal content
    document.getElementById('eventTitle').textContent = eventData.name || 'Unknown Event';
    document.getElementById('eventDate').textContent = eventData.dates?.start?.localDate || 'Date not available';
    document.getElementById('eventLocation').textContent = 
      `${eventData._embedded?.venues?.[0]?.name || 'Venue not specified'}, ${eventData._embedded?.venues?.[0]?.city?.name || ''}`;
    document.getElementById('eventDescription').textContent = eventData.info || 'No description available';
    document.getElementById('eventImage').src = eventData.images?.[0]?.url || 'https://placehold.co/600x400?text=No+Image';
    document.getElementById('ticketLink').href = eventData.url || '#';

    // Show modal with animation
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalContent.classList.add('animate__animated', 'animate__zoomIn');
  }

  function closeModalFunc() {
    modalContent.classList.remove('animate__zoomIn');
    modalContent.classList.add('animate__zoomOut');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      modalContent.classList.remove('animate__zoomOut');
    }, 500);
  }

  // Event listeners for modal
  closeModal.addEventListener('click', closeModalFunc);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFunc();
  });

  // Fetch events from API
  async function fetchEvents() {
    try {
      eventContainer.innerHTML = '<div class="loading">Loading events...</div>';
      
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=100&countryCode=US`
      );
      const data = await response.json();
      allEvents = data._embedded?.events || [];
      
      if (allEvents.length === 0) {
        eventContainer.innerHTML = '<div class="no-events">No events found</div>';
        return;
      }
      
      renderEvents();
      renderPagination();
      
    } catch (error) {
      console.error('Error fetching events:', error);
      eventContainer.innerHTML = `
        <div class="error">
          Failed to load events. ${error.message}
          <button class="retry-btn" onclick="location.reload()">Try Again</button>
        </div>
      `;
    }
  }

  // Render events
  function renderEvents() {
    eventContainer.innerHTML = '';
    
    const start = (currentPage - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const eventsToShow = allEvents.slice(start, end);
    
    eventsToShow.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <img src="${event.images?.[0]?.url || 'https://placehold.co/180x227?text=No+Image'}" 
             alt="${event.name}" 
             class="event-image">
        <div class="event-info">
          <strong>${event.name || 'Untitled Event'}</strong>
          <div>${event.dates?.start?.localDate || 'Date not available'}</div>
          <div>${event._embedded?.venues?.[0]?.city?.name || 'Location not specified'}</div>
        </div>
      `;
      
      // Add click event to open modal
      card.addEventListener('click', () => openModal(event));
      eventContainer.appendChild(card);
    });
  }

  // Pagination
  function renderPagination() {
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
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = `pag-button ${currentPage === pageCount ? 'disabled' : ''}`;
    nextBtn.innerHTML = '&gt;';
    nextBtn.addEventListener('click', () => {
      if (currentPage < pageCount) {
        currentPage++;
        renderEvents();
        renderPagination();
      }
    });
    pagination.appendChild(nextBtn);
  }

  // Initialize
  fetchEvents();
});