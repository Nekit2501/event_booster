document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = 'brfdbddKGRzc2X8LiBGbED6sZHFCGpLR';
  const modal = document.getElementById('eventModal');
  const modalContent = modal.querySelector('.modal-content');
  const closeModal = modal.querySelector('.modal-close');

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
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    modalContent.classList.remove('animate__zoomOutDown');
    modalContent.classList.add('animate__zoomInUp');
  }

  // Close Modal
  function closeModalFunc() {
    modalContent.classList.remove('animate__zoomInUp');
    modalContent.classList.add('animate__zoomOutDown');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
    }, 500);
  }

  closeModal.addEventListener('click', closeModalFunc);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModalFunc();
  });
});
