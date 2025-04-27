export function renderCards(e) {
  console.log(e);
  const ul = document.querySelector('.events');
  const markup = e
    .map(item => {
      return `
      <li class="card col-3 mb-4 mx-2" >
        <img src="${item.images[0].url}" class="card-img-top" alt="${item.name}" id="${item.id}">
        <div class="card-body">
          <h2 class="card-title">${item.name}</h2>
          <p class="card-text">${item.dates.start.localDate}</p>
          <p class="card-text">${item._embedded.venues[0].name}</p>
        </div>
      </li>`;
    })
    .join('');
  ul.innerHTML = markup;
  //   console.log(e);
  //   return card;
}
