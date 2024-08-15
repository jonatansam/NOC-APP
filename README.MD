# proyecto NOC

** Aplicacion de monitoreo en el cual vamos a implementar la arquitectura limpia

# dev 
1. Clonar el archivoenv.template a env y quitar comentarios del server.ts.
2. Configurar las variables de entorno y poner los datos respectivos. 
```
    PORT=3000

    MAILER_SERVICE=gmail
    MAILER_EMAIL=correo
    MAILER_SECRET_KEY=clave secreta de correo

    PROD=false

    MONGO_URL=mongodb://pablo:123456@localhost:27018
    MONGO_DBNAME=NOC
    MONGO_USER=pablo
    MONGO_PASS=123456

    POSTGRES_URL="postgresql://postgres:123456@localhost:5433/NOC"
    POSTGRES_USER=postgres
    POSTGRES_DB=NOC
    POSTGRES_PASSWORD=123456
```
3. ejecutar el comando de "npm i" para reconstruir el proyecto
4. ```docker compose up -d``` para levantar las bases de datos con docker
4. ejecutar el comando `npx prisma migrate` para crear cliente de prisma para bd postgres
5. ejecutar el proyecto en modo desrrollo con el comando ```npm run dev```

# test '' en caso de realizar el testing hacer ''

!! no ejecutar el paso 4 de los comandos anteriores 

4. ejecutar el comando 
```dotenv -e .env.test -- npx prisma migrate deploy``` 
tomando las variable de entorno de testing 

5. ```npm run test:watch``` para ejecutar el testin y levantar las bases de datos en docker

!! el fileSystemDatasource.test.ts la prueba funcionan pero hay un problema con el file system por eso estan comentadas

# cuando termine de revisar el testing bajar los contenedores de docker con el 
``docker compose down --volumes``
y eliminar los volumenes con el docker volume prune -a 
