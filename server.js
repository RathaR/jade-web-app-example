var express = require('express')
  , logger = require('morgan')
  , app = express()
  , _ = require('lodash')
  , jade = require('jade')
  , aboutTemplate = jade.compileFile(__dirname + '/source/templates/about.jade')
  , singleProductTemplate = jade.compileFile(__dirname + '/source/templates/single-product.jade')
  , allProductsTemplate = jade.compileFile(__dirname + '/source/templates/all-products.jade');


var products  = require('./data/products.json');
app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res, next) {
  try {
    var html = allProductsTemplate({ products : products });
    res.send(html)
  } catch (e) {
    next(e)
  }
});

app.get('/about', function (req, res, next) {
  try {
    var html = aboutTemplate({title: 'About'});
    res.send(html)
  } catch (e) {
    next(e)
  }
});

app.get('/product/:id', function (req, res, next) {
  try {
    var productId = req.params.id;
    var product = _.find(products, {id: +productId});
    var html = singleProductTemplate({title: productId, product: product});
    res.send(html)
  } catch (e) {
    next(e)
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
});
