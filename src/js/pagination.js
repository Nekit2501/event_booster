export const paginationMarkup = (
  totalPage,
  nowPage,
  {
    keyword = 'NBA',
    countItemShow = 4,
    showStart = false,
    contentStart = '&lArr;',
    showEnd = false,
    contentEnd = '&rArr;',
    dotTag = 'span',
    baseTag = 'b',
    link = 'google.com',
    baseClass = 'pag-Link',
    classActive = 'active',
    query = '',
  } = {}
) => {
  const genElement = (page = 1, text = page) =>
    link && baseTag === 'a'
      ? `<${baseTag} class="${
          page === nowPage
            ? baseClass
              ? classActive
              : `${baseClass} ${classActive}`
            : baseClass
        }" href="${link + (+page - 1)}${
          query ? '&' + query : ''
        }">${text}</${baseTag}>`
      : `<${baseTag} data-keyword=${keyword} class="${
          page === nowPage
            ? baseClass
              ? classActive
              : `${baseClass} ${classActive}`
            : baseClass
        }">${text}</${baseTag}>`;
  let markup = showStart ? genElement(1, contentStart) : '';
  const startShow = nowPage - countItemShow;
  const endShow = nowPage + countItemShow;
  for (let i = 1; i <= totalPage; i++) {
    if (i > endShow) i = totalPage;
    if (startShow === i && i > 1) markup += `<${dotTag}>...</${dotTag}>`;
    if (i === 1 || i === totalPage || (i >= nowPage - 2 && i <= nowPage + 2))
      markup += genElement(i);
    if (endShow === i) markup += `<${dotTag}>...</${dotTag}>`;
    if (i < startShow) i = startShow - 1;
  }
  return (markup += showEnd ? genElement(totalPage, contentEnd) : '');
};
const data = [1, 2, 3, 4, 5];

export function simpleTemplating(data) {
  var html = '<ul>';
  $.each(data, function (index, item) {
    html += '<li>' + item + '</li>';
    // console.log(index);
    console.log(item);
  });
  html += '</ul>';
  return html;
}
console.log(simpleTemplating(data));
const paginationCont = document.querySelector('.pagination-container');

export function pagination(totalPage) {
  const pagData = [];
  let i = 1;
  while (i <= totalPage) {
    pagData.push(i);
    i++;
  }
  paginationMarkup(pagData);
}

function paginationMarkup(pagData) {
  const markup = pagData
    .map(number => {
      return `
    <li class="pag-item">
      <button class="pag-button">${number}</button>
    </li>
    `;
    })
    .join('');
  paginationCont.innerHTML = markup;
}

paginationCont.addEventListener('click', e => {
  if (e.target.nodeName != 'BUTTON') {
    return;
  }
  const allButtons = paginationCont.querySelectorAll('.pag-button');
  allButtons.forEach(btn => btn.classList.remove('active'));

  e.target.classList.add('active');
  let page = 1;
  const localStEv = JSON.parse(localStorage.getItem('key'));
  const evTarget = e.target.textContent;
  page = Number(evTarget);
  console.log(page);
  console.log(evTarget);
  const keyword = e.target.dataset.keyword;
  console.log(keyword);
});

console.log(pagination(10));
