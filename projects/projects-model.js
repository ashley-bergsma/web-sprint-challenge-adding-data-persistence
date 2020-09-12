const db = require('../data/db-config'); 

module.exports = {
    find, 
    findById, 
    add, 
    findTasks
};

//* finding functions *// 

// [🎠 working!] //
function find(){
    return db('projects');
}; 

// [🎠 working!] // 
function findById(id){
    return db('projects')
        .where({ id })
        .first();
}; 

// [🎠 working!] //
function findTasks(id){
    return db('projects')
        .join('tasks', 'projects.id', 'tasks.project_id')
        .select('projects.project_name', 'tasks.task_details', 'tasks.task_notes', 'tasks.task_completed')
        .where({ project_id: id })
        .orderBy('tasks.id'); 
}; 

//* manipulating functions *// 

// [🎠 working!] // 
function add(item){
    return db('projects')
        .insert(item, 'id')
            .then(([id]) => {
                return findById(id)
            });
}; 