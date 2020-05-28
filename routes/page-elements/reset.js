const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const mysql = require('mysql2');

const config = require('../connection');
const log = console.log;
let resultCode = 1;
let codeForReser = []

let resetValueObj = {
    code: 0,
    email: ''
}

router.use(bodyParser.json());

class Database {

    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query = (sql, args) => {
        return new Promise((resolve, reject) => {
            this.connection.query( sql, args, (err, results) => {
                if (err)
                    return reject(err);
                    resolve(results);
            });
        });
    }

    close = () => {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                    resolve();
            });
        });
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

router.post('/password/reset', async (req, res, next) => {
    let data = req.body;
    
    let checkCode = randomInteger(111111, 999999)

    let transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sportscardchat.com@gmail.com',
            pass: 'Chickenfootsoup#121!'
        }
    });

    // Step 2
    let mailOptions = {
        from: 'sportscardchat.com@gmail.com',
        to: `${data.data}`,
        subject: 'Password reset',
        text: `${checkCode}`,
        html: `<div>
                    <h3>Hello, ${data.data}</h3>
                    <div>Today you try to reset your password!
                        If you still want to change you password use this <a href=${`https://sportscardchat.com/#/password/change/${checkCode}`}>
                            link
                        </a>
                    </div>
                    <div>If you don't try to reset your password <strong>ignore this message</strong></div>
                </div>`,
    };

    resetValueObj.email = data.data
    resetValueObj.code = checkCode

    // Step 3
    await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs');
        }
        else {
            codeForReser.push(resetValueObj)
            log(checkCode)
            return res.json({checkCode});
        }
    });
})

router.post('/password/code/check', (req, res, next) => {
    let data = req.body;
    const DB = new Database(config)

    codeForReser.map(e => {

        if(data.data.code == e.code) {
            bcrypt.hash(data.data.password, saltRounds, function(err, hash) {
                if (err) {
                    resultCode = 1;
                    return res.status(500).json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
                    return DB.close();
                }
                else {
                    DB.query(`UPDATE user SET password = '${hash}' WHERE email='${e.email}'`)
                    .then(results => {
                        resultCode = 0
                        res.json(resultCode)
                        return DB.close();
                    })
                }
            })
        }
        else {
            return res.status(404).json({error: `This is undefined code...`})
        }
    })
})

module.exports = router