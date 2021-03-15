import {generateRandomInt, generateRandomNum} from './util.js';

const ACCOMMODATION = ['Palace', 'Flat', 'House', 'Bungalow'];
const CHECKTIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const adsQuantity = 10;

const usersQuantity = {
  min: 1,
  max: 8,
};

const latitude = {
  min: 35.65000,
  max: 35.70000,
  decimal: 5,
};
const longitude = {
  min: 139.70000,
  max: 139.80000,
  decimal: 5,
};


const titleDescription = ['with a beautiful park view', 'by the lake', 'with fifty cats', 'with aquadisko'];
const photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Генерирую объект  author

const createAvatar = (min, max) => {
  let upToTen = '';
  if (max < 10) {
    upToTen = '0';
  }
  return `img/avatars/user${upToTen}${generateRandomInt(min, max)}.png`;
};

//Генерирую объект location

const createLocation = () => {
  return {
    x: generateRandomNum(latitude.min, latitude.max, latitude.decimal),
    y: generateRandomNum(longitude.min, longitude.max, longitude.decimal),
  }
};

//Генерирую объект offer

const createDataAccommodation = () => {
  const randomAccomadationIndex = generateRandomInt(0, ACCOMMODATION.length - 1);
  const randomTitleDescription = generateRandomInt(0, titleDescription.length - 1);
  return {
    title: ACCOMMODATION[randomAccomadationIndex],
    description: titleDescription[randomTitleDescription],
    type: ACCOMMODATION[randomAccomadationIndex],
  }
};

const generatePrice = (type) => {
  switch (type) {
    case 'Palace':
      return generateRandomInt(10000, 1000000);
    case 'Flat':
      return generateRandomInt(1000, 1000000);
    case 'House':
      return generateRandomInt(5000, 1000000);
    case 'Bungalow':
      return generateRandomInt(0, 1000000);
  }
};

const generateRooms = (type) => {
  switch (type) {
    case 'Palace':
      return generateRandomInt(10, 100);
    case 'Flat':
      return generateRandomInt(1, 10);
    case 'House':
      return generateRandomInt(5, 20);
    case 'Bungalow':
      return generateRandomInt(1, 2);
  }
};

const generateCheckTime = () => {
  const randomCheckIndex = generateRandomInt(0, CHECKTIME.length - 1);
  return CHECKTIME[randomCheckIndex];
};

const generateFeatures = () => {
  const randomFeatureQuantity = generateRandomInt(1, FEATURES.length);
  const featuresList = [];
  for (let i = 0; i < randomFeatureQuantity; i++) {
    const featureIndex = Math.floor(Math.random() * FEATURES.length);
    featuresList.includes(FEATURES[featureIndex]) ? featureIndex : featuresList.push(FEATURES[featureIndex]);
  }
  return featuresList;
};

const generatePhotos = () => {
  const randomPhotoQuantity = generateRandomInt(1, photos.length);
  const photoList = [];
  for (let i = 0; i < randomPhotoQuantity; i++) {
    const photoIndex = Math.floor(Math.random() * photos.length);
    photoList.push(photos[photoIndex]);
  }
  return photoList;
};

const generateAds = () => {
  const ads = [];
  for (let i = 0; i < adsQuantity; i++) {
    const dataAccommodation = createDataAccommodation();
    const location = createLocation();
    const rooms = generateRooms(dataAccommodation.type);
    const ad = {
      author: {
        avatar: createAvatar(usersQuantity.min, usersQuantity.max),
      },
      offer: {
        title: dataAccommodation.title + ' ' + dataAccommodation.description,
        address: location.x + ', ' + location.y,
        price: generatePrice(dataAccommodation.type),
        type: dataAccommodation.type,
        rooms: rooms,
        guests: rooms * 2,
        checkin: generateCheckTime(),
        checkout: generateCheckTime(),
        features: generateFeatures(),
        description: 'Description text for ' + dataAccommodation.type,
        photos: generatePhotos(),
      },
      location: location,
    };
    ads.push(ad);
  }
  return ads;
}

export {generateAds};
