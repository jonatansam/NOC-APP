import { Prisma, PrismaClient, SeverityLevel } from '@prisma/client';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import {PostgresLogDatasource} from './postgres-log.datasource'

describe('test in postgresLogDatasource', () => {

    //creamos el cliente de prisma para consumir la bd
    const prisma = new PrismaClient();

    //antes de todas la pruebas conectamos la bd
    beforeAll(async() => {
        await prisma.$connect();
    });
    
    //despues de cada prueba borramos el log creado
    afterEach(async () => {
        await prisma.logModel.deleteMany();
    })
    
    //despues de todas la prueba cerramos la conexion
    afterAll(async() => {
        await prisma.$disconnect();
    })

    const LogDataSource = new PostgresLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test message',
        origin: 'postgres-log.datasource.test.ts',     
    });
    const log1 = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'test message with jest',
        origin: 'postgres-log.datasource.test.ts',     
    })
 
    test('should create log a call saveLog', async() => {
        const logSpy = jest.spyOn(console, 'log');

        await LogDataSource.saveLog(log);
        //como el metodo no devuelve nada verificamos el contenido del console.log
        expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({
            newLog: expect.objectContaining({
                "createdAt": expect.any(Date),
                "id": expect.any(Number), 
                "level": "LOW", 
                "message": "test message", 
                "origin": "postgres-log.datasource.test.ts"
            })
        })); 
    });

    test('should return logs to call getlogs', async() => {
 
        
        //creamos 3 logs de prueba
        await LogDataSource.saveLog(log);
        await LogDataSource.saveLog(log1);
        await LogDataSource.saveLog(log);
        
        const logsLow = await LogDataSource.getLogs(LogSeverityLevel.low);
        const logsHigh = await LogDataSource.getLogs(LogSeverityLevel.high);
        expect(logsHigh.length).toBe(1)
        expect(logsLow.length).toBe(2);
        expect(logsLow[1].level).toBe(SeverityLevel.LOW);
    } )

})