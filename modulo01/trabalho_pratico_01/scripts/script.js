window.addEventListener('load', afterLoad);
var redValue = 0;
var greenValue = 0;
var blueValue = 0;

function afterLoad() {
  console.log('Page finished loading');

  preventFormSubmit();

  initializeColorBox();
}

function preventFormSubmit() {
  var form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

function initializeColorBox() {
  // initialize UI
  document.getElementById('range-red').value = redValue;
  document.getElementById('number-red').value = redValue;
  document.getElementById('range-green').value = greenValue;
  document.getElementById('number-green').value = greenValue;
  document.getElementById('range-blue').value = blueValue;
  document.getElementById('number-blue').value = blueValue;

  applyColor(redValue, greenValue, blueValue);

  // initialize sliders' event listeners
  document
    .getElementById('range-red')
    .addEventListener('input', updateColorBox);
  document
    .getElementById('range-green')
    .addEventListener('input', updateColorBox);
  document
    .getElementById('range-blue')
    .addEventListener('input', updateColorBox);
}

function updateColorBox(event) {
  if (event.target.id === 'range-red') {
    redValue = event.target.value;
    document.getElementById('number-red').value = redValue;
  } else if (event.target.id === 'range-green') {
    greenValue = event.target.value;
    document.getElementById('number-green').value = greenValue;
  } else if (event.target.id === 'range-blue') {
    blueValue = event.target.value;
    document.getElementById('number-blue').value = blueValue;
  }

  applyColor(redValue, greenValue, blueValue);
}

function applyColor(r, g, b) {
  // let rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
  let rgb = `rgb(${r},${g}, ${b})`;
  document.getElementById('color-box').style.backgroundColor = rgb;
  let number = r;

  //let hexa = `#${r}${g}${b}`;
  //document.getElementById('hexa').innerHTML = hexa;
}
