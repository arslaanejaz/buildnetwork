var express = require('express');
var router = express.Router();  


router.get('/white-paper', (req, res, next) => {
    res.render('static/white-paper',{
        page: 'white-paper'
    });
});

router.get('/road-map', (req, res, next) => {
    res.render('static/road-map',{
        page: 'road-map'
    });
});

router.get('/xbn-tokens', (req, res, next) => {
    res.render('static/xbn-tokens',{
        page: 'xbn-tokens'
    });
});

router.get('/faqs', (req, res, next) => {
    res.render('static/faqs',{
        page: 'faqs'
    });
});

module.exports = router;    