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

router.post('/:collectionId/flashcards/:cardId', async (req, res) => { 
    try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!card) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

    const card = await Card.findById(req.params.cardId);
    if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);
    
    collection.flashCards.push(card);
    
    await card.save();
    return res.send(collection.flashCards);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`); }
});

router.put('/:cardId/flashcards/:collectionId', async (req, res) => { 
    try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

    const card = collection.flashCards.id(req.params.cardId);
    if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist in the collection's flashcard deck.`);

    card.category = req.body.name;
    card.cardNumber = req.body.description;
    card.question = req.body.category;
    card.answer = Date.now();

    await collection.save();
    return res.send(card);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`); }
});

router.delete('/:collectionId/flashcards/:cardId', async (req, res) => { 
    try {

        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

        let card = card.flashCards.id(req.params.cardId);
        if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist in the collection's flashcard deck.`);

        card = await card.remove();

        await collection.save();
        return res.send(card);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    } 
});

module.exports = router;