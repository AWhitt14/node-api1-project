const express = require('express');

const db = require('./database');

const server = express();
server.use(express.json());

server.get('/api/users',(req,res) => {
    const users = db.getUsers();
    if (users) {
    res.json(users);}
    else {
        res.status(500).json({errorMessage: "The users information could not be retrieved."});
    }
});

server.get('/api/users/:id',(req,res) => {
    const id = req.params.id;
    const user = db.getUserById(id);
    
    if (user){
    res.json(user);
    } 
    else {
        res.status(404).json({message: 'user not found'});
    }
});

server.post('/api/users', (req,res) => {
    if (req.body.name && req.body.bio) {
        db.createUser(req.body);
        res.status(201).end();
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
});

server.put('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const user = db.getUserById(id);
    if (user) {
        const updateU = db.updateUser(id, req.body);
        res.status(201).json(updateU);
    } else {
        res.status(404).json({message: 'user not found'});
    }
});

server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const user = db.getUserById(id);
    if (user) {
        db.deleteUser(id);
        res.status(204).end();
    } else {
        res.status(404).json({message: 'user not found'});
    }
});

server.listen(3000, () => {
    console.log(`Call me Usain Bolt cause I'm running`);
});