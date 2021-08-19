const express = require('express');
const router = express.Router();
const api = require('../api');

router.post('/create', async (req, res) => {
    await api.create(req.body)
        .then((result) => {res.send(result)})
        .catch((e) => {res.send(e.message)});
});

router.post('/create-relation', async (req, res) => {
    try {
        res.send(await api.createRelation(req.body))
    } catch (e) {
        res.send(e.message);
    }
});

router.post('/update', async (req, res) => {
    console.log(req.body)
    await api.update(req.body)
        .then((result) => {res.send(result)})
        .catch((e) => {res.send(e.message)});
});

router.post('/get', async (req, res) => {
    try {
        res.send(await api.get(req.body))
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;