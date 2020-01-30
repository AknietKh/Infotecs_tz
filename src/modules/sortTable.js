//Сортировка.
//навешивает событие на ячейки-заголовки таблицы
function eventSortTable() {
  const tableThs = document.querySelectorAll('th');

  tableThs.forEach((th, i) => {
    th.addEventListener('click', () => {
      checkSelectedTh(i); // убирает класс selected и data-атрибут у неактивных заголовочных ячеек таблицы

      if (!th.dataset.order || th.dataset.order === '-1') {
        th.setAttribute('data-order', 1);
      } else if (th.dataset.order === '1' ) {
        th.setAttribute('data-order', -1);
      }

      const order = th.dataset.order;
      th.classList.add('selected');
      
      sortTable(i, order); // функция сортировки данных в колонке таблицы
    })
  });
}

//функция убирает класс selected и data-атрибут у неактивных заголовочных ячеек таблицы
function checkSelectedTh(index) {
  const tableThs = document.querySelectorAll('th');
  
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
  const tableRows = document.querySelectorAll('.data-row'),
        tableData = document.querySelector('.main-data');

  const sortedRows = Array.from(tableRows).sort((rowA, rowB) => {
    return rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? order  : -order;
  });

  tableData.append(...sortedRows);
}

export {eventSortTable};