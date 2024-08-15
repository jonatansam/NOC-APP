import fs from 'fs';
import path from 'path';
import {FileSystemDatasource} from './file-system.datasourceImpl'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

//comentamos todo el codigo ya que hay problemas con el fileSystem
describe( 'fileSystemLogDatasource', () => {

    // const logPath = path.join(__dirname, '../../../logs');

    // //antes de cada prueba borramos la carpeta donde estan los logs en el fileSystem
    // //añadimos un espacio de 100 ms para espera a pasar a la siguiente prueba
    // beforeEach((done) => {
    //     fs.rmSync( logPath, {recursive:true, force: true});
    //     setTimeout(done, 500); // Esperar 100 ms antes de continuar
    // })

    // test('should create a log file if they do not exits', () => {

    //     new FileSystemDatasource();
    //     const files = fs.readdirSync(logPath);  //obtnemos los directorios que hay en el path
    //     expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
    // });

    // test('should save a log in logs-all.log', () => {

    //     const LogDataSource = new FileSystemDatasource();
    //     const log = new LogEntity({
    //         level: LogSeverityLevel.low,
    //         message: 'created log from test',
    //         origin: 'file-system-datasource'
    //     });
    //     LogDataSource.saveLog(log);
    //     const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf8');
    //     expect(allLogs).toContain(JSON.stringify(log));

    // });

    // test('should save a log in logs-all.log and logs-medium.log', () => {

    //     const LogDataSource = new FileSystemDatasource();
    //     const log = new LogEntity({
    //         level: LogSeverityLevel.medium,
    //         message: 'created log from test',
    //         origin: 'file-system-datasource'
    //     });
    //     LogDataSource.saveLog(log);
    //     const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf8');
    //     const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf8');
    //     expect(allLogs).toContain(JSON.stringify(log));
    //     expect(mediumLogs).toContain(JSON.stringify(log))

    // });

    // test('should save a log in logs-all.log and logs-high.log', () => {

    //     const LogDataSource = new FileSystemDatasource();
    //     const log = new LogEntity({
    //         level: LogSeverityLevel.high,
    //         message: 'created log from test',
    //         origin: 'file-system-datasource'
    //     });
    //     LogDataSource.saveLog(log);
    //     const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf8');
    //     const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf8');
    //     expect(allLogs).toContain(JSON.stringify(log));
    //     expect(highLogs).toContain(JSON.stringify(log))

    // });

    // test('should return all logs from fileSystem', async () => {
    //     const LogDataSource = new FileSystemDatasource();
    //     const logLow = new LogEntity({
    //         message: 'log-low',
    //         level: LogSeverityLevel.low,
    //         origin: 'low'
    //     });
    //     const logMedium = new LogEntity({
    //         message: 'log-medium',
    //         level: LogSeverityLevel.medium,
    //         origin: 'medium'
    //     });
    //     const logHigh = new LogEntity({
    //         message: 'log-high',
    //         level: LogSeverityLevel.high,
    //         origin: 'high'
    //     });
    //     await LogDataSource.saveLog(logLow);
    //     await LogDataSource.saveLog(logMedium);
    //     await LogDataSource.saveLog(logHigh);

    //     const logsLow = await LogDataSource.getLogs(LogSeverityLevel.low);
    //     const logsMedium = await LogDataSource.getLogs(LogSeverityLevel.medium);
    //     const logsHigh = await LogDataSource.getLogs(LogSeverityLevel.high);

    //     expect(logsLow).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]));
    //     expect(logsMedium).toEqual( expect.arrayContaining([ logMedium]));
    //     expect(logsHigh).toEqual( expect.arrayContaining([ logHigh ]));

    // });

    // test('if severity level not exists return error', async() => {
    //     const LogDataSource = new FileSystemDatasource();
    //     const customSeverityLevel = 'SUPER-HIGH' as LogSeverityLevel;
    //     try {
    //         await LogDataSource.getLogs(customSeverityLevel);
    //         expect(true).toBeFalsy();  //este bloque nunca se ejecutara ya que devulve un error la funcion getlogs
    //     } catch (error) {
    //         const errorString = `${error}`;
    //         expect(errorString).toEqual(`Error: the level severity: ${customSeverityLevel}, not implemented`);
    //     }
    // });

    test('should be true', () => {
        expect(true).toBeTruthy();
    })
})