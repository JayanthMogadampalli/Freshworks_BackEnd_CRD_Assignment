var express = require('express')
var app = express()
var datastore = require('data-store')
var port = process.env.PORT || 3000
var bodyparser = require('body-parser')
var store
    
//     Configure middlewares

app.use(bodyparser.urlencoded({
    extended: false
}))

//Get for base URL /

app.get('/', (req, res) => {
    res.json({
        "Code": "Welcome to freshworks campus drive"
    })
})

//Create new datastore
app.get('/:filename', (req, res) => {
    store = new datastore({
        path: `./data-store/${req.params.filename}.json`
    })
    // res.json(`Currently ,You are in ${req.params.filename} file`)
    res.json(JSON.parse(store.json(null, 2)))
})



//Post/:filename/create
app.post('/:filename/create', (req, res) => {

    store = new datastore({
        path: `./data-store/${req.params.filename}.json`
    })

    Object.entries(req.body).forEach(entry => {
        if (!store.hasOwn(entry[0])) {

            store.set(arr[0], entry[1])
        }
       
    })
    res.json(JSON.parse(store.json(null, 2)))
 



})


//Get/:filename/getvalue

app.get('/:filename/getvalue', (req, res) => {

    store = new datastore({
        path: `./data-store/${req.params.filename}.json`
    })


    var array = []
    Object.entries(req.body).forEach(entry => {
        if (store.hasOwn(entry[0])) {

            array.push(store.get(entry[0]))
        }

    })
    res.json({
        Values: array
    })




})

//delete    
//Delete/:filename/delkey
app.delete('/:filename/delkey', (req, res) => {
    store = new datastore({
        path: `./data-store/${req.params.filename}.json`
    })
    var cnt = 0
    Object.entries(req.body).forEach(entry => {
        if (store.hasOwn(entry[0])) {
            cnt++;
            store.del(entry[0])

        } else {
            res.json({
                error: `${entry[0]} does not exist`
            })
        }

    })
    if (cnt == 0) {
        res.json({
            status: "No such key is present"
        })
    }
    res.json({
        status: "requested keys are Removed"
    })


})














app.listen(3000, () => {
    console.log('app is running at ' + port)

})
