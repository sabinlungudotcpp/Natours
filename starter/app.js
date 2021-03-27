const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const okCode = 200;

app.get('/', (request, response, next) => {
    return response.status(okCode).json({
        message: 'Hello from the server side',
        sentAt: new Date().toISOString()
    })
});

app.post('/', (request, response, next) => {
    return response.send('You can post to this endpoint');
}); 

app.listen(port, (error) => {
    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.error(error.toString());
    }
})