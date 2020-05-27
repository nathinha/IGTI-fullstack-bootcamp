let gNamesList = ['Um', 'Dois', 'Três', 'Quatro', 'Cinco'];
let nameInput = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
  console.log('Page completely loaded');

  // prevent form submit
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
  });

  prepareNameInput();
  renderNameList();
});

function prepareNameInput() {
  nameInput = document.getElementById('inputName');
  nameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        gNamesList[currentIndex] = event.target.value;
        isEditing = false;
      } else {
        gNamesList.push(event.target.value);
      }
      renderNameList();
      setFocus();
    }
  });
  setFocus();
}

const setFocus = (value = null) => {
  value === null ? (nameInput.value = '') : (nameInput.value = value);
  nameInput.focus();
};

function renderNameList() {
  function createDeleteButton(index) {
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', () => {
      gNamesList = gNamesList.filter((_, idx) => idx !== index);
      renderNameList();
    });
    return button;
  }

  function createClickableSpan(text, index) {
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = text;
    span.addEventListener('click', () => {
      setFocus(text);
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
