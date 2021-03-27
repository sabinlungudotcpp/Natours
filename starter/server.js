const app = require('./app');
const port = process.env.PORT || 3500;

// Listen for incoming requests on the specified port
app.listen(port, (error) => {

    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.error(error.toString());
    }
})