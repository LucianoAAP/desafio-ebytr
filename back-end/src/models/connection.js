const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = `mongodb://${process.env.HOST || '127.0.0.1'}:27017/Ebytr`;
const DB_NAME = 'Ebytr';

let db = null;

const connect = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
    }));

module.exports = { connect };
