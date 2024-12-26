const express = require('express');
const app = express();
const port = 3400;

const path = require('path');

app.use(express.static('dist'));
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "../../../dist/index.html"));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
