const express = require('express');

const path = require('path');

const publicPath = path.join(__dirname, '../public');

console.log(publicPath);
const port = process.env.PORT || PORT;
var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});