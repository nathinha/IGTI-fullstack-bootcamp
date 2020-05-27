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
  let divNames = document.querySelector('#names-list');
  divNames.innerHTML = '';

  let ul = document.createElement('ul');

  gNamesList.forEach((element, index) => {
    let li = document.createElement('li');
    let button = createDeleteButton(index);
    let span = createClickableSpan(element, index);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  });

  divNames.appendChild(ul);
};

const createDeleteButton = (index) => {
  let button = document.createElement('a');
  button.classList =
    'waves-effect waves-light btn-small btn-floating red darken-4';

  let image = document.createElement('i');
  image.classList = 'tiny material-icons';
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
  let button = document.createElement('a');
  button.classList = 'btn-small btn-flat white';
  button.textContent = text;

  button.addEventListener('click', () => {
    gIsEditing = true;
    setFocus(text);
    gCurrentIndex = index;
  });

  return button;
};
