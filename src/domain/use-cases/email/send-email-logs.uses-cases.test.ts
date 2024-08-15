import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import {SendEmailLogs} from './send-email-logs.uses-cases'

describe('send email usecase', () => {

    //mock paa simular un envio de email
    const emailServiceMock = {
        sendEmail: jest.fn().mockReturnValue(true),
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    };

    const mockRespository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    //creamos instancia de caso de uso de envio de email
    const sendEmailUseCase = new SendEmailLogs(
        emailServiceMock as any, 
        mockRespository
    );

    

    //antes de cada prueba limpiar los mocks ya que en el test pueden ser modificados
    beforeEach(() => {
        jest.clearAllMocks(); 
    })

    test('should call emailService and logRepository', async () => {

        

        const to = 'jonat@gmail.com';
        const sendEmail = await sendEmailUseCase.execute(to); 
        expect(sendEmail).toBe(true) 
        expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalled();
        expect(mockRespository.saveLog).toHaveBeenCalled();
        expect(mockRespository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity) );
        expect(mockRespository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            message: `Log email sent`,
            level: LogSeverityLevel.low,
            origin: 'send-email-log.uses-cases.ts'
        })

    });
 
    test('should call logRepository and emailService', async () => {
        
        //cambiamos el valor de respuesta del mock a false
        emailServiceMock.sendEmailWithFileSystemLogs.mockResolvedValue(false);
        
        const to = 'jonat@gmail.com';
        const sendEmail = await sendEmailUseCase.execute(to); 
        expect(sendEmail).toBe(false) 
        expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalled();
        expect(mockRespository.saveLog).toHaveBeenCalled();
        expect(mockRespository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity) );
        expect(mockRespository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            message: "email log not sent",
            level: LogSeverityLevel.high,
            origin: 'send-email-log.uses-cases.ts'
        })
        

    })




})