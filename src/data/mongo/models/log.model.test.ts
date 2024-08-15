import {MongoDatabase} from '../init'
import { envs } from '../../../config/plugins/env.plugins'
import { LogModel } from './log.model'
import mongoose from 'mongoose'

describe('logModel.ts', () => {

    beforeAll( async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DBNAME,
        })
    }, 10000);

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should return log Model', async () => {

        const logData = {
            origin: 'log.models.test.ts',
            message: 'test-message',
            level: 'low'
        };

        const log = await LogModel.create(logData);
        //prueba la cual espera que el log sea igual a todo lo que tenga el logdata y el id cualquier string
        expect(log).toEqual( expect.objectContaining({
            ...logData,
            id: expect.any(String),
            createdAt: expect.any(Date),    
        }))

        await LogModel.findByIdAndDelete(log.id);

    });

    test('should be return the schema object', () => {

        const schema = LogModel.schema.obj;
        expect(schema).toEqual( expect.objectContaining( 
            {
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function) },
                level: {
                type: expect.any(Function),
                enum: [ 'low', 'medium', 'high' ],
                default: 'low'
                },
                createdAt: expect.any(Object)
            }
        ))
    })


})