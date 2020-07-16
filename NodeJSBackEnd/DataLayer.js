const { Client } = require("pg");
const fs = require('fs');
const connectionDetails = {
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: 'SuperHeroDB',
    port: 5432
};

const client = new Client(connectionDetails);

client.connect();

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

exports.SuperHeroGetAll = (from, howMuch, callback) => {
    client.query(`SELECT * FROM public."SuperHero" LIMIT $1 OFFSET $2;`,[howMuch, from], (err, res) => {
        if(!err)
        {
            const attachImagesSync = async () => {
                await asyncForEach(res.rows,async (item) => {
                    let resource = await client.query(
                        `SELECT * FROM public."ImageToHero" WHERE "idSuperHero" = $1`,
                        [item.id]);
                    item.images = resource.rows;
                });
                callback(res.rows);
            }
            attachImagesSync();
        }
        else
            callback(false);
    });
}

exports.SuperHeroGetById = (id, callback) => {
    client.query(`SELECT * FROM public."SuperHero" WHERE id = $1;`, [id], (err, res) => {
        if(!err)
            if(res.rows.length !== 0) {
                const attachImagesSync = async () => {
                    await asyncForEach(res.rows, async (item) => {
                        let resource = await client.query(
                            `SELECT * FROM public."ImageToHero" WHERE "idSuperHero" = $1`,
                            [item.id]);
                        item.images = resource.rows;
                    });
                    callback(res.rows[0]);
                }
                attachImagesSync();
            }
            else
                callback(null);
        else
            callback(false);
    });
}

exports.PhotoSuperHeroDelete = (idPhoto, callback) => {
    client.query(`SELECT * FROM public."ImageToHero" WHERE id = $1`, [idPhoto], (err, findedPhoto) => {
        if(!err)
        {
            if(findedPhoto.rows.length !== 0)
            {
                let path = findedPhoto.rows[0].pathToImage;
                client.query(`DELETE FROM public."ImageToHero" WHERE id = $1`, [idPhoto], (err, res) => {
                   if(!err)
                       callback(path);
                   else
                       callback(false);
                });
            }
            else
                callback(false);
        }
        else
            callback(false);
    })
}

exports.CountSuperHero = (callback) =>
{
    client.query(`SELECT COUNT(*) FROM public."SuperHero";`, (err, res) => {
        if(!err)
            callback(res.rows[0].count);
        else
            callback(false);
    });
}

exports.SuperHeroAddPhoto = (files, heroId, callback) =>
{
    let promises = [];
    files.map(file =>{
        promises.push(client.query(`INSERT INTO public."ImageToHero"("pathToImage", "idSuperHero") VALUES ($1, $2);`,
            ["/" + file.filename, heroId]));
    });
    Promise.all(promises).then(() => {
        callback(true);
    });
}

exports.SuperHeroDelete = (idHero, callback) =>
{
    client.query(`DELETE FROM public."SuperHero" WHERE id = $1`, [idHero], (err, result) => {
        if(!err) {
            client.query(`SELECT * FROM public."ImageToHero" WHERE "idSuperHero" = $1`, [idHero], (errPhotos, allPhotos) => {
                if(!errPhotos)
                {
                    client.query(`DELETE FROM public."ImageToHero" WHERE "idSuperHero" = $1`, [idHero]);
                    allPhotos.rows.map(photo => {
                        fs.access('img' + photo.pathToImage, fs.F_OK, (errToDelete) => {
                            if(!errToDelete) {
                                fs.unlink('img' + photo.pathToImage, () => {});
                            }
                        });
                    });
                    callback(true)
                }
                else
                    console.log(errPhotos)

            })
        }
        else
            callback(false)
    });
}

exports.SuperHeroUpdate = (heroObject, callback) =>
{
    client.query(`UPDATE public."SuperHero" 
    SET "nickName"=$2, "realName"=$3, original_description=$4, "superPowers"=$5, "catchPhrase"=$6 
    WHERE id = $1;`,
        [heroObject.id, heroObject.nickName, heroObject.realName,
            heroObject.original_description, heroObject.superPowers, heroObject.catchPhrase], (err, result) => {
            callback(!err);
        });
}

exports.SuperHeroAdd = (heroObject, callback) =>
{
    client.query(`INSERT INTO public."SuperHero"(
     "nickName", "realName", original_description, "superPowers", "catchPhrase")
    VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
        [heroObject.nickName, heroObject.realName,
            heroObject.original_description, heroObject.superPowers, heroObject.catchPhrase], (err, result) => {
        if(!err)
            callback(result.rows[0].id);
        else
            callback(false);
        });
}

//exports.SuperHeroAdd = (nickName, realName, originDescription, superpowers, catch_phrase,)
