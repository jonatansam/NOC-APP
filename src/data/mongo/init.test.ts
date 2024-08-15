import { error } from 'console';
import {MongoDatabase} from './init'
import { connect } from 'http2';
import mongoose from 'mongoose';

describe('mongo-db', () => {

    afterAll( () => {
        mongoose.connection.close();
    } )

    test('should connect to mongo db', async () => {
        const conect = await MongoDatabase.connect({
            dbName: process.env.MONGO_DBNAME!,
            mongoUrl: process.env.MONGO_URL!,         
        });

        expect(conect).toBe(true);
    }, 10000);

    test('should be return error, not connected to bd', async () => {
        try {
            const conect = await MongoDatabase.connect({
                dbName: process.env.MONGO_DBNAME!,
                mongoUrl: 'mongodb://jonatan:123456789@locaDBDBFHlhost:27018',         
            });
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain("Can't call `openUri()`") 
        }

    })

})