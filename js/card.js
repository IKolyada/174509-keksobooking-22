const cardLayout = document.querySelector('#card').content.querySelector('.popup');

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

const createCard = (({author, offer}) => {
  const adCard = cardLayout.cloneNode(true);

  //Photo
  const photos = adCard.querySelector('.popup__photos');

  if (offer.photos.length === 0) {
    adCard.removeChild(photos);
  } else {
    const photo = photos.querySelector('.popup__photo');
    photos.removeChild(photo);
    const photoList = document.createDocumentFragment();
    for(let i = 0; i < offer.photos.length; i++) {
      const nextPhoto = photo.cloneNode(true);
      nextPhoto.src = offer.photos[i];
      photoList.appendChild(nextPhoto);
    }
    photos.appendChild(photoList);
  }

  //Features
  const features = adCard.querySelector('.popup__features');

  if (offer.features.length === 0) {
    adCard.removeChild(features);
  } else {
    const feature = features.querySelectorAll('.popup__feature');
    features.innerHTML = '';
    for(let i = 0; i < offer.features.length; i++) {
      feature.forEach((featureItem) => {
        if(featureItem.classList.contains('popup__feature--' + offer.features[i])) {
          features.appendChild(featureItem);
        }
      })
    }
  }

  const description = adCard.querySelector('.popup__description');

  if (offer.description === '') {
    adCard.removeChild(description);
  } else {
    description.textContent = offer.description;
  }

  adCard.querySelector('.popup__title').textContent = offer.title;
  adCard.querySelector('.popup__text--address').textContent = offer.address;
  adCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adCard.querySelector('.popup__type').textContent = translateType(offer.type);
  adCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adCard.querySelector('.popup__avatar').src = author.avatar;

  return adCard;
});

export {createCard}
