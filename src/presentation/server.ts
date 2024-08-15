import { FileSystemDatasource } from "../infraestructure/datasourcesImpl/file-system.datasourceImpl";
import { LogRepositoryImpl } from "../infraestructure/repositoryImpl/log.repositoryImpl";
import { CronService } from "./cron/cron-service";
import { envs } from '../config/plugins/env.plugins'
import { EmailService } from "./email/email.service";
import { MongoLogDatasource } from "../infraestructure/datasourcesImpl/mongo-log.datasourcesImpl";
import { PostgresLogDatasource } from "../infraestructure/datasourcesImpl/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

//inyectamos el dataSource al repositorio 
const fsLogRepository = new LogRepositoryImpl(
     new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {
    

    public static async start() {
         console.log("Server started in port: " + envs.PORT + "..");

        //  //todo: Mandar email
        // new SendEmailLogs( emailService, fileSystemLogRepository ).execute(
        //     ['jonat2014da@gmail.com']
        // )

        // const logs: LogEntity[] = await fsLogRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs)

        // CronService.createJob(dotenv -e .env.sample -- npx prisma migrate deploy
        //     '*/5 * * * * *',
        //     () => {
        //         const url: string = 'https://kfbfhfydgoogle.com'
                
        //         // inyectamos las dos dependencias, el error y el sucess callback y el repositorio
        //         //los callbacks son opcionales para quitarlos hay que colocar undefined en su lugar
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`Service: ${url} is working`),
        //             (error) => console.log(`Error: ${error}`),
        //         ).execute(url);
        //     }
        // );

    };
};