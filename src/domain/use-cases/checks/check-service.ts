import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SucessCaallback = ( () => void ) | undefined;
type ErrorCalback    = ( ( error: string ) => void ) | undefined;



export class CheckService implements CheckServiceUseCase {

    //inyectamos en el constructor las dos funciones solo de lectura para no modificarlas
    constructor(
        private readonly logRepository: LogRepository,
        private readonly sucessCallback: SucessCaallback,
        private readonly errorCallback : ErrorCalback
    ){}

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
            this.logRepository.saveLog( log );  //llamamos el repositorio para guardar el log            this.sucessCallback();
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
            this.logRepository.saveLog( log );
            
            return false;
            
        }

    }
}