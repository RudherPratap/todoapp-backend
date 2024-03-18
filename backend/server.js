const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todo')

const server = express();
server.use(cors());
server.use(express.json());

mongoose.connect('mongodb+srv://rudrabhardwaj121201:rudr12%40dec@cluster0.ii19pvj.mongodb.net/todoApp')

server.post('/add', (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task
  }).then(result => res.json(result))
    .catch(err => res.json(err))
})

server.get('/get', (req, res) => {
  TodoModel.find().then(result => res.json(result))
    .catch(err => res.json(err))
})

server.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  // console.log(id);
  TodoModel.findByIdAndUpdate({ _id: id }, { completed: true })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

server.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

server.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  TodoModel.findByIdAndUpdate(id, { text }, { new: true }) // { new: true } returns the modified document
    .then(updatedTodo => {
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch(err => res.status(500).json({ message: err.message }));
});
server.listen(3000, () => {
  console.log("server is listening at 3000");
})

