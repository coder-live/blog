const express = require('express');
const router = express.Router();

const article = require('./article');
const register = require('./register');
const login = require('./login');
const message = require('./message');
const comment = require('./comment');
const visitor = require('./visitor');
const upload = require('./upload');
const other = require('./other');


router.use( '/article', article );
router.use( '/register', register );
router.use( '/login', login );
router.use( '/message', message );
router.use( '/comment', comment );
router.use( '/visitor', visitor );
router.use( '/upload', upload );
router.use( '/other', other );

module.exports =  router