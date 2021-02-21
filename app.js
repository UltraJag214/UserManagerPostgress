const express = require('express');
const app = express()
const Pool = require('pg').Pool;
const url = require('url');
require('dotenv').config();
const DBConnectionString = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

const params = url.parse(DBConnectionString);
const auth = params.auth.split(':');

if (params.hostname === 'localhost') {
    SSL = false;
} else {
    SSL = { rejectUnauthorized: false };
}

const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: SSL
}
//console.log(config);

const pool = new Pool(config);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/createNewUser', async (req, res) => {
    let sql = `insert into users (first_name, last_name, email, age) values (
        '${req.body.first_name}', 
        '${req.body.last_name}', 
        '${req.body.email}',
        ${req.body.age})`;
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
    });
    res.redirect('/user');
});

app.get('/user', (req, res) => {
    let sql = 'select * from users ';
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        // console.log(results.rows);
        res.render('user', { whatever: results.rows });
    });
});

app.get('/asc', (req, res) => {
    let sql = 'select * from users order by first_name asc';
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.render('user', { whatever: results.rows });
    });
});

app.get('/dsc', (req, res) => {
    let sql = 'select * from users order by first_name desc';
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.render('user', { whatever: results.rows });
    });
});

app.get('/edit/:namedit', (req, res) => {
    let sql = `select * from users where user_id = ${req.params.namedit}`;
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.render('edit', { myObj: results.rows[0] });
    });
});

app.post('/edit/:userID', (req, res) => {
    let sql = `update users set 
        first_name = '${req.body.first_name}', 
        last_name = '${req.body.last_name}', 
        age = ${req.body.age}, 
        email = '${req.body.email}'
        where user_id = ${req.params.userID}`;
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
    });
    res.redirect('/user');
});

app.get('/deleteUser/:userID', (req, res) => {
    let sql = `delete from users where user_id = ${req.params.userID}`;
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.redirect('/user');
    });
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.post('/searchPage', (req, res) => {
    let sql = '';
    if (req.body.first_name && !req.body.last_name) {
        sql = `select * from users where lower(first_name) like lower('%${req.body.first_name}%')`;
    } else if (req.body.last_name && !req.body.first_name) {
        sql = `select * from users where lower(last_name) like lower('%${req.body.last_name}%')`
    } else {
        sql = `select * from users where lower(first_name) like lower('%${req.body.first_name}%') and lower(last_name) like lower('%${req.body.last_name}%')`
    }
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.render('user', { whatever: results.rows });
    });
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});