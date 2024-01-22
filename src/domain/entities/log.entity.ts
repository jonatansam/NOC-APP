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
        this.createdAt = createdAt;
        this.origin    = origin;
    };

    //metodo estatico para pasar el log de json a mi entidad de log
    static fromJson = (json: string): LogEntity => {
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
    }

}