const db = require('../data/db-config'); 

module.exports = {
    find, 
    findById, 
    add,  
    remove
};

//* finding functions *// 

// [🎠 working!] //
function find(){
    return db('tasks');
}; 

// [🎠 working!] // 
function findById(id){
    return db('tasks')
        .where({ id })
        .first();
}; 

//* manipulating functions *// 

// [🎠 working!] // 
function add(item){
    return db('tasks')
        .insert(item, 'id')
            .then(([id]) => {
                return findById(id)
            });
}; 

// [🎠 working!] //
function remove(id){
    return db('tasks')
        .where({ id })
        .del();
}; 

//TODO The tasks should have had a number category (step_number?) to record what step in the project they were, for ordering purposes on return, add this column to the table 