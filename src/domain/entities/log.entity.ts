import { json } from "stream/consumers";

export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high',
}

export interface LogEntityOptions {
    
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {

    public level: LogSeverityLevel;  // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ){

        const { level, message, origin, createdAt = new Date} = options;
        this.message   = message;
        this.level     = level;
        this.createdAt = new Date( createdAt ); 
        this.origin    = origin;
    };

    //metodo estatico para pasar el log de json a mi entidad de log
    static fromJson = (json: string): LogEntity => {
        json = (json === '')? '{}': json;

        const {message, level, createdAt, origin } = JSON.parse(json);
        if( !message ) throw new Error("Message is required");
        if( !level ) throw new Error("level is required");

        const log = new LogEntity({
            message, 
            level,
            createdAt,
            origin : origin
        });  //creamos la instancia del log para devolverlo 

        return log;
    };

    static fromObject = ( object: { [key: string]:any }) : LogEntity => {
        
        const { message, level, createdAt, origin } = object;
        if(!message) throw new Error('falta el mensaje para poder crear el log');
        const log = new LogEntity({level, message, origin, createdAt});
        return log;
    }

}