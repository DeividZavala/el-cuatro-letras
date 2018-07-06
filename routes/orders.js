const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Movie = require('../models/Movie');


// **** Create **** //

router.get('/new', (req,res) => {
    Promise.all([Movie.find(), Order.find()])
    .then(results=>{
        const ctx = {
            movies: results[0],
            orders: results[1]
        }
        res.render('orderForm', ctx);
    })
})

router.post('/new', (req, res) =>{

    req.body.total = req.body.quantity * 65;

    Order.create(req.body)
    .then( () =>{
        res.redirect('/orders/new');
    })

})


// **** Update **** //

router.get('/edit/:id', (req,res)=>{
    Order.findById(req.params.id)
    .populate('movie', "title")
    .then(order=>{
        console.log(order);
        res.render('orderEdit', order);
    })
})

router.post('/edit/:id', (req, res) => {
    Order.findOneAndUpdate(req.params.id, req.body, {new:true})
    .then( () => {
        res.redirect('/orders/new');
    })
})

module.exports = router;