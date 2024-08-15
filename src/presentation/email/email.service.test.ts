import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';


describe('email.service.ts', () => { 

    const mockSendMail = jest.fn();
    //creamos un mock al create transport y devolvemos el metodo sendMail
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    const emailService = new EmailService();

    test('should send email', async () => {

        const options: SendMailOptions = {
            to: 'jonat2014da@gmail.com',
            subject: 'test',
            htmlBody: '<h1>test</h1>'
        };

        await emailService.sendEmail(options);
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array), 
            html: "<h1>test</h1>", 
            subject: "test", 
            to: "jonat2014da@gmail.com"
        }); 
    });

    test('should send email with attachments', async () => {

        await emailService.sendEmailWithFileSystemLogs("jonatan@gmail.com");
        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": expect.arrayContaining([
                { filename: "logs-all.log", path: "./logs/logs-all.log" },
                { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
                { filename: "logs-high.log", path: "./logs/logs-high.log" },
            ]), 
            "html": expect.any(String), 
            "subject": "Logs del servidor", 
            "to": "jonatan@gmail.com"}); 

    })

})