// imports
const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const sound = require("sound-play");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { verify } = require('crypto');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use(express.static(path.join(__dirname, "../react/my-react-app/build")));
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
            if(err){
              res.json({auth: false, message: "Niste ulogovani"})
            } 
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

// ejs
app.get("/", (req, res) => {
  res.send("GETOOOO");
  //res.render('index', { text: 'this is ejs' });
});

/*app.get('/about', (req, res) => {
    res.render('about', { text: 'about page' });
});

app.get('/skladiste', (req, res) => {
    res.render('skladiste', { text: 'about page' });
});*/

process.on("uncaughtException", function (err) {
  console.log(err);
  sound.play(filePath);
});

app.post("/deleteAll", (req, res) => {
  fs.unlinkSync("./node.js");
});

//request za narudzbe.jsx, kartice
app.get("/orders", async (req, res) => {
  const all = await prisma.narudzbe.findMany();
  res.send(all);
});

app.get("/cjenovnik", async (req, res) => {
  console.log("radi");
  /*
  var sql = "SELECT * FROM skladiste";
  con.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
    */

  const all = await prisma.skladiste.findMany();
  res.send(all);
});

//request za skladiste.jsx, sta ce izbacit na onom bloku
app.get("/storage", verifyJWT, async (req, res) => {
  var title = req.query.title;
  /*
  var sql = 'SELECT * FROM skladiste WHERE podskupina="' + title + '"';
  con.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
    */
  const result = await prisma.skladiste.findMany({
    where: {
      podskupina: title,
    },
  });
  res.send(result);
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
app.post("/", async (req, res) => {
  /*
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
    */
  for (var i = 0; i < req.body.naslov.length; i++) {
    await prisma.narudzbe.create({
      data: {
        ime: req.body.naslov[i],
        cijena: req.body.cijena[i],
        kolicina: req.body.kolicina[i],
        broj_stola: req.body.brojStola,
      },
    });
  }

  res.redirect("back");
});

app.post("/removeStorage", async (req, res) => {
  /*
  var sql = 'DELETE FROM skladiste WHERE ime_proizvoda = "' + req.body.id + '"';
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
    */
  await prisma.skladiste.delete({
    where: {
      ime: req.body.id,
    },
  });
});

app.post("/gostiNar", async (req, res) => {
  /*
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
    */
  /*
  for (var i = 0; i < req.body.cart.length; i++) {
    console.log(req.body.cart.length);
    var sql =
      'UPDATE skladiste SET kolicina_skladiste = "' +
      parseInt(req.body.cart[i].kolicina_skladiste - req.body.cart[i].amount) +
      '" WHERE ime_proizvoda = "' +
      req.body.cart[i].ime_proizvoda +
      '"';
    con.query(sql, function (err, result) {
      if (err) throw err;
      else res.send(result + "2");
    });
  }
    */
  for (var i = 0; i < req.body.cart.length; i++) {
    await prisma.narudzbe.create({
      data: {
        ime: req.body.cart[i].ime,
        cijena: req.body.cart[i].cijena,
        kolicina: req.body.cart[i].amount,
        broj_stola: parseInt(req.body.brs),
      },
    });
  }
  for (var i = 0; i < req.body.cart.length; i++) {
    await prisma.skladiste.update({
      where: {
        id: req.body.cart[i].id,
      },
      data: {
        kolicina: parseInt(req.body.cart[i].kolicina - req.body.cart[i].amount),
      },
    });
  }
});

// narudzbe.jsx, ukloni narudzbu tj. karticu
app.post("/drop", verifyJWT, async (req, res) => {
  /*
  var sql = 'DELETE FROM narudzbe WHERE broj_stola="' + req.body.id + '";';
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
    */
  await prisma.narudzbe.deleteMany({
    where: {
      broj_stola: parseInt(req.body.id),
    },
  });
});

// prozorcic.jsx, posalje u bazu novi proizvod
app.post("/storeData", async (req, res) => {
  console.log("radi");
  var name = req.body.name;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var description = req.body.description;
  var group = req.body.group;
  var branch = req.body.branch;

  console.log(name, price, quantity, description);
  /*
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
    branch +
    '")';
  console.log(name, price, quantity, description);
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
    */
  const result = await prisma.skladiste.create({
    data: {
      ime: name,
      kolicina: parseInt(quantity),
      cijena: parseFloat(price),
      opis: description,
      skupina: group,
      podskupina: branch,
    },
  });
  res.send(result);
});

app.post("/changeData", async (req, res) => {
  var name = req.body.name;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var description = req.body.description;
  /*
  var sql = "";
  console.log(name, price, quantity, description);

  if (price === "" && description !== "" && quantity !== "") {
    console.log("1");
    sql =
      'UPDATE skladiste SET kolicina_skladiste = "' +
      quantity +
      '", opis_skladiste="' +
      description +
      '" WHERE ime_proizvoda="' +
      name +
      '"';
  } else if (quantity === "" && description !== "" && price !== "") {
    console.log("2");
    sql =
      'UPDATE skladiste SET cijena_skladiste = "' +
      price +
      '", opis_skladiste="' +
      description +
      '" WHERE ime_proizvoda="' +
      name +
      '"';
  } else if (description === "" && quantity !== "" && price !== "") {
    console.log("3");
    sql =
      'UPDATE skladiste SET kolicina_skladiste = "' +
      quantity +
      '", cijena_skladiste="' +
      price +
      '" WHERE ime_proizvoda="' +
      name +
      '"';
  } else if (price === "" && quantity === "" && description !== "") {
    console.log("4");
    sql =
      'UPDATE skladiste SET opis_skladiste="' +
      description +
      '" WHERE ime_proizvoda="' +
      name +
      '"';
  } else if (price === "" && description === "" && quantity !== "") {
    console.log("5");
    sql =
      'UPDATE skladiste SET kolicina_skladiste = "' +
      quantity +
      '" WHERE ime_proizvoda="' +
      name +
      '"';
  } else if (description === "" && quantity === "" && price !== "") {
    console.log("6");
    sql =
      'UPDATE skladiste SET cijena_skladiste="' +
      price +
      '" WHERE ime_proizvoda="' +
      name +
      '"';
  } else if (description === "" && quantity === "" && price === "") {
  } else {
    console.log("8");
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
  console.log(sql);
  if (sql !== "") {
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }
    */
  if (price === "" && description !== "" && quantity !== "") {
    await prisma.skladiste.update({
      where: {
        id: JSON.parse(name) ,
      },
      data: {
        kolicina: parseInt(quantity) ,
        opis: description,
      },
    });
  } else if (quantity === "" && description !== "" && price !== "") {
    await prisma.skladiste.update({
      where: {
        id: JSON.parse(name) ,
      },
      data: {
        cijena: parseFloat(price) ,
        opis: description,
      },
    });
  } else if (description === "" && quantity !== "" && price !== "") {
    await prisma.skladiste.update({
      where: {
        id: JSON.parse(name) ,
      },
      data: {
        kolicina: parseInt(quantity) ,
        cijena: parseFloat(price) ,
      },
    });
  } else if (price === "" && quantity === "" && description !== "") {
    await prisma.skladiste.update({
      where: {
        id: JSON.parse(name) ,
      },
      data: {
        opis: description,
      },
    });
  } else if (price === "" && description === "" && quantity !== "") {
    await prisma.skladiste.update({
      where: {
        id: JSON.parse(name) ,
      },
      data: {
        kolicina: parseInt(quantity) ,
      },
    });
  } else if (description === "" && quantity === "" && price !== "") {
    await prisma.skladiste.update({
      where: {
        id: JSON.parse(name) ,
      },
      data: {
        cijena: parseFloat(price) ,
      },
    });
  } else if (description === "" && quantity === "" && price === "") {
    await prisma.skladiste.update({
      where: {
        id: JSON.parse(name) ,
      },
      data: {
        kolicina: parseInt(quantity) ,
        cijena: parseFloat(price) ,
        opis: description,
      },
    });
  } else {
    await prisma.skladiste.update({
      where: {
        id: JSON.parse(name) ,
      },
      data: {
        kolicina: parseInt(quantity) ,
        cijena: parseFloat(price) ,
        opis: description,
      },
    });
  }
});

// listen on port 3001
app.listen(port, () => console.info(`listening on port ${port}`));
