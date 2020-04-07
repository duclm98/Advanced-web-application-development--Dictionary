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

app.get('/api/en-vi', (req, res) => {
    const enWord = req.query.word;
    try {
        const viWord = db.get('words').find({
            en: enWord
        }).value().vi;
        res.json({
            result: viWord
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

const server = app.listen(3001, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});