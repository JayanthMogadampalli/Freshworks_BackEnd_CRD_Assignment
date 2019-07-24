var express = require('express')
var datastore = require('data-store')
var port = process.env.PORT || 3000
var bodyparser = require('body-parser')







var app = express()


    -
    configure middlewares

app.use(bodyparser.urlencoded({
    extended: false
}))






//@get /

app.get('/', (req, res) => {
    res.json({
        "Code": "Welcome to freshworks campus drive"
    })
})


var store
//@create new datastore
app.get('/:filename', (req, res) => {
    store = new datastore({
        path: `./data-store/${req.params.filename}.json`
    })
    // res.json(`Currently ,You are in ${req.params.filename} file`)
    res.json(JSON.parse(store.json(null, 2)))
})



//@post/:filename/create
app.post('/:filename/update', (req, res) => {

    store = new datastore({
        path: `./data-store/${req.params.filename}.json`
    })

    Object.entries(req.body).forEach(entry => {
        if (!store.hasOwn(entry[0])) {

            store.set(entry[0], entry[1])
        }

    })
    res.json(JSON.parse(store.json(null, 2)))




})


//@get/:filename/getvalue

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
//@post/:filename/delete
app.delete('/:filename/delete', (req, res) => {
    store = new datastore({
        path: `./data-store/${req.params.filename}.json`
    })
    var count = 0
    Object.entries(req.body).forEach(entry => {
        if (store.hasOwn(entry[0])) {
            count++;
            store.del(entry[0])

        } else {
            res.json({
                error: `${entry[0]} does not exist`
            })
        }

    })
    if (count == 0) {
        res.json({
            status: "No such key or no key selected"
        })
    }
    res.json({
        status: "requested keys are deleted"
    })


})














app.listen(3000, () => {
    console.log('app is running at ' + port)

})