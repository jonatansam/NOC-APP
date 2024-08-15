import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SucessCaallback = ( () => void ) | undefined;
type ErrorCalback    = ( ( error: string ) => void ) | undefined;



export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    //inyectamos en el constructor las dos funciones solo de lectura para no modificarlas
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly sucessCallback: SucessCaallback,
        private readonly errorCallback : ErrorCalback
    ){}

    private callRepository(log: LogEntity) {
        this.logRepository.forEach( (logRepository ) => {
            logRepository.saveLog(log);
        })
    }

    public async execute( url: string): Promise<boolean> {

        const origin = 'check-service.ts';

        try {
            const request = await fetch( url );
            if( !request.ok) throw new Error(  `Error on check service ${ url }`);

            const log = new LogEntity({
                message: `Service ${ url } working`, 
                level: LogSeverityLevel.low,
                origin
            });
            this.callRepository(log);  //llamamos los repositorios para guardar el log en diferentes bd 
            this.sucessCallback && this.sucessCallback();   //si succes calback existe llamalo
            return true;

        } catch (error) {

            let errorMessage = `this service is down: ${url}`;
            if(error instanceof Error) errorMessage= `the service ${url}, isn't working, ${ error.message }`;
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin
            });
            this.errorCallback && this.errorCallback( errorMessage );   //si error calback existe llamalo
            this.callRepository(log);
            
            return false;
            
        }

    }
}