import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service'

describe('checkService UseCase', () => {

    const mockRespository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const succesCalback = jest.fn();
    const errorCallback = jest.fn();
    
    const checkService = new CheckService(
        mockRespository,
        succesCalback,
        errorCallback 
    );

    //antes de cada prueba limpiar los mocks ya que en el test pueden ser modificados
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call succesCalback when fecth return true', async () => {
        //prueba del bloque en el que todo sale bien
        const wasOk = await checkService.execute('https://google.com');
        expect(wasOk).toBe(true);
        expect(succesCalback).toHaveBeenCalled();  //esperamos que el succesCalb sea haya llamado en el servicio
        expect(errorCallback).not.toHaveBeenCalled();  //esperamos que el error calback no haya sido llamdo

        expect(mockRespository.saveLog).toHaveBeenCalledWith(
            expect.any( LogEntity )
        )

    }, 10000 );

    test('should call succesCalback when fecth return true', async () => {
        //prueba del bloque en el que todo sale mal
        const wasOk = await checkService.execute('https://jhdbdbddgoogle.com');
        expect(wasOk).toBe(false);
        expect(succesCalback).not.toHaveBeenCalled();  //esperamos que el succesCalb sea haya llamado en el servicio
        expect(errorCallback).toHaveBeenCalled();  //esperamos que el error calback no haya sido llamdo

        expect(mockRespository.saveLog).toHaveBeenCalledWith(
            expect.any( LogEntity )
        )

    }, 10000)

})