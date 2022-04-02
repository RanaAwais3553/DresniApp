import {validation} from './index';
import validate from 'validate.js';
import {AsyncStorageService} from '../services';

const validator = async (field, value) => {
  const lang = await AsyncStorageService.getString('@lang');
  let object = new Object();
  object[field] = value;

  let constraint = new Object();
  constraint[field] = validation(lang)[field];

  // Validate against the constraint and hold the error messages
  var result = validate({}, constraint); //
  if (value != '' && value != null) {
    result = validate(object, constraint);
  }
  if (result) {
    return result[field][0];
  }

  return null;
};
export default validator;
