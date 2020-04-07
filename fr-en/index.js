const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = lowdb(adapter);

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser());

app.get('/api/fr-en', (req, res) => {
    const frWord = req.query.word.trim();
    try {
        const enWord = db.get('words').find({
            fr: frWord
        }).value().en;
        res.json({
            result: enWord
        });
    } catch {
        res.status(204).end();
    }
});

app.use((req, res, next) => {
    res.status(404).send('NOT FOUND');
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('View error log on console.');
});

const server = app.listen(3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});