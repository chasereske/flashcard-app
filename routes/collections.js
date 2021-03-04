const Collection = require('../models/collection');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {

        const collection = new Collection({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
        });

        await collection.save();

        return res.send(collection);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;