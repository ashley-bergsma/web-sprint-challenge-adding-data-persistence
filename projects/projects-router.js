const express = require('express'); 

const db = require('./projects-model'); 

const router = express.Router(); 

//* GET all projects *// [🎠 working!]
router.get('/', (req, res) => {
    db.find()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding projects" });
        });
});

//* GET project by ID *// [🎠 working!]
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    db.findById(id)
        .then(item => {
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: "Error finding project with this ID" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding projects" }); 
        });
}); 

//* GET tasks for project by ID *// [🎠 working!]
router.get('/:id/tasks', (req, res) => {
    const { id } = req.params; 
    db.findTasks(id)
        .then(items => {
            if (items.length) {
                res.status(200).json(items); 
            } else {
                res.status(404).json({ message: "No tasks for this project" }); 
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving tasks" }); 
        });
});

//TODO GET resources for project ID
//! NEED - add task to Project (POST through project ID to grab the project_id value for the task)

//* POST a new project *// [🎠 working!]
router.post('/', (req, res) => {
    const newProject = req.body; 
    db.add(newProject)
        .then(item => {
            res.status(201).json(item);
        })
        .catch(err => {
            res.status(500).json({ message: "Error adding project" }); 
        });
}); 

//* POST a new task for a project *// 
router.post('/:id/add-task', (req, res) => {
    const newTask = req.body;
    const { id } = req.params; 

    db.findById(id)
        .then(project => {
            if (project) {
                db.addTask(newTask, id)
                    .then(task => {
                        res.status(201).json(task); 
                    })
            } else {
                res.status(404).json({ message: "Error referencing project id for this task" }); 
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(500).json({ message: "Failed to add new task" }); 
        })
})

module.exports = router; 

