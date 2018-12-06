var express = require('express');
var router = express.Router();

/* GET home page. */
// app.get('/', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
