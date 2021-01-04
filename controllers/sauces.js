const Product = require("../models/Product")
const fs = require('fs');

exports.createProduct = (req, res, next) => {
    const productObject = JSON.parse(req.body.sauce);
    delete productObject._id;
    const product = new Product({
      ...productObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      usersLiked: [],
      usersDisliked: [],
      likes: 0,
      dislikes: 0
    });
    product.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

// exports.modifyProduct = (req, res, next) => {
//     Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
//   };

exports.modifyProduct = (req, res, next) => {
  const productObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Product.updateOne({ _id: req.params.id }, { ...productObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// exports.deleteProduct = (req, res, next) => {
//     Product.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//       .catch(error => res.status(400).json({ error }));
// };


exports.deleteProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      const filename = product.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Product.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
  });
})
    .catch(error => res.status(500).json({ error }));
};

exports.getOneProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json(product))
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllProducts = (req, res, next) => {
    Product.find()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json({ error }));
  };