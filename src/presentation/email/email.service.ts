import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string,
    path    : string,
}

export class EmailService {

    constructor(){}
 
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }           
    });


    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        try {

            const { to, subject, htmlBody, attachments = [] } = options;

            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

            return true;

        } catch (error) {

             return false;
        }
    };

    async sendEmailWithFileSystemLogs( to: string | string[]) {

        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Este es un correo electrónico automatizado, por favor no responder</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            { filename: "logs-all.log", path: "./logs/logs-all.log" },
            { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
            { filename: "logs-high.log", path: "./logs/logs-high.log" },

        ]

        return this.sendEmail({
            to, subject, htmlBody, attachments
        });

    }


}