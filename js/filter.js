'use strict';
/* global _:readonly */
import {addPins} from './map.js';

const RERENDER_DELAY = 500;

const mapFilters = document.querySelector('.map__filters');
const type = mapFilters.querySelector('#housing-type');
const price = mapFilters.querySelector('#housing-price');
const rooms = mapFilters.querySelector('#housing-rooms');
const guests = mapFilters.querySelector('#housing-guests');
const features = mapFilters.querySelector('#housing-features');
const featuresList = Array.from(features.querySelectorAll('input'));

const filterType = (ad) => {
  return ad.offer.type === type.value || type.value === 'any';
};

const filterPrice = (ad) => {
  switch(price.value) {
    case 'middle':
      return ad.offer.price >= 10000 && ad.offer.price < 50000;
    case 'low':
      return ad.offer.price < 10000;
    case 'high':
      return ad.offer.price >= 50000;
    case 'any':
      return 'ad';
  }
};

const filterRooms = (ad) => {
  return ad.offer.rooms === Number(rooms.value) || rooms.value === 'any';
};

const filterGuests = (ad) => {
  return ad.offer.guests === Number(guests.value) || guests.value === 'any';
};

const compareFeatures = (adFeatures, selectedFeatures) => {
  return selectedFeatures.every(feature => adFeatures.includes(feature));
};

const filterFeatures = (ad) => {
  const checkedFeatures = featuresList.filter(feature => feature.checked);
  const getValues = checkedFeatures.map(feature => feature.value);

  return compareFeatures(ad.offer.features, getValues) || getValues.length ===0;
};

const filterAds = (ads) => {
  return ads.filter(ad =>
    filterType(ad) &&
    filterPrice(ad) &&
    filterRooms(ad) &&
    filterGuests(ad) &&
    filterFeatures(ad),
  );
};

const watchMapFilters = (ads) => {
  mapFilters.addEventListener('change', _.debounce(
    () => {
      addPins(filterAds(ads).slice(0, 10));
    },
    RERENDER_DELAY,
  ))
};

export {watchMapFilters};
