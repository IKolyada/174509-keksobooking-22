import {showErrorDataMessage} from './modal.js';

const getData = (addPins) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((ads) => {
            addPins(ads);
          });
      } else {
        showErrorDataMessage();
      }
    })
    .catch(() => {
      showErrorDataMessage();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export {getData, sendData};
