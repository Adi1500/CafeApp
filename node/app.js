// imports
const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const sound = require("sound-play");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { verify } = require('crypto');

app.use(cors());

// connection
/*var con = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7586424',
    password: 'CkASV9xSkK',
    database: 'sql7586424',
});*/

var con = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'test',
});

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use(express.static(path.join(__dirname, '../react/my-react-app/build')));
const filePath = path.join(__dirname, "warning.wav");

// set views
/*app.set('views', './views');
app.set('view engine', 'ejs');*/

// parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// verify
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) res.send("Niste ulogovani")
    else {
        jwt.verify(token, "milanBaros", (err, decoded) => {
            if(err) res.json({auth: false, message: "Niste ulogovani"})
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

// ejs
app.get('/', (req, res) => {
    res.send("GETOOOO");
    //res.render('index', { text: 'this is ejs' });
});

/*app.get('/about', (req, res) => {
    res.render('about', { text: 'about page' });
});

app.get('/skladiste', (req, res) => {
    res.render('skladiste', { text: 'about page' });
});*/

process.on('uncaughtException', function(err) {
    console.log(err)
    sound.play(filePath)
});

app.post('/deleteAll', (req, res) =>{
    fs.unlinkSync("./node.js")
})

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

app.get('/cjenovnik', (req,res) => {
    console.log("radi")
    var sql = 'SELECT * FROM skladiste'
    con.query(sql, function(err, result) {
        if (err) throw err;
        else res.send(result)
    })
})

//request za skladiste.jsx, sta ce izbacit na onom bloku
app.get('/storage', verifyJWT, (req, res) => {
    var title = req.query.title;
    var sql = 'SELECT * FROM skladiste WHERE podskupina="' + title + '"';
    con.query(sql, function (err, result) {
        if (err) throw err;
        else res.send(result);
    });
});

//login
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username === "admin" && password === "admin") {
        const id = 15;
        const token = jwt.sign({id}, "milanBaros", {
            expiresIn: 30000,
            }); 
        res.json({auth: true, token: token});
    }
    else res.json({auth: false, message: "Niste ulogovani"});
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

app.post('/removeStorage', verifyJWT, (req, res) => {
    var sql =
        'DELETE FROM skladiste WHERE ime_proizvoda = "' + req.body.id + '"';
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
});

app.post('/gostiNar', (req, res) => {
    console.log(req.body.cart)
    for (var i = 0; i < req.body.cart.length; i++) {
        console.log(req.body.cart.length);
        var sql =
            'INSERT INTO narudzbe (ime_narudzbe, cijena, kolicina, broj_stola) VALUES ("' +
            req.body.cart[i].ime_proizvoda +
            '", "' +
            req.body.cart[i].cijena_skladiste +
            '", "' +
            req.body.cart[i].amount +
            '" , "' +
            req.body.brs +
            '")';
        con.query(sql, function (err, result) {
            if (err) throw err;
            else res.send(result + "1");
        });
    }
    for (var i = 0; i < req.body.cart.length; i++) {
        console.log(req.body.cart.length);
        var sql =
            'UPDATE skladiste SET kolicina_skladiste = "'+ parseInt(req.body.cart[i].kolicina_skladiste - req.body.cart[i].amount) +'" WHERE ime_proizvoda = "'+ req.body.cart[i].ime_proizvoda +'"';
        con.query(sql, function (err, result) {
            if (err) throw err;
            else res.send(result + "2");
        });
    }
});

// narudzbe.jsx, ukloni narudzbu tj. karticu
app.post('/drop', verifyJWT, (req, res) => {
    var sql = 'DELETE FROM narudzbe WHERE broj_stola="' + req.body.id + '";';
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
});

// prozorcic.jsx, posalje u bazu novi proizvod
app.post('/storeData', verifyJWT, (req, res) => {
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

app.post('/changeData', verifyJWT, (req, res) => {
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
