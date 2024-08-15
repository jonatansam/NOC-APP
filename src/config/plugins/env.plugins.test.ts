import {envs} from './env.plugins'

describe('envs.plugins.ts', () => {

    test('should be return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            PROD: false,
            MONGO_URL: 'mongodb://jonatan:123456789@localhost:27018',
            MONGO_DBNAME: 'NOC_TEST',
            MONGO_USER: 'jonatan',
            MONGO_PASS: '123456789',
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'jsambonidev2023@gmail.com',
            MAILER_SECRET_KEY: 'onoveizhvcvclvzh',
            POSTGRES_USER: 'postgres',
            POSTGRES_DB: 'NOC_TEST',
            POSTGRES_PASSWORD: '123456789'
        })
    });

    test('should return error if not found env', async () => {

        jest.resetModules();
        process.env.PORT = 'ABChdg';

        try {
            await import('./env.plugins');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    })
})