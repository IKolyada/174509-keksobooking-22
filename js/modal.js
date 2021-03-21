import {resetForm} from './form.js';
import {isEscEvent} from './util.js';

const main = document.querySelector('#main');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

//Success message

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  main.appendChild(successMessage);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.removeChild(successMessage);
    }
  });
  resetForm();
  successMessage.addEventListener('click', () => {
    main.removeChild(successMessage);
  });
};

//Error message

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  main.appendChild(errorMessage);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.removeChild(errorMessage);
    }
  });
  errorMessage.addEventListener('click', () => {
    main.removeChild(errorMessage);
  });
  errorButton.addEventListener('click', () => {
    main.removeChild(errorMessage);
  });
};

const showErrorDataMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  errorMessage.textContent = '';
  const messageText = document.createElement('p');
  messageText.classList.add('error__message');
  messageText.insertAdjacentHTML('beforeend', 'Не удалось загрузить объявления об аренде.<br>Пожалуйста попробуйте перезагрузить страницу.');
  errorMessage.appendChild(messageText);
  main.appendChild(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 3000);
};


export {showSuccessMessage, showErrorMessage, showErrorDataMessage};