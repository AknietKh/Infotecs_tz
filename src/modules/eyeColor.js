//функция закрашивает ячейку "цвет глаз" в соотвутсвующий цвет. 
//Создает внутри ячейки div с фоновым цветом и цветом текста равные цвету глаз, заданный в ячейке
function eyeColor(value) {
  const coloredEye = document.createElement('div');

  coloredEye.className = 'colored-eye';
  coloredEye.innerHTML = value.innerHTML;
  value.innerHTML = '';
  value.append(coloredEye);
  value.firstChild.style.cssText = `background-color: ${value.firstChild.innerHTML};`;
}

export {eyeColor};