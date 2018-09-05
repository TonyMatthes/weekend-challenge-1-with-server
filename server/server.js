const PORT = 5000;

const express = require('express');

const app = express();

app.use(express.static('server/public'))

app.listen(PORT, function(){
    console.log('listening on port', PORT)
});