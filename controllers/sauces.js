const Product = require("../models/product")

exports.createProduct = (req, res, next) => {
    delete req.body.id;
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyProduct = (req, res, next) => {
    Product.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneProduct = (req, res, next) => {
    Product.findOne({ id: req.params.id })
      .then(product => res.status(200).json(product))
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllProducts = (req, res, next) => {
    Product.find()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json({ error }));
  };