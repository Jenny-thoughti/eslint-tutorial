require('dotenv').config();
const express = require('express');

const app = express();
const APP_PORT = process.env.APP_PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello world' });
});

app.listen(APP_PORT, () => {
    console.info(
        '\n=========================>\nApp running on port: ',
        APP_PORT,
        '\n<=========================\n'
    ); // REMOVE console
});
