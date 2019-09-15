(function(){
  
  //получение данных из json

function getData() {
  return fetch('./db/db.json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Данные не были получены, ошибка: ' + response.status)
      }
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      console.warn(err);
      document.body.innerHTML = '<div style="color: red; font-size: 30px; ">Упс, что-то пошло не так!</div>'
    });
}

//end получение данных из json

//прорисовка таблицы. Создает строку таблицы с ячейками данных и добавляет их в tbody.
//При прорисовке данных в колонке "Описание" обрезает about до длины th "Описание" (aboutLength ) деленное на 4

function renderCell(data) {
  const tableData = document.querySelector('.main-data');
  const aboutTh = document.querySelector('.about');
  const aboutThLength = aboutTh.clientWidth;

  data.JSON.forEach((element) => {
    const rowTable = document.createElement('tr');
    rowTable.className = 'data-row';
    rowTable.innerHTML = `
        <td class='first-name _cell' data-type='text'>${element.name.firstName}</td>
        <td class='last-name _cell' data-type='text'>${element.name.lastName}</td>
        <td class='about _cell' data-type='text'>${element.about.slice(0, (aboutThLength / 4 )) + '...'}</td>
        <td class='eye-color _cell' data-type='text'>${element.eyeColor}</td>
    `;

    tableData.append(rowTable);
    td = rowTable.querySelector('.eye-color');
    eyeColor(td);
  });
}

//end прорисовка таблицы

//Сортировка.

//навешивает событие на зоголовочные ячейки таблицы
function eventSortTable() {
  const tableThs = document.querySelectorAll('th');
  tableThs.forEach((th, i) => {
    th.addEventListener('click', () => {
      checkSelectedTh(i);
      console.dir(th);
        if (!th.dataset.order || th.dataset.order === '-1') {
          th.setAttribute('data-order', 1);
        } else if (th.dataset.order === '1' ) {
          th.setAttribute('data-order', -1);
        }

      let order = th.dataset.order;
      th.classList.add('selected');
      sortTable(i, order);
    })
  });

  //функция checkSelectedTh(index) убирает класс selected и data-атрибут у неактивных заголовочных ячеек таблицы
  function checkSelectedTh(index) {
    tableThs.forEach((th, i) => {
      if(th.classList.contains('selected') && i !== index) {
        th.classList.toggle('selected');
        th.removeAttribute('data-order');
      }
    });
  }

//функция sortTable() принимает индекс колонки которую нужно отсортировать и order, который используется
//для сортировки по возрастанию и убыванию. order = 1 || order = -1

function sortTable(index, order) {
  const tableRows = document.querySelectorAll('.data-row');
  const tableData = document.querySelector('.main-data');

  let sortedRows = Array.from(tableRows).sort((rowA, rowB) => {
    return rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? order  : -order;
  });
  tableData.append(...sortedRows);
}
}

//end сортировка

//Форма редактирования

function editData() {
  const table = document.querySelector('table'); 
  const editForm = document.querySelector('.form-wrapper');
  const inputs = editForm.querySelectorAll('input');
  const textarea = editForm.querySelector('textarea');
  const btnEdit = editForm.querySelector('.btn-edit'); 
  const btnClose = editForm.querySelector('.btn-close');
  const aboutTh = document.querySelector('.about');
  const aboutThLength = aboutTh.clientWidth;
  let CHANGE_ROW; // строка tr которую нужно будет редактировать

  //Используется делегирование событий. При клике на таблицу получает строку по которой кликнули и отображает рядом с ней форму редактирования

  table.addEventListener('click', function(event) {
    let row = event.target.closest('.data-row'); //возвращает ближайщего предка соответсвуещьго селектору.
    CHANGE_ROW = row;

    if (!row) return; //Если event.target не содержится внутри элемента row, то вызов вернёт null, и ничего не произойдёт.
    if (!table.contains(row)) return; //проверка, прендалежит ли row нашей таблице.

    editForm.style.cssText = `display: block;  top: ${row.offsetTop}px; left: ${row.offsetWidth + 20}px;`;
    /*inputs.forEach((input, i) => {    
      if (row.cells[i].classList.contains('about')) i++;
      if(row.cells[i].classList.contains('eye-color')){
        input.value = row.cells[i].firstChild.innerHTML;
      } else {
        input.value = row.cells[i].innerHTML;
      }
    })
    textarea.value = row.cells[2].innerHTML;*/ 

    //мало input-ов в форме радактирования, лучше без цикла обойтись

    inputs[0].value = row.cells[0].innerHTML;
    inputs[1].value = row.cells[1].innerHTML;
    textarea.value = row.cells[2].innerHTML.slice(0, row.cells[2].innerHTML.length - 3);
    inputs[2].value = row.cells[3].firstChild.innerHTML;
   
  });

  
  //При нажатии на кнопку редактирования btnEdit содержимое ячеек строкы заменяется на содержимое формы
  btnEdit.addEventListener('click', () => {

    CHANGE_ROW.cells[0].innerHTML = inputs[0].value;
    CHANGE_ROW.cells[1].innerHTML = inputs[1].value;
    CHANGE_ROW.cells[2].innerHTML = textarea.value.slice(0, (aboutThLength / 4)) + '...';
    CHANGE_ROW.cells[3].innerHTML = inputs[2].value;
    eyeColor(CHANGE_ROW.cells[3]);
    editForm.style='';
  });

  btnClose.addEventListener('click', () => editForm.style=''); // закрывает форму редактирования.
}

//end Форма редактирования

//функция замены значения eyeColor на цвет. Создает внутри ячейки div с фоновым цветом и цветом текста равные цвету глаз, заданный в ячейке

function eyeColor(value) {
  let coloredEye = document.createElement('div');
  coloredEye.className = 'colored-eye';
  coloredEye.innerHTML = value.innerHTML;
  value.innerHTML = '';
  value.append(coloredEye);
  value.firstChild.style.cssText = `background-color: ${value.firstChild.innerHTML}; font-size: 0px`;
}

//end функция замены значения eyeColor на цвет

//функция показывает или прячет содержимое колонок

function hiddenColumn() {
  const btnHidden = document.querySelector('.btn-hidden');
  const tableData = document.querySelector('.main-data');

  btnHidden.addEventListener('click', () => {
    if (!tableData.dataset.hidden || tableData.dataset.hidden === 'off') {
      tableData.setAttribute('data-hidden', 'on');
      btnHidden.innerHTML = 'Показать';
      tableData.style.display = 'none';
    } else if(tableData.dataset.hidden == 'on') {
      tableData.setAttribute('data-hidden', 'off');
      btnHidden.innerHTML = 'Скрыть';
      tableData.style.display = '';
    }
  });
}

//end функция показывает или прячет содержимое колонки

//Сначала выполнится функция получения данных, затем все остальные
getData().then((data) => {
  renderCell(data);
  eventSortTable();
  editData();
  hiddenColumn();
});
})()