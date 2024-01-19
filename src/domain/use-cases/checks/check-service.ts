interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SucessCaallback = () => void;
type ErrorCalback    = ( error: string ) => void;



export class CheckService implements CheckServiceUseCase {

    //inyectamos en el constructor las dos funciones solo de lectura para no modificarlas
    constructor(
        private readonly sucessCallback: SucessCaallback,
        private readonly errorCallback : ErrorCalback
    ){}

    public async execute( url: string): Promise<boolean> {


        try {
            const request = await fetch( url );
            if( !request.ok) throw new Error(  `Error on check service ${ url }`);

            console.log( `${url} is ok` );
            this.sucessCallback();

        } catch (error) {

            console.log( `${error}` );

            this.errorCallback( `${ error }` );
            return false;
            
        }

        return true;
    }
}