const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Product = require("./models/product")

mongoose.connect('mongodb+srv://ahmed:17012015@cluster0.z6hwp.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());


app.post("/api/sauces", (req, res, next) => {
    delete req.body.id;
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

app.put("api/sauces/:id", (req, res, next) => {
    Product.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
})

app.delete('/api/sauces/:id', (req, res, next) => {
    Product.deleteOne({ id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauces/:id', (req, res, next) => {
    Product.findOne({id: req.params.id})
    .then(product => res.status(200).json(product))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauces', (req, res, next) => {
    Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json({ error }));
});


module.exports = app;