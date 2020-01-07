/** @format */

/**** Global Constants & Variables ************************** */

const addMovieModal = document.getElementById('add-modal');
const deleteMovieModal = document.getElementById('delete-modal');
const startAddMovieBtn = document.querySelector('header>button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieModalBtn = addMovieModal.querySelector('.btn--passive');
const successAddMovieModalBtn = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const movies = [];

/**** Functions ******************************************* */

const clearMovieInputs = () => {
  for (let userInput of userInputs) {
    userInput.value = '';
  }
};

const updateUI = () => {
  if (movies.length > 0) {
    entryTextSection.style.display = 'none';
  } else {
    entryTextSection.style.display = 'block';
  }
};

const showDeleteMovieModal = () => {
  deleteMovieModal.classList.add('visible');
  backdrop.classList.add('visible');
};

const hideBackdrop = () => {
  backdrop.classList.remove('visible');
};

const deleteMovie = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const movieList = document.getElementById('movie-list');
  movieList.children[movieIndex].remove();
  hideBackdrop();
  closeDeleteMovieModal();
  updateUI();
  return;
};

const deleteMovieHandler = movieId => {
  showDeleteMovieModal();

  const cancelDeleteMovieModalBtn = deleteMovieModal.querySelector(
    '.btn--passive'
  );
  let confirmDeleteMovieModalBtn = deleteMovieModal.querySelector(
    '.btn--danger'
  );

  /**  */
  cancelDeleteMovieModalBtn.removeEventListener('click', closeDeleteMovieModal);
  cancelDeleteMovieModalBtn.addEventListener('click', closeDeleteMovieModal);

  confirmDeleteMovieModalBtn.replaceWith(
    confirmDeleteMovieModalBtn.cloneNode(true)
  );

  confirmDeleteMovieModalBtn = deleteMovieModal.querySelector('.btn--danger');
  confirmDeleteMovieModalBtn.addEventListener(
    'click',
    deleteMovie.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class= 'movie-element__image'>
      <img src="${imageUrl}" alt="${title}" />
    </div>
    <div class= 'movie-element__info'>
      <h2>${title}</h2>
      <p>${rating}/5 Stars</p>
    </div>
  `;

  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));

  const movieList = document.getElementById('movie-list');
  movieList.append(newMovieElement);
};

const closeDeleteMovieModal = () => {
  deleteMovieModal.classList.remove('visible');
  hideBackdrop();
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
  hideBackdrop();
  clearMovieInputs();
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  showBackdrop();
};

const showBackdrop = () => backdrop.classList.add('visible');

const addNewMovie = () => {
  let titleValue = document.getElementById('title').value;
  let imageUrlValue = document.getElementById('image-url').value;
  let ratingValue = document.getElementById('rating').value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    (ratingValue < 1 && rating > 5)
  ) {
    alert('Please enter valid values');
  } else {
    const newMovie = {
      id: Math.random().toString(),
      title: titleValue,
      imageUrl: imageUrlValue,
      rating: ratingValue
    };

    movies.push(newMovie);
    closeMovieModal();
    clearMovieInputs();
    updateUI();
    renderNewMovieElement(
      newMovie.id,
      newMovie.title,
      newMovie.imageUrl,
      newMovie.rating
    );
  }
};

/**** Click Handlers ******************************************* */

startAddMovieBtn.addEventListener('click', showMovieModal);
cancelAddMovieModalBtn.addEventListener('click', closeMovieModal);
backdrop.addEventListener('click', hideBackdrop);
successAddMovieModalBtn.addEventListener('click', addNewMovie);
