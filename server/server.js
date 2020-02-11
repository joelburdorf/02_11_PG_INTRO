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