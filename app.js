const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const routes = require('./routes/read')
const deletes = require('./routes/delete')

//Setting View Engine for Rendering Pages
app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

/**
 * Read API
 * We can read the key value pair by specifying http://localhost:3000/read/<key>
 * Or We can list all the key value pair available by specifying http://localhost:3000/read/all
 */
app.use('/read', routes);

/**
 * Delete API
 * We can delete the key value pair by specifying http://localhost:3000/delete/<key>
 * Or We can delete all the key value pairs and reset the JSON back to {} by specifying http://localhost:3000/delete/all
 */
app.use('/delete', deletes)

//For Getting the Index Page Defaultly - Using GET
app.get('/', (req, res) => {
    res.render('index.ejs')
});

//For Getting the Index Page Defaultly - Using POST
app.post('/', (req, res) => {
    res.render('index.ejs')
})

//Get the JSON File from FrontEnd and rewriting the JSON DB File
app.post('/send', (req, res) => {
    fs.writeFileSync('data.json', JSON.stringify(req.body, null, 2))
})

/**
 * Create API
 * We can create a new key value pair by specifying http://localhost:3000/create and passing parameters as body
 * For Example:
 * {
 *    "key": {
 *              "name" : "raghavanandhan",
 *              "age" : "20",
 *              "ttl" : "20",   (20 Seconds)
 *              "timeSaved" : "1609231953521",
 *           }
 * }
 * This API will store the data in JSON DB File and sets the TTL Property to the Key-Value Pair if it is available
 * TTL --> Time To Live ===> It is a property which specifies the life time of the Key-Value Pair. After that time,
 * the Key-Value Pair won't be available for Read and Delete Operations. It is completely optional, It's users choice to set value
 * for the TTL Property. If not set, undefined value will be set for TTL Property.
 */
app.post('/submit', (req, res) => {
    let data = getData()
    randomKey = GenerateRandomID(15);
    if (data.hasOwnProperty(randomKey)) {
        res.json({ message: "KEY ALREADY EXISTS!" });
    } else {
        const now = new Date().getTime();
        if (req.body.ttl == '') {
            data[randomKey] = { name: req.body.name, age: req.body.age, ttl: undefined, timeSaved: now }
        } else {
            data[randomKey] = { name: req.body.name, age: req.body.age, ttl: req.body.ttl, timeSaved: now }
        }
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
        res.status(200).send("Your data is saved! with given random key : " + randomKey)
    }
})

//FUNCTIONS:

//This Function getData is used to read data from the JSON DB File and gives us back the data in JSON Object Format
const getData = () => {
    return JSON.parse(fs.readFileSync('data.json'))
}

//This Function GenerateRandomID is used to set random value for the Key to store a Key-Value Pair in JSON DB
const GenerateRandomID = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//Listening to the App Server
app.listen(3000);