import {getData} from './modules/getData';
import {renderCell, renderPagination} from './modules/renderTable';
import {eventSortTable} from './modules/sortTable';
import {editTableData} from './modules/editTableData';
import {hiddenColumn, hiddenAllColumn} from './modules/heddenColumns';
import './style/style.css';
  
//Перерисовывает таблицу при изменении размера окна
window.addEventListener('resize', () => {
  getData().then(() => {
    renderCell( JSON.parse( localStorage.getItem('jsonData') ) );
  });
});

//Сначала выполнится функция получения данных, затем все остальные
getData().then((jsonData) => {
  renderCell(jsonData);
  renderPagination(jsonData);
  eventSortTable();
  editTableData();
  hiddenAllColumn();
  hiddenColumn();
});