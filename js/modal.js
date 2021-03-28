'use strict';
import {resetForm} from './form.js';
import {isEscEvent} from './util.js';

const main = document.querySelector('#main');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const showMessage = (message) => {
  const listenEsc = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.removeChild(message);
      document.removeEventListener('keydown', listenEsc);
    }
  }
  return listenEsc;
};

//Success message

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  main.appendChild(successMessage);
  document.addEventListener('keydown', showMessage(successMessage));
  successMessage.addEventListener('click', () => {
    main.removeChild(successMessage);
  });
  resetForm();
};

//Error message

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  main.appendChild(errorMessage);
  document.addEventListener('keydown', showMessage(errorMessage));
  errorMessage.addEventListener('click', () => {
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
