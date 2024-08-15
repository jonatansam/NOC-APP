import {MongoDatabase} from '../../data/mongo/init'
import {envs} from '../../config/plugins/env.plugins';
import {MongoLogDatasource} from './mongo-log.datasourcesImpl'
import mongoose from 'mongoose';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo';
import { SeverityLevel } from '@prisma/client';

describe('mongo log datasource', () => {

    //crear conexion a la base de datos antes de todas las pruebas
    beforeAll ( async() => {

        await MongoDatabase.connect({
            dbName: envs.MONGO_DBNAME,
            mongoUrl: envs.MONGO_URL
        })
    }, 10000);

    afterEach(async() => {
        //eliminamos todo los datos de la bd despues de cada prueba
        await LogModel.deleteMany();
    })

    //cerramos la conexion de la bd despues todas cada prueba
    afterAll(async ()=> {     
        mongoose.connection.close();
    })

    const LogDataSource = new MongoLogDatasource();

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test-message', 
        origin: 'mongologdatasource.test.ts'
    });

    test('should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log');

        await LogDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("mongo log created: ",  expect.any(String));

    });

    test('should return a logs', async() => { 
        //creamos los logs en la bd parapoder validar la funcion de get logs
        await LogDataSource.saveLog(log);
        await LogDataSource.saveLog(log);
        //await LogDataSource.saveLog(log);

        const logs = await LogDataSource.getLogs(LogSeverityLevel.low);
        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.low);
    })

})