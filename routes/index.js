var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');


/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function(err, docs){
      var productChuncks = [];
      var chunckSize = 6;
      for( var i = 0; i < docs.length; i += chunckSize) {
          productChuncks.push(docs.slice(i, chunckSize));
      }
      res.render('shop/index', { title: 'Shopping Cart', products: productChuncks});
    });
});

router.get('/addToCart/:id', function(req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if (err) {
          return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next) {
    if (!req.session.cart) {
      return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error') [0];
    res.render('shop/checkout', {total: cart.totalPrice});
});

router.post('/checkout', function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
},  function(err, charge) {
          if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout')
          }
          req.flash('success', 'Successfully bought product!');
          req.cart = null;
          res.redirect('/success');
    });


router.get('/success', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  if (!req.session.cart) {
    return res.redirect('/checkout');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/success', {totalPrice: cart.totalPrice});
});

module.exports = router;