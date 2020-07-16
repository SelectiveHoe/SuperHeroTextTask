const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const server = express();
const DataALayer = require('./DataLayer');

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img')
    },
    filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname )
    }
});
const upload = multer({ storage: storage }).array('file');

server.get('/CountSuperHero', (req, res) => {
    DataALayer.CountSuperHero(result => {
        res.json(result);
        res.end();
    });
});

server.get('/SuperHero/:from/:howMuch', (req, res) => {
    DataALayer.SuperHeroGetAll(req.params.from, req.params.howMuch ,(result) => {
        res.json(result);
        res.end();
    });
});

server.get('/SuperHero/:id', (req, res) => {
    DataALayer.SuperHeroGetById(req.params.id, (result) => {
        res.json(result);
        res.end();
    });
});

server.post('/SuperHero', (req, res) => {
    DataALayer.SuperHeroAdd(req.body, (newHeroId) => {
        res.json(newHeroId);
        res.end();
    });
});

server.put('/SuperHero', (req, res) => {
    DataALayer.SuperHeroUpdate(req.body, (result) => {
        res.json(result);
        res.end();
    });
});

server.post('/SuperHeroAddPhoto/:idHero', (req, res) => {
    let idHero = req.params.idHero;
    upload(req, res, (err) =>  {
        if (err instanceof multer.MulterError) {
            return res.status(501).json(err)
        } else if (err) {
            return res.status(501).json(err)
        }

        DataALayer.SuperHeroAddPhoto(req.files, idHero, (result) => {
            res.json(result);
            res.end();
        });
    });
});

server.delete('/SuperHero/:id', (req, res) => {
    DataALayer.SuperHeroDelete(req.params.id, (result) => {
        res.json(result);
        res.end();
    });
});

server.delete('/PhotoSuperHero/:idPhoto', (req, res) => {
    DataALayer.PhotoSuperHeroDelete(req.params.idPhoto, (pathToDelete) => {
        fs.access('img' + pathToDelete, fs.F_OK, (err) => {
            if(!err) {
                fs.unlink('img' + pathToDelete, (dellErr) => {
                    if (!dellErr) {
                        res.json(true);
                        res.end();
                    } else {
                        res.json(false);
                        res.end();
                    }
                });
            }
            else
            {
                res.json(false);
                res.end();
            }
        });
    });
});

server.get('/photo/:filename', (req, res) => {
    let filename = req.params.filename;
    if (fs.existsSync(`./img/${filename}`))
        fs.createReadStream(`./img/${filename}`).pipe(res);
    else
        res.status(500).send('file does not exist!`');
});

const service = server.listen(8080, () => { console.log(`app starter at: http://localhost:8080`) });