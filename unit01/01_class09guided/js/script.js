let gNamesList = ['André', 'Bia', 'Caroline', 'Denise', 'Eduardo'];
let gCurrentIndex = null;
let gIsEditing = false;
let nameInput = null;

window.addEventListener('load', () => {
  // prevent form submit
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
  });

  handleInput();
  renderNamesList();
});

const handleInput = () => {
  nameInput = document.querySelector('#input-name');
  nameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (gIsEditing) {
        gNamesList[gCurrentIndex] = event.target.value;
        gIsEditing = false;
      } else {
        gNamesList.push(event.target.value);
      }
      renderNamesList();
      setFocus();
    }
  });

  setFocus();
};

const setFocus = (value = null) => {
  value === null ? (nameInput.value = '') : (nameInput.value = value);
  nameInput.focus();
};

const renderNamesList = () => {
  var divNames = document.querySelector('#names-list');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  gNamesList.forEach((element, index) => {
    var li = document.createElement('li');
    var button = createDeleteButton(index);
    var span = createClickableSpan(element, index);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  });

  divNames.appendChild(ul);
};

const createDeleteButton = (index) => {
  var button = document.createElement('a');
  button.classList.add('waves-effect');
  button.classList.add('waves-light');
  button.classList.add('btn-small');
  button.classList.add('btn-floating');
  button.classList.add('red');
  button.classList.add('darken-4');

  var image = document.createElement('i');
  image.classList.add('tiny');
  image.classList.add('material-icons');
  image.textContent = 'delete_forever';

  button.appendChild(image);

  button.addEventListener('click', () => {
    gNamesList.splice(index, 1);
    renderNamesList();
    gIsEditing = false;
    setFocus();
  });
  return button;
};

const createClickableSpan = (text, index) => {
  var button = document.createElement('a');
  button.classList.add('btn-small');
  button.classList.add('btn-flat');
  button.classList.add('white');
  button.textContent = text;

  button.addEventListener('click', () => {
    gIsEditing = true;
    setFocus(text);
    gCurrentIndex = index;
  });

  return button;
};
