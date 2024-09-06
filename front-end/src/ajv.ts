import Ajv from 'ajv';

const ajv = new Ajv({
  coerceTypes: true
});

export default ajv;
