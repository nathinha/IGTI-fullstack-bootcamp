let usersList = [];

let foundUsersDiv = null;
let foundStatsDiv = null;

let numberFormat = null;

window.addEventListener('load', () => {
  console.log('Page loaded');

  // prevent form submit
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
  });

  // clear search box on reload and set focus
  let input = document.querySelector('#search-terms');
  input.value = '';
  input.focus();

  foundUsersDiv = document.querySelector('#found-users');
  foundStatsDiv = document.querySelector('#found-stats');

  fetchData();
  handleSearch();
  render(usersList);
});

async function fetchData() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();

  usersList = json.results.map((user) => {
    const { name, gender, dob, picture } = user;

    return {
      name: `${name.first} ${name.last}`,
      gender,
      age: dob.age,
      photo: picture.thumbnail,
    };
  });

  usersList.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

function handleSearch() {
  let input = document.querySelector('#search-terms');
  let button = document.querySelector('#search-button');

  if (input.value.toLowerCase() === '') {
    button.classList.add('disabled');
  }

  button.addEventListener('click', () => getResults(input.value.toLowerCase()));
  input.addEventListener('keyup', () => {
    const searchTerms = input.value.toLowerCase();
    if (searchTerms === '') {
      button.classList.add('disabled');
      render([]);
    } else {
      button.classList.remove('disabled');
      getResults(searchTerms);
    }
  });
}

function getResults(input) {
  let results = usersList.filter(
    (user) => user.name.toLowerCase().indexOf(input) !== -1
  );

  render(results);
}

function render(users) {
  renderFoundUsers(users);
  renderFoundStats(users);
}

function renderFoundUsers(users) {
  foundUsersDiv.innerHTML = '';

  let usersElement = document.createElement('div');
  let searchText = document.querySelector('#results-summary');

  if (users.length === 0) {
    searchText.textContent = 'Results will appear here';
  } else {
    searchText.textContent = `${users.length} users found`;

    users.forEach((user) => {
      let userDiv = document.createElement('div');
      userDiv.classList = 'user';
      const image = createPhotoThumb(user.photo, user.name);
      const info = createUserInfo(user.name, user.age);
      userDiv.appendChild(image);
      userDiv.appendChild(info);

      usersElement.appendChild(userDiv);
    });
  }

  foundUsersDiv.appendChild(usersElement);
}

function renderFoundStats(users) {
  //
}

function createPhotoThumb(src, alt) {
  const photoDiv = document.createElement('div');
  const photoImg = document.createElement('img');

  photoImg.src = src;
  photoImg.alt = alt;
  photoDiv.appendChild(photoImg);

  return photoDiv;
}

function createUserInfo(name, age) {
  const infoDiv = document.createElement('div');
  const infoSpan = document.createElement('span');

  infoSpan.textContent = `${name}, ${age} years`;
  infoDiv.appendChild(infoSpan);

  return infoDiv;
}
