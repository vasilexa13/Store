import { MongoClient, Db } from 'mongodb';

const URL = 'mongodb://localhost:27017/store';

let dbConnection: Db | null = null;

export const connectToDb = (cb: (err?: Error) => void) => {
    MongoClient.connect(URL)
        .then((client) => {
            console.log("Connected to MongoDB");
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.error(`Error connecting to MongoDB ${err}` );
            return cb(err);
        });
};

export const getDb = (): Db | null => dbConnection;