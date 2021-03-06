import {generateAds} from './data.js';

const cardLayout = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const adsData = generateAds();

const adList = [];

const insertData = adsData.forEach(({author, offer}) => {
  const adCard = cardLayout.cloneNode(true);

  //Type
  const translateType = (type) => {
    switch (type) {
      case 'Palace':
        return 'Дворец';
      case 'Flat':
        return 'Квартира';
      case 'House':
        return 'Дом';
      case 'Bungalow':
        return 'Бунгало';
    }
  };

  //Photo
  const photos = adCard.querySelector('.popup__photos');
  const photo = adCard.querySelector('.popup__photo');

  const photoList = document.createDocumentFragment();

  photos.removeChild(photo);

  for(let i = 0; i < offer.photos.length; i++) {
    const nextPhoto = photo.cloneNode(true);
    nextPhoto.src = offer.photos[i];
    photoList.appendChild(nextPhoto);
  }

  //Features
  const features = adCard.querySelector('.popup__features');
  const feature = adCard.querySelectorAll('.popup__feature');

  features.innerHTML = '';

  for(let i = 0; i < offer.features.length; i++) {
    feature.forEach((featureItem) => {
      if(featureItem.classList.contains('popup__feature--' + offer.features[i])) {
        features.appendChild(featureItem);
      }
    })
  }

  const description = adCard.querySelector('.popup__description');

  adCard.querySelector('.popup__title').textContent = offer.title;
  adCard.querySelector('.popup__text--address').textContent = offer.address;
  adCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adCard.querySelector('.popup__type').textContent = translateType(offer.type);
  adCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  description.textContent = offer.description;
  adCard.querySelector('.popup__photos').appendChild(photoList);
  adCard.querySelector('.popup__avatar').src = author.avatar;

  if (offer.description === '') {
    adCard.removeChild(description);
  }

  if (offer.photos.length < 1) {
    adCard.removeChild(photos);
  }

  if (offer.features.length < 1) {
    adCard.removeChild(features);
  }

  adList.push(adCard);

});

mapCanvas.appendChild(adList[0]);

export {insertData};
