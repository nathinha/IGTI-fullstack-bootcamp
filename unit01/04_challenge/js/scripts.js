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

  numberFormat = Intl.NumberFormat('pt-BR');

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
  foundStatsDiv.innerHTML = '';

  let statsElement = document.createElement('div');

  if (users.length === 0) {
    let searchText = document.createElement('div');
    searchText.textContent = 'No stats available for the results';
    statsElement.appendChild(searchText);
  } else {
    // sum of female users
    let statsFemaleUsers = document.createElement('div');
    const femaleUsers = users.reduce(
      (acc, cur) => (cur.gender === 'female' ? ++acc : acc),
      0
    );
    statsFemaleUsers.textContent = `Female users: ${femaleUsers}`;
    statsElement.appendChild(statsFemaleUsers);

    // sum of male users
    let statsMaleUsers = document.createElement('div');
    const maleUsers = users.reduce(
      (acc, cur) => (cur.gender === 'male' ? ++acc : acc),
      0
    );
    statsMaleUsers.textContent = `Male users: ${maleUsers}`;
    statsElement.appendChild(statsMaleUsers);

    // sum of all users' ages
    let statsAgeSum = document.createElement('div');
    const usersAgeSum = users.reduce((acc, cur) => acc + cur.age, 0);
    statsAgeSum.textContent = `Sum of ages: ${usersAgeSum}`;
    statsElement.appendChild(statsAgeSum);

    // average age for all users
    let statsAgeAvg = document.createElement('div');
    const usersAgeAvg = usersAgeSum / users.length;
    statsAgeAvg.textContent = `Average age: ${formatNumber(
      usersAgeAvg.toFixed(2)
    )}`;
    statsElement.appendChild(statsAgeAvg);
  }

  foundStatsDiv.appendChild(statsElement);
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

function formatNumber(number) {
  return numberFormat.format(number);
}
