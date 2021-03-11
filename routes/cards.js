const { Collection } = require('../models/collection');
const { Card, validate } = require('../models/card');
const express = require('express');
const router = express.Router();

router.get('/:collectionId/flashCards', async (req, res) => {
    try {
        const cards = await Card.find();
        return res.send(cards);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:collectionId/flashcards/:cardId', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);

        if(!card)
            return res.status(400).send(`The card with id "${req.params.id}" does not exist.`);
        
        return res.send(card);

    }   catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

/*router.post('/:collectionId/flashcards', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const card = new Card({
            category: req.body.category,
            cardNumber: req.body.cardNumber,
            question: req.body.question,
            answer: req.body.answer,
        });

        await card.save();

        return res.send(card);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});*/

router.post('/:collectionId/flashcards', async (req, res) => { 
    try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

    const card = new Card({
        category: req.body.category,
        cardNumber: req.body.cardNumber,
        question: req.body.question,
        answer: req.body.answer,
    });
    
    collection.flashCards.push(card);
    
    await collection.save();
    return res.send(collection.flashCards);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`); }
});

router.put('/:collectionId/flashcards/:cardId/', async (req, res) => { 
    try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

    const card = collection.flashCards.id(req.params.cardId);
    if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist in the collection's flashcard deck.`);

    card.category = req.body.category;
    card.cardNumber = req.body.description;
    card.question = req.body.category;
    card.answer = req.body.answer;

    await collection.findByIdAndUpdate(
        req.params.collectionId, 
        {
            flashCards: collection.flashCards
        },
        { new: true }
    );

    return res.send(card);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`); }
});

router.delete('/:collectionId/flashcards/:cardId', async (req, res) => { 
    try {

        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

        let card = collection.flashCards.id(req.params.cardId);
        if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist in the collection's flashcard deck.`);

        card = await card.remove();

        await collection.save();
        return res.send(card);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    } 
});

module.exports = router;
