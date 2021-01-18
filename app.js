const express = require("express"); // on importe l'application express
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const env = require("dotenv").config()

const path = require('path');



const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const app = express();

let pwd = process.env.PWRD;
let user = process.env.USER;

  mongoose.connect(`mongodb+srv://${user}:${pwd}@cluster0.z6hwp.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);


module.exports = app; // on exporte l'application pour qu'on puisse y accéder depuis les autres fichiers de notre projet notament notre serveur Node



