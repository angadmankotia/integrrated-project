// backend/data/schemas.js
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, removeAdditional: true });


const itemSchema = {
type: 'object',
properties: {
id: { type: 'string' },
title: { type: 'string', minLength: 1 },
description: { type: 'string' },
price: { type: 'number', minimum: 0 },
},
required: ['title', 'price'],
additionalProperties: false,
};


const validateItem = (payload) => {
const validate = ajv.compile(itemSchema);
const valid = validate(payload);
return { valid, errors: validate.errors, value: payload };
};


module.exports = { validateItem, itemSchema };