import {renderCell} from './renderTable';
import {splitArray} from './splitArray';

//Форма редактирования
function editTableData() {
  const table = document.querySelector('table'),
        editForm = document.querySelector('.form-wrapper'),
        inputs = editForm.querySelectorAll('input'),
        textarea = editForm.querySelector('textarea'),
        btnEdit = editForm.querySelector('.btn-edit'),
        btnClose = editForm.querySelector('.btn-close');

  let CHANGE_ROW; // строка tr которую нужно будет редактировать

  //Используется делегирование событий. При клике на таблицу получает строку по которой кликнули и отображает рядом с ней форму редактирования
  table.addEventListener('click', function(event) {
    const row = event.target.closest('.data-row'); //возвращает ближайщего предка соответствующего селектору.
    
    CHANGE_ROW = row;

    if (!row) return; //проверка, содержит ли в себе event.target строку row
    if (!table.contains(row)) return; //проверка, прендалежит ли row нашей таблице.

    editForm.style.cssText = `display: block;  top: ${row.offsetTop}px; left: ${row.offsetWidth + 20}px;`;

    inputs[0].value = row.cells[0].innerHTML;
    inputs[1].value = row.cells[1].innerHTML;
    textarea.value = row.cells[2].innerHTML.slice(0, row.cells[2].innerHTML.length - 3);
    inputs[2].value = row.cells[3].firstChild.innerHTML;
  });
  
  //При нажатии на кнопку редактирования btnEdit содержимое ячеек строки заменяется на содержимое формы
  btnEdit.addEventListener('click', () => {    
    const jsonData = JSON.parse( localStorage.getItem('jsonData') );
    //узнаем длину массива, что бы узнать arraySize из функции splitArray. На случай если сделаю чтобы юзер задавал значение arraySize
    const rowAmount = splitArray(jsonData.JSON).length; 
    const editedRow = {
      id: CHANGE_ROW.id ,
      name: {
        firstName: inputs[0].value,
        lastName: inputs[1].value,
      },
      phone: null,
      about: textarea.value,
      eyeColor: inputs[2].value,
    }

    let editedRowIndex = 0;

    jsonData.JSON.forEach((item, i, arr) => {
      if (item.id === CHANGE_ROW.id) {
        arr.splice(i, 1, editedRow);
        editedRowIndex = i + 1; 
      }
    })

    localStorage.setItem('jsonData', JSON.stringify(jsonData));
    editForm.style='';

    renderCell(jsonData, Math.ceil(editedRowIndex / (jsonData.JSON.length / rowAmount))); // (jsonData.length / rowAmount) - arraySize из функции splitArray
  });

  btnClose.addEventListener('click', () => editForm.style=''); // закрывает форму редактирования.
}

export {editTableData};