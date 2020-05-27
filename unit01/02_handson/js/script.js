let redValue = 0;
let greenValue = 0;
let blueValue = 0;

window.addEventListener('load', () => {
  // prevent form submit
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
  });

  handleEvents();

  initializeColorBox();
});

const handleEvents = () => {
  // initialize sliders' event listeners
  document
    .querySelector('#range-red')
    .addEventListener('input', updateColorBox);
  document
    .querySelector('#range-green')
    .addEventListener('input', updateColorBox);
  document
    .querySelector('#range-blue')
    .addEventListener('input', updateColorBox);
};

const updateColorBox = (event) => {
  if (event.target.id === 'range-red') {
    redValue = event.target.value;
    document.querySelector('#number-red').value = redValue;
  } else if (event.target.id === 'range-green') {
    greenValue = event.target.value;
    document.querySelector('#number-green').value = greenValue;
  } else if (event.target.id === 'range-blue') {
    blueValue = event.target.value;
    document.querySelector('#number-blue').value = blueValue;
  }

  applyColor(redValue, greenValue, blueValue);
};

const initializeColorBox = () => {
  // initialize UI
  document.querySelector('#range-red').value = redValue;
  document.querySelector('#number-red').value = redValue;
  document.querySelector('#range-green').value = greenValue;
  document.querySelector('#number-green').value = greenValue;
  document.querySelector('#range-blue').value = blueValue;
  document.querySelector('#number-blue').value = blueValue;

  applyColor(redValue, greenValue, blueValue);
};

const applyColor = (r, g, b) => {
  document.querySelector(
    '#color-box'
  ).style.backgroundColor = `rgb(${r},${g}, ${b})`;

  let hexaText = document.querySelector('#hexa');
  hexaText.innerHTML = `#${getHexa(r)}${getHexa(g)}${getHexa(b)}`;

  // change the text color to appear in front of the background
  // http://stackoverflow.com/a/3943023/112731
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  let rlRed = getRelativeLuminance(parseInt(r, 10));
  let rlGreen = getRelativeLuminance(parseInt(g, 10));
  let rlBlue = getRelativeLuminance(parseInt(b, 10));
  hexaText.style.color =
    0.2126 * rlRed + 0.7152 * rlGreen + 0.0722 * rlBlue > 0.179
      ? '#000000'
      : '#FFFFFF';
};

const getHexa = (value) => {
  // https://css-tricks.com/converting-color-spaces-in-javascript/
  let hexa = parseInt(value, 10).toString(16).toUpperCase();
  return hexa.length === 1 ? '0' + hexa : hexa;
};

const getRelativeLuminance = (color) => {
  color /= 255;
  return color <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4;
};
