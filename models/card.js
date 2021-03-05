const mongoose = require('mongoose');
const Joi = require('joi');
const collectionSchema = require('./collection');

const cardSchema = new mongoose.Schema({
    category: { type: String, required: true, minlength: 2, maxlength: 255 },
    cardNumber: { type: Number, required: true },
    question: { type: String, required: true, minlength: 2, maxlength: 255 },
    answer: { type: String, required: true, minlength: 2, maxlength: 255 },
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        category: Joi.string().required(),
        cardNumber: Joi.number().required(),
        question: Joi.string().required(),
        answer: Joi.string().required(),
    });
    return schema.validate(card);
}

exports.Card = Card;
exports.validate = validateCard;