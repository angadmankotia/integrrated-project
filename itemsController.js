// backend/controllers/itemsController.js
const store = require('../data/inMemoryStore');
const { validateItem } = require('../data/schemas');


exports.list = (req, res) => {
// simple pagination
const page = Math.max(1, parseInt(req.query.page || '1'));
const limit = Math.min(100, parseInt(req.query.limit || '10'));
const start = (page - 1) * limit;
const items = store.items.slice(start, start + limit);
res.json({ page, limit, total: store.items.length, items });
};


exports.get = (req, res, next) => {
const id = req.params.id;
const item = store.items.find(i => i.id === id);
if (!item) return res.status(404).json({ error: 'Item not found' });
res.json(item);
};


exports.create = (req, res, next) => {
const payload = req.body;
const { valid, errors, value } = validateItem(payload);
if (!valid) return res.status(400).json({ errors });
value.id = String(Date.now());
store.items.unshift(value);
res.status(201).json(value);
};


exports.update = (req, res, next) => {
const id = req.params.id;
const idx = store.items.findIndex(i => i.id === id);
if (idx === -1) return res.status(404).json({ error: 'Item not found' });
const { valid, errors, value } = validateItem(req.body);
if (!valid) return res.status(400).json({ errors });
value.id = id;
store.items[idx] = value;
res.json(value);
};


exports.remove = (req, res) => {
const id = req.params.id;
store.items = store.items.filter(i => i.id !== id);
res.status(204).send();
};