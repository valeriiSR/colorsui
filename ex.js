// Создание рандомного цвета в 16 системе
function getRandomColor(){
  // #00FF00
  const hexCodes = '0123456789ABCDEF';
  let color = '';
  for(i = 0; i < 6; i++){
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return '#' + color;
}


// Библиотека chroma
const luminance = chroma(color).luminance(); 
  // luminance() - без аргументов - возвращает яркость цвета от 0 до 1
  // luminance(0.5) - с аргументом - приводит цвет к указанной яркости
$tetx.style.color = luminance > 0.5 ? 'black' : 'white';