const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const assert = require('assert');
// TODO Mets tes config dans un fichier annexe, pr exemple .env et tu le mets dans ton gitignore pour éviter de push des infos sensible sur github
const URI_DATABASE = "mongodb+srv://Romain:ralarala@mycloud-wasjy.mongodb.net/test?retryWrites=true&w=majority";
const URI_DATABASE_LOCAL = "mongodb://localhost:27017";
const client = new MongoClient(URI_DATABASE_LOCAL, {useUnifiedTopology: true});
const dbName = 'MyCloud';
const { seedDB } = require('./tools/seedDB');
const PORT = 3001 || 3002;

app.use(cors());
app.listen(PORT);
app.use(express.json());

console.log(`Server listen on port: ${PORT}`);
// I seed db if not users
seedDB();


// Inscription
app.post('/signup', async (req, res) => {
        try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                console.log(hashedPassword);
                const user = {email: req.body.email, password: hashedPassword};
                users.push(user);
                res.status(201).send();
        } catch {
                res.status(500).send();
        }
});

// Connexion
app.use('/login', async (req,res) => {
    client.connect(function (err) {
        const db = client.db(dbName);
        const collection = db.collection('User');
        // TODO: email must be unique, use get instead of find
        let cursor = collection.find({email: req.body.email});

        cursor.forEach(async function(user, err) {
            if (err) throw err;
            else if (user.length > 1) {
                res.send(new Error(`Something wrong, there is ${user.length} users ...`));
            } else if (user) {
                try {
                    if (await bcrypt.compare(req.body.password, user.password)) res.send(user);
                    else res.send('Passwords are not equals => Bcrypt.compare() fail');
                } catch {
                    res.status(500).send();
                }
            }
        });
    });
});