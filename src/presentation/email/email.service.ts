import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';

interface SendMailOptions {
    to: string,
    subject: string,
    htmlBody: string
    // todo: attachements: string
}

export class EmailService {
 
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }           
    });


    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        try {

            const { to, subject, htmlBody } = options;
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody
            });

            console.log( sendInformation );
            

            return true;

        } catch (error) {

             return false;
        }
    }

}