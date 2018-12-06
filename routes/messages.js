var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Todo.findAll().then(queryData => {
    res.json(queryData);
  });
});

router.post('/', function(req, res, next) {
  let {value} = req.body
  models.Todo.create({
    title: value,
  }).then(function(todo) {
    res.json(todo);
  });
});

router.put('/', function(req, res, next) {
  console.log('IN PUT HANDLER')
  let {id, value} = req.body
  console.log(id, value)
  models.Todo.update(
    {title:value},
    { returning: true, where: { id } }
  ).then(queryData => {
    let updatedTodo = queryData[1]
    console.log("UPDATED TODO:", updatedTodo)
    res.json(updatedTodo)
  })
});

router.delete('/', function(req, res, next) {
  let {id} = req.body
  models.Todo.destroy({
    where: {
      id
    }
  });
  res.json({status: 'success'})
});



module.exports = router;
