import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasourcesImpl/file-system.datasourceImpl";
import { LogRepositoryImpl } from "../infraestructure/repositoryImpl/file-system.repositoryImpl";
import { CronService } from "./cron/cron-service";
import { envs } from '../config/plugins/env.plugins'
import { EmailService } from "./email/email.service";

//inyectamos el dataSource al repositorio 
const fileSystemLogRepository = new LogRepositoryImpl(
     new FileSystemDatasource() 
);


export class Server {

    public static start() {
         console.log("Server started in port: " + envs.PORT);

         //mandar email
        const emailService = new EmailService();
        emailService.sendEmail({
            to:"jonat2014da@gmail.com",
            subject:"Hola Mundo!",
            htmlBody:`
              <h3>Logs de sistema - NOC</h3>
              <p>Este es un correo electrónico automatizado, por favor no responder</p>
              <p>Ver logs adjuntos</p>

            `
        })

        //  CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url: string = 'http://localhost:3000'
                
        //         // inyectamos las dos dependencias, el error y el sucess callback y el repositorio
        //         //los callbacks son opcionales para quitarlos hay que colocar undefined en su lugar
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`Service: ${url} is working`),
        //             (error) => console.log(`Error: ${error}`),
        //         ).execute(url);

        //         //json server endpoints que se crearon de manera automatica
        //         // new CheckService().execute('http://localhost:3000/posts');
        //     }
        //  );

         


    };
};