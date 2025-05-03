export function renderCards(events) {
  const eventContainer = document.querySelector('.event-container');
  eventContainer.innerHTML = '';

  if (!events || events.length === 0) {
    eventContainer.innerHTML = `
      <div class="no-events footer-message">
        No events found. Try a different search.
      </div>
    `;
    return;
  }

  const markup = events.map(event => `
    <div class="event-card footer-card" data-event-id="${event.id}">
      <img src="${event.images?.[0]?.url || 'https://placehold.co/180x227?text=No+Image'}" 
           alt="${event.name}" 
           class="event-image footer-card-image">
      <div class="event-info footer-card-info">
        <strong class="footer-card-title">${event.name || 'Untitled Event'}</strong>
        <div class="footer-card-date">${event.dates?.start?.localDate || 'Date not available'}</div>
        <div class="footer-card-location">${event._embedded?.venues?.[0]?.city?.name || 'Location not specified'}</div>
      </div>
    </div>
  `).join('');

  eventContainer.innerHTML = markup;

  // Add event delegation for modal opening
  eventContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.event-card');
    if (card) {
      const eventId = card.dataset.eventId;
      const event = events.find(ev => ev.id === eventId);
      if (event) openModal(event);
    }
  });
}

// Modal function (should be imported or defined globally)
function openModal(eventData) {
  const modal = document.getElementById('eventModal');
  if (!modal) return;

  // Populate modal content
  document.getElementById('eventTitle').textContent = eventData.name || 'Unknown Event';
  document.getElementById('eventDate').textContent = eventData.dates?.start?.localDate || 'Date not available';
  document.getElementById('eventLocation').textContent = 
    `${eventData._embedded?.venues?.[0]?.name || 'Venue not specified'}, ${eventData._embedded?.venues?.[0]?.city?.name || ''}`;
  document.getElementById('eventImage').src = 
    eventData.images?.[0]?.url || 'https://placehold.co/600x400?text=No+Image';
  document.getElementById('ticketLink').href = eventData.url || '#';

  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}