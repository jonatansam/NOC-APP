import {CronService} from './cron-service'

describe('cron-service', () =>  {

    const mockTick = jest.fn();

    //pasamos el objeto done en el test para que espere a que sea llamado para terminarlo
    test('should a create job', (done) => {

        //creamos una tarea para que se haga un tick cada segundo
        const job = CronService.createJob('* * * * * *', mockTick);

        //creamos un settimeout para que en dos segundos se verifique cuantos tics hizo
        setTimeout(() => {

            expect(mockTick).toHaveBeenCalledTimes(2);
            job.stop();
            done();

        }, 2000);
    })
})