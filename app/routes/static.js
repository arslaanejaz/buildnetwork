var express = require('express');
var router = express.Router();
var fs = require('fs');  


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

router.get('/loans', (req, res, next) => {
    res.render('static/loans',{
        page: 'loans'
    });
});

router.get('/xbn-white-paper', (req, res, next) => {
    var file = fs.createReadStream('./public_static/XBN-White-paper.pdf');
var stat = fs.statSync('./public_static/XBN-White-paper.pdf');
res.setHeader('Content-Length', stat.size);
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'attachment; filename=XBN White paper.pdf');
file.pipe(res);
});

module.exports = router;    