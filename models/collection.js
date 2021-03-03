const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    id: Number,
    name: String,
    desctription: String,
    dateModified: Date,
});

