import {splitArray} from './splitArray';
import {eyeColor} from './eyeColor';

//прорисовка таблицы. Создает строку таблицы с ячейками данных и добавляет их в tbody.
//При прорисовке данных в колонке "Описание" обрезает about до длины th "Описание" (aboutLength ) деленное на 4.
//aboutThLength / 4 примерно равно кол-ву символов, которые влезут 2-мя строками в ячейку about
function renderCell(jsonData, pagNum = 1) {
  localStorage.getItem('jsonData') ? '' : localStorage.setItem('jsonData', JSON.stringify(jsonData));
  
  const data = localStorage.getItem('jsonData') ? JSON.parse( localStorage.getItem('jsonData') ) : jsonData,
        tableData = document.querySelector('.main-data'),
        aboutTh = document.querySelector('.about'),
        aboutThLength = aboutTh.clientWidth,
        peopleCards = splitArray(data.JSON)[pagNum - 1];
  
  tableData.innerHTML = '';

  peopleCards.forEach((element) => {
    const rowTable = document.createElement('tr');

    rowTable.setAttribute('id', element.id);
    rowTable.className = 'data-row';
    rowTable.innerHTML = `
        <td class='first-name _cell' data-type='text'>${element.name.firstName}</td>
        <td class='last-name _cell' data-type='text'>${element.name.lastName}</td>
        <td class='about _cell' data-type='text'>${element.about.slice(0, (aboutThLength / 4 )) + '...'}</td>
        <td class='eye-color _cell' data-type='text'>${element.eyeColor}</td>
    `;

    tableData.append(rowTable);
    
    const td = rowTable.querySelector('.eye-color');
    eyeColor(td); // функция закрашивает ячейку "цвет глаз" в соотвутсвующий цвет
  });
}

//функция отрисовывает пагинацию и вызывает колбэком функицю отрисовки страницы, выбранной в пагинации 
function renderPagination(jsonData) {
  const data = localStorage.getItem('jsonData') ? JSON.parse( localStorage.getItem('jsonData') ) : jsonData,
        table = document.querySelector('.table'),
        pageCount = splitArray(data.JSON).length,
        pagination = document.createElement('div'),
        pagTitile = document.createElement('span');
  
  pagination.className = 'pagination';
  pagTitile.textContent = 'Пагинация:';
  pagination.append(pagTitile);

  for (let i = 0; i < pageCount; i++) {
      const pagNum = document.createElement('div');

      pagNum.className = 'pagination-number';
      pagNum.innerHTML = i + 1;

      if (i === 0) pagNum.classList.add('current-pagination');
      
      pagination.append(pagNum);
  }
  
  table.insertAdjacentElement('beforebegin', pagination);

  renderActivePage(data);
}

//функция отрисовывает страницу, выбранную в пагинации
function renderActivePage(jsonData) {
  const pagNums = document.querySelectorAll('.pagination-number');
  
  pagNums.forEach((item, i) => {
      item.addEventListener('click', () => {
        markActivePageInPagination(i);
        renderCell(jsonData, i + 1);
      });
  })
}

//показывает/отмечает активную страницу на пагинации
function markActivePageInPagination(pagNum) {
  const pagNums = document.querySelectorAll('.pagination-number');

  pagNums.forEach((item, i) => {
    if (item.classList.contains('current-pagination') && i !== pagNum) {
      item.classList.remove('current-pagination');
    } else if (!item.classList.contains('current-pagination') && i === pagNum) {
      item.classList.add('current-pagination');
    }
  })
}

  export {renderCell, renderPagination};