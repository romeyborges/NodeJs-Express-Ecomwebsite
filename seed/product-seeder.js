var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopDB');

var products = [ 
    new Product({
        imagePath:'https://cdn.cinematerial.com/p/297x/pebhweta/x-men-dark-phoenix-movie-poster-md.jpg',
        title:'X-MEN Dark Phoneix',
        description: 'Awesome movie',
        price: 7
    }),
    new Product({
        imagePath:'https://cdn.cinematerial.com/p/297x/c4h7kwe1/spider-man-far-from-home-movie-poster-md.jpg?v=1567064685',
        title:'Spider man Far from Home',
        description: 'R U kidding me! Its the craziest!',
        price: 10
    }),
    new Product({
        imagePath:'https://cdn.cinematerial.com/p/297x/vbfr26yz/aladdin-movie-poster-md.jpg?v=1552401018',
        title:'Aladdin',
        description: 'Cool!',
        price: 9
    }),
    new Product({
        imagePath:'https://images-na.ssl-images-amazon.com/images/I/71niXI3lxlL._SY606_.jpg',
        title:'Avengers End Game',
        description: 'Best on earth!!',
        price: 11
    }),
    new Product({
        imagePath:'https://cdn.cinematerial.com/p/297x/2j49f2xd/rocketman-movie-poster-md.jpg?v=1556895467',
        title:'Rocket Man',
        description: 'Could have been better',
        price: 6
    }),
    new Product({
        imagePath:'https://cdn.collider.com/wp-content/uploads/2018/12/sonic-the-hedgehog-movie-poster.jpg',
        title:'Sonic The Hedgehog',
        description: 'Great Animation!',
        price: 4
    })
];

var done = 0;

for(var i = 0; i < products.length; i++)  {
    products[i].save(function(err, result){
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}