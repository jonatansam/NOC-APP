import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick   = () => void;


export class CronService {

    public static createJob( cronTime: CronTime, onTick: OnTick): CronJob {

        //recibimos el cronTime que es un string o fecha y el onTick que es un callBack(funcion) sin retorno de argumentos en el cronJob
        const job = new CronJob( cronTime, onTick);

        job.start();

         return job;
    }
}