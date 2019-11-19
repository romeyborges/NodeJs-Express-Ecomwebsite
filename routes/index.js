var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var csrf = require('csurf');
var Product = require('../models/product');
var Order = require('../models/order');

var csrfProtection = csrf();
router.use(csrfProtection);

//gets home page
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
    Product.find(function(err, docs){
      var productChuncks = [];
      var chunckSize = 6;
      for( var i = 0; i < docs.length; i += chunckSize) {
          productChuncks.push(docs.slice(i, chunckSize));
      }
      res.render('shop/index', { title: 'Shopping Cart', products: productChuncks, successMsg: successMsg, noMessages: !successMsg});
    });
});

//adding items to cart
router.get('/addToCart/:id', function(req, res, next) {
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

//removes one items on cart 
router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

//removes all items on cart
router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

//gets shopping cart page
router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

//gets checkout page
router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
      return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error') [0];
    res.render('shop/checkout', {products: cart.generateArray(), total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

//verifies checkout submission and redirects to home page
router.post('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
      return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")("sk_test_4lyXGXTQg0UKiqMFlSeQL17I00MCVCFjjV");

  stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: "usd",
      source: req.body.stripeToken, // obtained with Stripe.js
      description: "Test Charge"
  }, function(err, charge) {
      if (err) {
          req.flash('error', err.message);
          return res.redirect('/checkout');
      }
      var order = new Order({
          user: req.user,
          cart: cart,
          paymentId: charge.id
      });
      order.save(function(err, result) {
          req.flash('success', 'Successfully bought product!');
          req.session.cart = null;
          res.redirect('/');
      });
  }); 
});

router.get('/cod',function(req, res, next) {
    res.render('shop/cod', {csrfToken: req.csrfToken()});
});

router.post('/cod', function(req, res, next) {
    res.redirect('/')
  });


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  req.session.oldUrl= req.url;
  res.redirect('/user/signin');
}




































//This is an e-commerce website created by Romanus Njogu Borges --- @romeyborges. 