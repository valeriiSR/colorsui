const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
  event.preventDefault();
  if(event.code.toLocaleLowerCase() === 'space'){
    setRamdomColor();
  }
});

document.addEventListener('click', event => {
  if(event.target.tagName.toLocaleLowerCase() === 'h2'){
    let text = event.target.innerText;
    copyToClipboard(text);
    showCopyedAlert();
  }
});

document.addEventListener('click', event => {
  if(event.target.dataset.type === 'lock' || event.target.parentElement.dataset.type === 'lock'){
    const node = 
      event.target.tagName.toLocaleLowerCase() === 'i'
      ? event.target
      : event.target.children[0]

      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
    }
});

function copyToClipboard(text){
  return navigator.clipboard.writeText(text);
}
function showInst(textColor){
  const luminance = chroma(textColor).luminance();
  const color = luminance > 0.5 ? '#2c3e50' : '#bdc3c7';
  const inst = `<div class="inst" style="color: ${color}">Press 'Space' to change</div>`;

  if(document.querySelector('.inst')) document.querySelector('.inst').remove();
  document.querySelector('body').insertAdjacentHTML('afterbegin', inst);
}
function showCopyedAlert(){
  const notice = `
    <div class='wrapper'>
      <div class='notice-text'>Сopied</div>
    </div>
  `
  document.querySelector('body').insertAdjacentHTML('afterbegin', notice);
  setTimeout(() => {
    document.querySelector('.wrapper').remove();
  }, 800)
}

function setRamdomColor(isInitial){
  
  const colors = isInitial ? getColorsFromUrlHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const $text = col.querySelector('h2');
    const $icon = col.querySelector('button');

    if(isLocked){
      colors.push($text.textContent);
      return;
    }

    const color = isInitial 
      ? colors[index] 
        ? colors[index] 
        : chroma.random()  
      : chroma.random();
    if(!isInitial) colors.push(color);
    
    if(index === 2){ showInst(color) } // init show manual

    $text.innerText = color;
    setTextColor($text, color); // устанавливаю цвет для текста
    setTextColor($icon, color); // устанавливаю цвет для иконки
    col.style.background = color;
  });
  addHashToUrl(colors);
}

function setTextColor($tetx, color){
  const luminance = chroma(color).luminance();
  $tetx.style.color = luminance > 0.5 ? 'black' : 'white';
}

function addHashToUrl(colors = []){
  document.location.hash = colors.map(item => {
    return item.toString().substring(1);
  }).join('-');
}

function getColorsFromUrlHash(){
  if(document.location.hash.length > 1){
    return document.location.hash.substring(1).split('-').map(color => '#' + color);
  }
  return [];
}

setRamdomColor(true);