const express = require('express');
const route = express.Router();
const fs = require('fs');

//Simple Route which route to a page that lists all the data in the JSON DB File as a HTML Table
//Using POST
route.post('/', (req, res) => {
    res.render('data.ejs')
})

//Using GET
route.get('/', (req, res) => {
    res.render('data.ejs')
})

/**
 * When specified http://localhost:3000/read/all, it will fetch all the Key-Value Pairs in the JSON DB File,
 * and display all the Key-Value pairs as response.
 */
route.get('/all', (req, res) => {
    let data = getData()
    res.json(data)
})

/**
 * When specified http://localhost:3000/read/<key>, it will fetch the specified key in the param,
 * and display the specific key from the JSON DB File as response.
 * If not, it will show appropriate Error
 */
route.route("/:key").get(async (req, res) => {
    let data = getData()
    let key = req.params.key
    const now = new Date().getTime();
    if (data[key] != undefined) {
        if (data[key].ttl == undefined || data[key].ttl == "") {
            res.status(200).json(data[key]);
        } else if (now > (data[key].ttl * 1000 + data[key].timeSaved * 1)) {
            data[key] = null
            delete data[key]
            console.log("Deleted in data")
            fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
            res.status(200).json({ message: "KEY IS EXPIRED!" })
        } else if (now <= (data[key].ttl * 1000 + data[key].timeSaved * 1)) {
            res.status(200).json(data[key]);
        } else {
            res.status(200).json({ message: "KEY IS NOT AVAILABLE!" });
        }
    } else {
        res.status(404).json({ message: 'KEY DOESN\'T EXIST' });
    }
})

//This Function getData is used to read data from the JSON DB File and gives us back the data in JSON Object Format
const getData = () => {
    return JSON.parse(fs.readFileSync('data.json'))
}

module.exports = route;