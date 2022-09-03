// imports
const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())

// connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})


// static
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))


// set views
app.set('views', './views')
app.set('view engine', 'ejs')


// parse
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// ejs
app.get('', (req, res) => {
    res.render('index', {text: 'this is ejs'})
})

app.get('/about', (req, res) => {
    res.render('about', {text: 'about page'})
})

app.get('/skladiste', (req, res) => {
    res.render('skladiste', {text: 'about page'})
})

app.get('/orders', (req, res) => {
    var sql = 'SELECT * FROM narudzbe'
    con.query(sql, function(err, result){
        if(err) throw err
        else{
            res.send(result)
        }
    })
})


// mysql
app.post('/', (req, res) => {
    
    for(var i = 0 ; i < req.body.naslov.length; i++){
        console.log(req.body.naslov.length)
        var sql = 'INSERT INTO narudzbe (ime_narudzbe, cijena, kolicina, broj_stola) VALUES ("'+req.body.naslov[i]+'", "'+req.body.cijena[i]+'", "'+req.body.kolicina[i]+'" , "'+req.body.brojStola+'")';
        con.query(sql, function(err, result){
            if(err) throw err
        });
    }
    res.redirect("back")

})

app.post('/drop', (req, res) => {
    var sql = 'DELETE FROM narudzbe WHERE broj_stola="'+req.body.id+'";'
    con.query(sql, function(err, result){
        if(err) throw err
    });
})

// listen on port 3000
app.listen(port, () => console.info(`listening on port ${port}`))
