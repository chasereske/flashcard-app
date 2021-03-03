const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 255 },
    desctription: { type: String, required: true },
    category: { type: String, required: true, minlength: 2, maxlength: 255 },
    dateModified: { type: Date, default: Date.now },
});

