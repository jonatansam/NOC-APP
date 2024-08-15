import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    execute: (to: string | string[] ) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async execute (to: string | string[]) : Promise<boolean> {

        try {

            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if( !sent ) throw new Error('email log not sent');

            //si todo sale bien grabar el log de envio de correo;
            const log = new LogEntity({
                message: `Log email sent`,
                level: LogSeverityLevel.low,
                origin: 'send-email-log.uses-cases.ts'
            })
            this.logRepository.saveLog(log);
            
            return true;
        } catch (error) {

            const log = new LogEntity({
                message: `${ error instanceof Error ? error.message : error }`,
                level: LogSeverityLevel.high,
                origin: 'send-email-log.uses-cases.ts'
            })
            this.logRepository.saveLog(log);

            return false;
            
        }
    };

}