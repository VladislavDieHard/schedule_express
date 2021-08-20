const express = require('express');
const router = express.Router();
const api = require('../api');

router.post('/create/item', async (req, res) => {
    await api.create(req.body)
        .then((result) => {res.send(result)})
        .catch((e) => {res.send(e.message)});
});

router.post('/create/relation', async (req, res) => {
    await api.createRelation(req.body)
        .then((result) => {res.send(result)})
        .catch((e) => {res.send(e.message)});
});

router.post('/update/item', async (req, res) => {
    await api.update(req.body)
        .then((result) => {res.send(result)})
        .catch((e) => {res.send(e.message)});
});

router.post('/update/relation', async (req, res) => {
    await api.update(req.body)
        .then((result) => {res.send(result)})
        .catch((e) => {res.send(e.message)});
});

router.post('/get', async (req, res) => {
    await api.get(req.body)
        .then((result) => {res.send(result)})
        .catch((e) => {res.send(e.message)});
});

router.post('/delete/item', async (req, res) => {
    await api.deleteItem(req.body)
        .then((result) => {res.send(result)})
        .catch((e) => {res.send(e.message)});
});

router.post('/delete/relation', async (req, res) => {
    await api.deleteRelation(req.body)
        .then((result) => {res.send(result)})
        .catch((e) => {res.send(e.message)});
});

module.exports = router;