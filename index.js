const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cors = require('cors');
const collections = require('./routes/collections');
const cards = require('./routes/cards');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/collections', collections);
app.use('/api/cards', cards);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});