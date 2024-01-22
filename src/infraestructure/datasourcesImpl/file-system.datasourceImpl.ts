import fs from 'fs';

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class FileSystemDatasource implements LogDataSource {

    private readonly logPath        = 'logs/';
    private readonly allLogsPath  = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath   = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();  //cuando se cree una instancia de fileDtasource llamamos al metodo de createLogsPath
    }

    private createLogsFiles = () => {
        if( !fs.existsSync( this.logPath) ) fs.mkdirSync( this.logPath );

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
          ].forEach( path => {
            if ( fs.existsSync( path ) ) return;
      
            fs.writeFileSync( path, '' );
          });

    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(newLog) }\n`;
        
        fs.appendFileSync( this.allLogsPath, logAsJson );

        if( newLog.level === LogSeverityLevel.low ) return;

        if( newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    };

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8' );
        const logs    = content.split('\n')        //pasamos por cada linea del los logs y creamos una instancia de logEntity
            .map( log => LogEntity.fromJson(log)
        );
        /**
         * forma corta de crear instancia de los logs,al recibir un solo argumento se pasa directamente 
         * a la funcion de forma explicita
         const logs= content.split('\n').map(LogEntity.fromJson);
         * 
         */

        return logs;

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch (severityLevel) {
            case LogSeverityLevel.low:               
                return this.getLogsFromFile( this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath );
            case LogSeverityLevel.high:
                    return this.getLogsFromFile( this.highLogsPath );
                default:
                throw new Error( `the level severity: ${severityLevel}, not implemented`);;
        }
    }

}