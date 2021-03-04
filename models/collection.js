const mongoose = require('mongoose');
const Joi = require('joi');

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    description: { type: String, required: true },
    category: { type: String, required: true, minlength: 2, maxlength: 255 },
    dateModified: { type: Date, default: Date.now },
});

const Collection = mongoose.model('Collection', collectionSchema); 

function validateCollection(collection) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        category: Joi.string().min(2).max(255).required(),
    });
    return schema.validate(product);
}

exports.Collection = Collection; 
exports.validate = validateCollection;
exports.collectionSchema = collectionSchema; 
