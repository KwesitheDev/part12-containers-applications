const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/:id', async (req, res) => {
  try{
    const todo = await Todo.findById(req.params.id)
    if (todo) {
      res.send(todo)
    } else {
      res.sendStatus(404).json({ error: 'Todo not found' })
    }
  }catch(err){
    res.sendStatus(400).json({ error: 'Malformatted id' })
  }
});

/* PUT todo. */
singleRouter.put('/:id', async (req, res) => {
  const {text, done} = req.body
  try{
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text, done },
      { new: true, runValidators: true }
    )
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    res.json(updatedTodo)
  }catch(err){
    console.log(err)
    res.status(400).json({ error: 'Malformatted id or Invalid data' })
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
