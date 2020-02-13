// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

//globals
const port = 5000;

//DB setup
const pool = new pg.Pool({
    database: 'music_library',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 3000
}); //end pool

//server up
app.listen(port, ()=>{
console.log('server is up on', port);
}) //end serer set up

//routes

app.delete('/songs/:id', (req, res)=>{
    console.log(' req.params.id hello from delete/id', req.params.id);
    // set up a query
    let queryString = `DELETE FROM songs WHERE "id" = ${req.params.id}`;
    // run query on pool
    pool.query(queryString).then((results) => {
        //if sucessful we'll repond with rows from the results
        res.sendStatus(200);
    }).catch((err) => {
        //catch any errors
        console.log(err);
        res.sendStatus(500);
    })
}); //end /songs GET

app.get('/songs', (req, res )=>{
    console.log('in GET /songs');
    // set up a query
    let queryString = 'SELECT * FROM songs'
    //try to run query on pool
    pool.query(queryString).then((results)=>{
    //if sucessful we'll repond with rows from the results
    res.send(results.rows);
    }).catch((err)=>{
        //catch any errors
        console.log(err);
        res.sendStatus(500);
    })
}); //end /songs GET

app.post('/songs', (req,res)=>{
    console.log('in /songs', req.body);
    let queryString = 'INSERT INTO songs ("rank", "artist", "track", "published") VALUES ($1, $2, $3, $4)';
    pool.query(queryString, [req.body.rank, req.body.artist, req.body.track, req.body.published]).then((results)=>{
        console.log('track added to db');
        res.sendStatus(201);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

