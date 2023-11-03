var express = require('express');
var router = express.Router();
require('../models/connection')
const fetch = require('node-fetch');
const User = require('../models/users');
const {checkBody} = require('../modules/checkBody');

router.post('/signup', (req, res) => {
	// Check if the user has not already been added
    
	User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } }).then(dbData => {
		/// Si l’email ou le mdp renvoyé est indéfini ou vide 
        
        if (!checkBody(req.body, ['name', 'email', 'password'])){
            res.json({ result: false, error: 'Missing or empty fields'});
        } else if (dbData === null) {
			const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            newUser.save().then((newDoc)=> res.json({result: true}))
		 } else {
                // User already exists in database
                res.json({ result: false, error: 'User already exists' });
		     }
	});
});

router.post('/signin', (req, res) => {
    User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } , password: req.body.password }).then(dbData => {
		/// Si l’email ou le mdp renvoyé est indéfini ou vide 
        if (!checkBody(req.body, [ 'email', 'password'])){
            res.json({ result: false, error: 'Missing or empty fields'});
        } else if (dbData === null) {
            
            res.json({result: false, error: 'User not found'});

		 } else {
                // User already exists in database
                res.json({ result: true });
		     }
	});
})



module.exports = router;
