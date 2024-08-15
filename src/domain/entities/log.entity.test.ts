import { now } from "mongoose";
import { LogEntity, LogSeverityLevel } from "./log.entity"


describe('log.entity.ts', () => {

    const dataObj = {
        message: 'hola mundo',
        level: LogSeverityLevel.low,
        origin: 'log.entity.test.ts'
    }

    test('should create a Log entity instance', () => {


        const log = new LogEntity(dataObj);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe( dataObj.message);
        expect(log.origin).toBe( dataObj.origin);
        expect(log.level).toBe( dataObj.level);
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test('should create a LogEntity instance from json', () => {

        const json = `{"message":"the service https://kfbfhfydgoogle.com, isn't working, fetch failed","level":"high","createdAt":"2024-08-13T20:41:35.188Z","origin":"check-service.ts"}`;
        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe( "the service https://kfbfhfydgoogle.com, isn't working, fetch failed" );
        expect(log.origin).toBe( "check-service.ts" );
        expect(log.level).toBe( LogSeverityLevel.high );
        expect(log.createdAt).toBeInstanceOf(Date);

    });
 
    test('should create a LogEntity instance from object', () => {


        const log = LogEntity.fromObject(dataObj);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe( dataObj.message );
        expect(log.origin).toBe( dataObj.origin );
        expect(log.level).toBe( dataObj.level );
        expect(log.createdAt).toBeInstanceOf(Date);

    })

})