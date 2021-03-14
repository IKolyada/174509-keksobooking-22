import {createCard} from './card.js';
//Map

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disableElement = (element) => {
  element.classList.add(element.classList.value + '--disabled');

  for (let child of element.children) {
    child.setAttribute('disabled', 'disabled');
  }
}
disableElement(form);
disableElement(mapFilters);

const unblockElement = (element) => {
  for (let child of element.children) {
    child.removeAttribute('disabled');
  }
}

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    form.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    unblockElement(form);
    unblockElement(mapFilters);
  })

  .setView({
    lat: 35.70,
    lng: 139.75,
  }, 10.4);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Main pin

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPin = L.marker(
  {
    lat: 35.66023,
    lng: 139.73007,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPin.addTo(map);

const setAddress = (address) => {
  address.value = `${mainPin._latlng.lat}, ${mainPin._latlng.lng}`;
  address.setAttribute('readonly', 'readonly');

  mainPin.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    address.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
  });
}

//Other pins

const pinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 40],
});


const addPins = (ads) => {
  ads.forEach((point) => {
    const pin = L.marker(
      {
        lat: point.location.x,
        lng: point.location.y,
      },
      {
        icon: pinIcon,
      },
    );

    pin
      .addTo(map)
      .bindPopup(
        createCard(point),
        {
          keepInView: true,
        },
      );
  });
}

export {addPins, setAddress}
