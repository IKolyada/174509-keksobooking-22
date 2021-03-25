'use strict';
import {getData} from './api.js';
import {createCard} from './card.js';
import {setAddress, clearCustomPropertyes} from './form.js';
import {watchMapFilters} from './filter.js';

const ADS_COUNT = 10;

//Map

const BASE_LAT = 35.66023;
const BASE_LNG = 139.73007;

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disableElement = (element) => {
  element.classList.add(element.classList.value + '--disabled');

  for (let child of element.children) {
    child.disabled = true;
  }
};

disableElement(form);
disableElement(mapFilters);

const unblockElement = (element) => {
  for (let child of element.children) {
    child.disabled = false;
  }
};

const activateMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  unblockElement(mapFilters);
};

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    form.classList.remove('ad-form--disabled');
    unblockElement(form);
  })

  .setView({
    lat: BASE_LAT,
    lng: BASE_LNG,
  }, 10.4);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

getData((ads) => {
  addPins(ads.slice(0, ADS_COUNT));
  activateMapFilters();
  watchMapFilters(ads);
  clearCustomPropertyes(ads);
});

//Main pin

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPin = L.marker(
  {
    lat: BASE_LAT,
    lng: BASE_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPin.addTo(map);

setAddress(mainPin._latlng.lat, mainPin._latlng.lng);

mainPin.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  setAddress(latLng.lat.toFixed(5), latLng.lng.toFixed(5));
});

const returnMainPin = () => {
  mainPin.remove();
  mainPin._latlng.lat = BASE_LAT;
  mainPin._latlng.lng = BASE_LNG;
  mainPin.addTo(map);
  setAddress(mainPin._latlng.lat, mainPin._latlng.lng);
};

//Other pins

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 40],
});

const layerPins = L.layerGroup();

const addPins = (ads) => {
  layerPins.clearLayers();
  ads.forEach((point) => {
    const pin = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    pin
      .addTo(layerPins)
      .bindPopup(
        createCard(point),
        {
          keepInView: true,
        },
      );
  });
  layerPins.addTo(map);
};

export {addPins, returnMainPin, activateMapFilters};
