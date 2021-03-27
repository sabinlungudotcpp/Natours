const express = require('express');
const app = express();
const port = process.env.PORT || 3500;

app.listen(port, (error) => {
    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.error(error.toString());
    }
})