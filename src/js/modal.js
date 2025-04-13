document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "brfdbddKGRzc2X8LiBGbED6sZHFCGpLR"; // Replace with your Ticketmaster API key
  const modal = document.getElementById("eventModal");
  const closeModal = document.querySelector(".modal-close");
  const eventButtons = document.querySelectorAll(".event-btn");
  const eventTitle = document.getElementById("eventTitle");
  const eventDescription = document.getElementById("eventDescription");
  const eventDate = document.getElementById("eventDate");
  const eventLocation = document.getElementById("eventLocation");
  const eventArtists = document.getElementById("eventArtists");
  const ticketLink = document.getElementById("ticketLink");
  const eventImage = document.getElementById("eventImage");

  function fetchEventDetails(eventId) {
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        eventTitle.textContent = data.name || "Unknown Title";
        eventDescription.textContent = data.info || "No description available.";
        eventDate.textContent = data.dates?.start?.localDate + " " + (data.dates?.start?.localTime || "");
        eventLocation.textContent = data._embedded?.venues?.[0]?.name + ", " + data._embedded?.venues?.[0]?.city?.name;
        eventArtists.textContent = data._embedded?.attractions?.map(a => a.name).join(", ") || "N/A";
        ticketLink.href = data.url || "#";
        eventImage.src = data.images?.[0]?.url || "https://via.placeholder.com/250";
      })
      .catch(err => {
        console.error("Failed to fetch event:", err);
        eventTitle.textContent = "Error loading event";
        eventDescription.textContent = "Please try again later.";
      });
  }

  function openModal(eventId) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    fetchEventDetails(eventId);
  }

  function closeModalFunc() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  eventButtons.forEach(button => {
    button.addEventListener("click", () => {
      const eventId = button.getAttribute("data-event-id");
      openModal(eventId);
      console.log(eventId)
    });
  });

  closeModal.addEventListener("click", closeModalFunc);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalFunc();
  });
});
