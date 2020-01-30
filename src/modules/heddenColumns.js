import {getData} from './getData';
import {renderCell} from './renderTable';

//функция показывает или прячет содержимое всех колонок
function hiddenAllColumn() {
  const btnHidden = document.querySelector('.btn-hidden_all'),
        tableData = document.querySelector('.main-data');

  btnHidden.addEventListener('click', () => {
    if (!tableData.dataset.hidden || tableData.dataset.hidden === 'off') {
      tableData.setAttribute('data-hidden', 'on');
      btnHidden.innerHTML = 'Показать все колонки';
      tableData.style.display = 'none';
    } else if (tableData.dataset.hidden === 'on') {
      tableData.setAttribute('data-hidden', 'off');
      btnHidden.innerHTML = 'Скрыть все колонки';
      tableData.style.display = '';
    }
  });
}

//Скрытитие выбранной колонки
function hiddenColumn() {
  const hiddenBtns = document.querySelectorAll('.btn-hidden'),
        table = document.querySelector('.table');

  hiddenBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
      //проверка чему равен data-hidden у span внутри кнопки, которая содержит в себе иконку "показать/скрыть"
      if (item.children[0].dataset.hidden === 'off') {
        item.children[0].setAttribute('data-hidden', 'on'); //заменяет иконку "показать" на иконку "скрыть"
        table.classList.add(`hidden-${i+1}`);
      } else if (item.children[0].dataset.hidden === 'on') {
        item.children[0].setAttribute('data-hidden', 'off'); //заменяет иконку "скрыть" на иконку "показать"
        table.classList.remove(`hidden-${i+1}`);
      }

      //перерисовывает таблицу при скрытии колонки
      getData().then(() => {
        renderCell( JSON.parse( localStorage.getItem('jsonData') ) );
      });
    })
  })
}

export {hiddenColumn, hiddenAllColumn};