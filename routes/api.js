const express = require('express');
const router = express.Router();
const api = require('../api');

router.post('/create', async (req, res) => {res.send(await api.create(req.body))});

router.post('/create-relation', async (req, res) => {res.send(await api.createRelation(req.body))});

router.post('/update', async (req, res) => {res.send(await api.update(req.body))});

router.post('/get', async (req, res) => {res.send(await api.get(req.body))});

module.exports = router;