import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {

    public static start() {
         console.log("Server started...");

         CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url: string = 'https://google.com'
                
                //inyectamos las dos dependencias, el error y el sucess callback
                new CheckService(
                    () => console.log("sucess"),
                    (error) => console.log(`Error: ${error}`),
                ).execute(url);

                //json server endpoints que se crearon de manera automatica
                // new CheckService().execute('http://localhost:3000/posts');
            }
         );

         


    };
};