const express = require('express');
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");


router.post("/", saucesCtrl.createProduct);
router.put('/:id', saucesCtrl.modifyProduct);
router.delete('/:id', saucesCtrl.deleteProduct);
router.get('/:id', saucesCtrl.getOneProduct);
router.get('/', saucesCtrl.getAllProducts);


module.exports = router;