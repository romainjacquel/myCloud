const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const assert = require('assert');
const URI_DATABASE = "mongodb+srv://Romain:ralarala@mycloud-wasjy.mongodb.net/test?retryWrites=true&w=majority";
const URI_DATABASE_LOCAL = "mongodb://localhost:27017";
const client = new MongoClient(URI_DATABASE_LOCAL, {useUnifiedTopology: true});
const dbName = 'MyCloud';
const defaultPassword = bcrypt.hashSync('ralarala', 10);
const DEFAULT_USER = {
    firstName: 'Romain',
    lastName: 'JACQUEL',
    country: "France",
    email: 'r@gmail.com',
    password: defaultPassword,
};


//  If there is no user, i add one user.
function seedDB() {
    client.connect(function(err) {
        //assert.equal(null, err);
        console.log("I count user for database seeding ...");

        const db = client.db(dbName);
        const collection = db.collection('User');

        collection.countDocuments().then((count) => {
            if (!count) {
                console.log('Connexion closed');
                collection.insertOne(DEFAULT_USER);
                console.log('One user added for db seeding');
                client.close();
            } else {
                console.log('No user added !');
                client.close();
            }
        }).catch((e) => {
            throw e;
        })
    });
}

module.exports = {
    seedDB,
};
