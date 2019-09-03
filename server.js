// Express code
const express = require('express');
const app = express();
const port = process.env.port || 3333;
const path = require('path');

// Test endpoint
app.get('/coaches', function(request, response) {
    database.collection("Users").find().toArray((err, documents) => {
        console.log(documents);
        response.send(documents);
    });
});

app.get('/users', function(request, response) {
    database.collection("Users").find().toArray((err, users) => {
        response.send(users);
    });
});

app.put('/user', function(request, response) {
    // check if user already is in the database.
    // if so, return error.
    // if not, add user to database
});

app.get('/teams', (request, response) => {
    database.collection("Teams").find().toArray((err, teams) => {
        response.send(teams);
    });
});

// Enable the loading of static files within the dist/team-training-log folder
app.use(express.static(path.join(__dirname, 'dist/team-training-log')));

// Route the rest of the GET requests here to load the index.html file
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/team-training-log/index.html'));
});

// Start the application
// app.listen(port, function() {
//     console.log(`Application Started on port ${port}...`);
// });


// MongoDB code
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://TrainingLogApplication:TrainingLog@traininglogcluster-z1ugs.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     // retrieve all users from the Users collection in the TrainingLogDataBase
//     const usersCollection = client.db("TrainingLogDataBase").collection("Users").find();

//     // iterate over them and print out the user information
//     usersCollection.forEach(user => {
//         console.log(user);
//     });

//     // close the connection when we are done
//     client.close();
// });

let database;

/**
 * Connect to MongoDB and then execute the callback function.
 * @param {*} callbackFunction
 */
const connectToDatabase = function(callbackFunction) {
    if (!database) {
        console.log('Not connected to the database....');
        console.log('Connecting...');
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://TrainingLogApplication:TrainingLog@traininglogcluster-z1ugs.mongodb.net/test?retryWrites=true&w=majority";
        const mongoConnectionClient = new MongoClient(uri, { useNewUrlParser: true });
        mongoConnectionClient.connect(err => {
            if(!err) {
                console.log('Connected!');
                database = mongoConnectionClient.db("TrainingLogDataBase");
                callbackFunction();
            }
        });
    }
}

// Start by connecting to the database, and then starting the express application.
connectToDatabase(() => {
    console.log('Successfully connected to MongDB. Starting application...')
    app.listen(port, function() {
        console.log(`Application Started on port ${port}!`);
    });
});
