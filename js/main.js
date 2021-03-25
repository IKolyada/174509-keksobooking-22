'use strict';
import './map.js';
import {setFormSubmit} from './form.js';
import {showSuccessMessage, showErrorMessage} from './modal.js';
import './filter.js';

setFormSubmit(showSuccessMessage, showErrorMessage);
