var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shop');

var products = [ 
    new Product({
        imagePath:'https://images-na.ssl-images-amazon.com/images/I/414UFCpXxAL.jpg',
        title:'UMYOGO',
        description: 'Fashion Sneakers',
        price: 50,
        color1: 'https://images-na.ssl-images-amazon.com/images/I/41WIV3zh-uL._SS36_.jpg',
        c1Description: 'red',
        color2: 'https://images-na.ssl-images-amazon.com/images/I/516SN5Tf4SL._SS36_.jpg',
        c2Description: 'black'
    }),
    new Product({
        imagePath:'https://images-na.ssl-images-amazon.com/images/I/61wiLUoH-QL._UY500_.jpg',
        title:'FUSHITON',
        description: 'Tennis Shoes',
        price: 30,
        color1: 'https://images-na.ssl-images-amazon.com/images/I/41GdPVLbX8L._SS47_.jpg',
        c1Description: 'black',
        color2: 'https://images-na.ssl-images-amazon.com/images/I/51cglkbvJPL._SS47_.jpg',
        c2Description: 'grey'
    }),
    new Product({
        imagePath:'https://www.ubuy.ma/productimg/?image=aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzcxZUxhaHIzOWVMLl9TUzQwMF8uanBn.jpg',
        title:'Ezkrwxn',
        description: 'Jogging Sneakers',
        price: 45,
        color1: 'https://images-na.ssl-images-amazon.com/images/I/41tEgjaI-QL._SS36_.jpg',
        c1Description: 'blight green',
        color2: 'https://images-na.ssl-images-amazon.com/images/I/41F9zAY%2BxtL._SS36_.jpg',
        c2Description: 'white'
    }),
    new Product({
        imagePath:'https://images-na.ssl-images-amazon.com/images/I/71RWUCU41yL._UY500_.jpg',
        title:'Kapsen Running Shoes',
        description: 'Sport Shoes for Workout Walking',
        price: 28,
        color1: 'https://images-na.ssl-images-amazon.com/images/I/415pmSFXJTL._SS36_.jpg',
        c1Description: 'black w white',
        color2: 'https://images-na.ssl-images-amazon.com/images/I/41slGA7C57L._SS36_.jpg',
        c2Description: 'white'
    }),
    new Product({
        imagePath:'https://www.ubuy.za.com/productimg/?image=aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzYxRnhUJTJCeWJsTkwuX1NTNDAwXy5qcGc.jpg',
        title:'FOVSMO',
        description: 'Casual Walking Running Shoes',
        price: 36,
        color1: 'https://images-na.ssl-images-amazon.com/images/I/51AU8MJU4VL._SS47_.jpg',
        c1Description: 'green',
        color2: 'https://images-na.ssl-images-amazon.com/images/I/51ivIU611HL._SS47_.jpg',
        c2Description: 'grey'
    }),
    new Product({
        imagePath:'https://images-na.ssl-images-amazon.com/images/I/51yook7vbLL._AC_SY400_.jpg',
        title:'BRONAX',
        description: 'Energizing Cushioning Sneakers',
        price: 44,
        color1: 'https://images-na.ssl-images-amazon.com/images/I/41TYuM4TTOL._SS36_.jpg',
        c1Description: 'black',
        color2: 'https://images-na.ssl-images-amazon.com/images/I/41e4pUjYaaL._SS36_.jpg',
        c2Description: 'white'
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