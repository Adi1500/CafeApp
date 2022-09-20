// imports
const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

// connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

// parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ejs
app.get('', (req, res) => {
    res.render('index', { text: 'this is ejs' });
});

app.get('/about', (req, res) => {
    res.render('about', { text: 'about page' });
});

app.get('/skladiste', (req, res) => {
    res.render('skladiste', { text: 'about page' });
});

//request za narudzbe.jsx, kartice
app.get('/orders', (req, res) => {
    var sql = 'SELECT * FROM narudzbe';
    con.query(sql, function (err, result) {
        if (err) throw err;
        else {
            res.send(result);
        }
    });
});

//request za skladiste.jsx, sta ce izbacit na onom bloku
app.get('/storage', (req, res) => {
    var title = req.query.title;
    var sql = 'SELECT * FROM skladiste WHERE podskupina="' + title + '"';
    con.query(sql, function (err, result) {
        if (err) throw err;
        else res.send(result);
    });
});

// mysql
// gostijs.js posalje u bazu narudzbe od gostiju
app.post('/', (req, res) => {
    for (var i = 0; i < req.body.naslov.length; i++) {
        console.log(req.body.naslov.length);
        var sql =
            'INSERT INTO narudzbe (ime_narudzbe, cijena, kolicina, broj_stola) VALUES ("' +
            req.body.naslov[i] +
            '", "' +
            req.body.cijena[i] +
            '", "' +
            req.body.kolicina[i] +
            '" , "' +
            req.body.brojStola +
            '")';
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    }
    res.redirect('back');
});

app.post('/removeStorage', (req, res) => {
    var sql =
        'DELETE FROM skladiste WHERE ime_proizvoda = "' + req.body.id + '"';
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
});

// narudzbe.jsx, ukloni narudzbu tj. karticu
app.post('/drop', (req, res) => {
    var sql = 'DELETE FROM narudzbe WHERE broj_stola="' + req.body.id + '";';
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
});

// prozorcic.jsx, posalje u bazu novi proizvod
app.post('/storeData', (req, res) => {
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var description = req.body.description;
    var group = req.body.group;
    var branch = req.body.branch
    var sql =
        'INSERT INTO skladiste (ime_proizvoda, kolicina_skladiste, cijena_skladiste, opis_skladiste, skupina, podskupina) VALUES ("' +
        name +
        '", "' +
        quantity +
        '", "' +
        price +
        '", "' +
        description +
        '", "' +
        group +
        '", "' +
        branch +'")';
    console.log(name, price, quantity, description);
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
});

app.post('/changeData', (req, res) => {
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var description = req.body.description;
    var sql = ""
    console.log(name, price, quantity, description);

    if(price === '' && description !== '' && quantity !== ''){
        console.log("1")
        sql =
        'UPDATE skladiste SET kolicina_skladiste = "' +
        quantity +
        '", opis_skladiste="' +
        description +
        '" WHERE ime_proizvoda="' +
        name +
        '"';
    }
    else if(quantity === '' && description !== '' && price !== ''){
        console.log("2")
        sql =
        'UPDATE skladiste SET cijena_skladiste = "' +
        price +
        '", opis_skladiste="' +
        description +
        '" WHERE ime_proizvoda="' +
        name +
        '"';
    }
    else if(description === '' && quantity !== '' && price !== ''){
        console.log("3")
        sql =
        'UPDATE skladiste SET kolicina_skladiste = "' +
        quantity +
        '", cijena_skladiste="' +
        price +
        '" WHERE ime_proizvoda="' +
        name +
        '"';
    }
    else if(price === '' && quantity === '' && description !== ''){
        console.log("4")
        sql =
        'UPDATE skladiste SET opis_skladiste="' +
        description +
        '" WHERE ime_proizvoda="' +
        name +
        '"';
    }
    else if(price === '' && description === '' && quantity !== ''){
        console.log("5")
        sql =
        'UPDATE skladiste SET kolicina_skladiste = "' +
        quantity +
        '" WHERE ime_proizvoda="' +
        name +
        '"';
    }
    else if(description === '' && quantity === '' && price !== ''){
        console.log("6")
        sql =
        'UPDATE skladiste SET cijena_skladiste="' +
        price +
        '" WHERE ime_proizvoda="' +
        name +
        '"';
    }
    else if(description === '' && quantity === '' && price === ''){
        
    }
    else{
        console.log("8")
        sql =
        'UPDATE skladiste SET kolicina_skladiste = "' +
        quantity +
        '", cijena_skladiste="' +
        price +
        '", opis_skladiste="' +
        description +
        '" WHERE ime_proizvoda="' +
        name +
        '"';
    }
    console.log(sql)
    if(sql !== ''){
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    }

});

// listen on port 3001
app.listen(port, () => console.info(`listening on port ${port}`));
