const { Collection, validate } = require('../models/collection');
const { Card } = require('../models/card');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const collections = await Collection.find();
        return res.send(collections);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);

        if(!collection)
            return res.status(400).send(`The collection with id "${req.params.id}" does not exist.`);
        
        return res.send(collection);

    }   catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const collection = new Collection({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            flashCard: [],
            dateModified: req.body.dateModified
        });

        let result = await collection.save();

        return res.send(result);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const collection = await Collection.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                dateModified: Date.now()
            },
            { new: true }
        );

        if (!collection)
            return res.status(400).send(`The collection with id "${req.params.id}" does not exist.`);

           // let result = await collection.save();

            return res.send(collection);
    }       catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const collection = await Collection.findByIdAndRemove(req.params.id);

        if (!collection)
            return res.status(400).send(`The collection with id "${req.params.id}" does not exist.`);
        
        return res.send(collection);

    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;