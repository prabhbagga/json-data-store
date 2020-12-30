const express = require('express');
const route = express.Router();
const fs = require('fs');

/**
 * If Path is specified as http://localhost:3000/delete/ without a key, 
 * it will throw us error or redirect to the correct path http://localhost:3000/delete/<key>
 * with the key parameter that passed in the query 
 * */

//USING GET
route.route('/').get((req, res) => {
    if (req.query.key == undefined || req.query.key == "") {
        res.status(404).send("Please Pass Proper Key As Arguement")
    } else {
        res.redirect('/delete/' + req.body.key)
    }
})

//USING POST
route.route('/').post((req, res) => {
    if (req.body.key == undefined || req.body.key == "") {
        res.status(404).send("Please Pass Proper Key As Arguement")
    } else {
        res.redirect('/delete/' + req.body.key)
    }
})

/**
 * When specified http://localhost:3000/delete/all, it will delete all the Key-Value Pairs in the JSON DB File,
 * and the JSON DB File is resetted to {}
 */
route.get('/all', (req, res) => {
    let data = {}
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');
    res.json({ message: "ALL KEYS ARE DELETED! AND JSON FILE IS RESETTED TO {}" })
})

/**
 * When specified http://localhost:3000/delete/<key>, it will delete the specified key in the param,
 * and removes the specific key from the JSON DB File
 */
route.route('/:key').get((req, res) => {
    let key = req.params.key
    let data = getData();
    if (key == "" || key == undefined) {
        res.json({ message: "KEY IS IMPROPER OR UNDEFINED!!!" })
    } else {
        if (data.hasOwnProperty(key)) {
            delete data[key];
            fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');
            res.json({ message: "SUCCESSFULLY KEY IS DELETED!" })
        } else {
            res.json({ message: "KEY DOESN'T EXIST!!!" })
        }
    }

})

//This Function getData is used to read data from the JSON DB File and gives us back the data in JSON Object Format
const getData = () => {
    return JSON.parse(fs.readFileSync('data.json'))
}

module.exports = route;