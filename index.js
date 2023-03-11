const express = require('express');

const app = express();
const port = 3030;

// localhost:3030
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log('app listening on port');
});
