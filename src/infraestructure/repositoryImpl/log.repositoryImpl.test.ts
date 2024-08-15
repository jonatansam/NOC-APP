import { SeverityLevel } from '@prisma/client';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import {LogRepositoryImpl} from './log.repositoryImpl';

describe('log.repositoryImpl', () => {

    const mockDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const mockRepository = new LogRepositoryImpl(mockDatasource);

    //antes de todas las pruebas limpiamos todos los mocks
    beforeEach(()=> {
        jest.clearAllMocks();
    })

    test('save log should call the datasource with arguments', () => {

        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: "test message from impl repository",
            origin: 'log.repository.impl'
        });
        mockRepository.saveLog(log);
        expect(mockDatasource.saveLog).toHaveBeenCalledWith(log);
    });

    test('get logs should call the datasource with arguments', () => {
        mockRepository.getLogs(LogSeverityLevel.low);
        expect(mockDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
    })

})