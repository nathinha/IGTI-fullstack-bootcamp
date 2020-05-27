window.addEventListener('load', onLoad);

var gNamesList = ['Um', 'Dois', 'Três', 'Quatro', 'Cinco'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function onLoad() {
  console.log('Page completely loaded');

  preventFormSubmit();

  setFocus();
  render();
}

function preventFormSubmit() {
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

function setFocus() {
  inputName = document.getElementById('inputName');
  inputName.addEventListener('keyup', (event) => {
    if (
      (event.key === 'Enter' || event.key === 'Insert') &&
      event.target.value.trim() !== ''
    ) {
      if (isEditing) {
        gNamesList[currentIndex] = event.target.value;
        isEditing = false;
      } else {
        gNamesList.push(event.target.value);
      }
      render();
      event.target.value = '';
    }
  });

  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', () => {
      console.log(index);
      gNamesList.splice(index, 1);
      render();
    });
    return button;
  }

  function createClickableSpan(text, index) {
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = text;
    span.addEventListener('click', () => {
      inputName.value = text;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    });
    return span;
  }

  var divNames = document.getElementById('names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  gNamesList.forEach((element, index) => {
    var li = document.createElement('li');
    var span = createClickableSpan(element, index);
    var button = createDeleteButton(index);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  });

  divNames.appendChild(ul);
}
