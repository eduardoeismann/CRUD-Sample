const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// CREATE
router.post('/clients', async (req, res, next) => {
    try {
        const data = await Client.create(req.body);
        console.log(data);
        res.json(data);
    } catch (error) {
        return next(error);
    }
});

// READ
router.get('/', async (req, res, next) => {
    try {
        const data = await Client.find();
        res.json(data);
    } catch (error) {
        return next(error);
    }
});

// UPDATE
router.route('/clients/:id')
    // Get One Client
    .get(async (req, res, next) => {
        try {
            const data = await Client.findById(req.params.id);
            res.json(data);
        } catch (error) {
            return next(error);
        }
    })
    // Update Client
    .put(async (req, res, next) => {
        try {
            const data = await Client.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.json(data);
            console.log("Client updated successfully!");
        } catch (error) {
            return next(error);
        }
    });

// DELETE Client
router.delete('/clients/:id', async (req, res, next) => {
    try {
        const data = await Client.findByIdAndRemove(req.params.id);
        res.status(200).json({
            msg: data,
        });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
