const express = require('express'); 

const db = require('./tasks-model'); 
const tasksModel = require('./tasks-model');

const router = express.Router(); 

//* GET all tasks *// [🎠 working!]
router.get('/', (req, res) => {
    db.find()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding tasks" });
        });
});

//* GET task by ID *// [🎠 working!]
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    db.findById(id)
        .then(item => {
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: "Error finding task with this ID" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding tasks" }); 
        });
}); 

//* DELETE a task *// [🎠 working!]
router.delete('/:id', (req, res) => {
    const { id } = req.params; 
    db.remove(id)
        .then(count => {
            if (count) {
                res.status(200).json({ removed: count});
            } else {
                res.status(404).json({ message: "Task could not be removed" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error removing task" }); 
        });
}); 

//! Need: PUT to update a task 

module.exports = router; 

