import { PrismaClient, SeverityLevel } from "@prisma/client";
import { envs } from "./config/plugins/env.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

//funcion anonima autoInvocada
(async() => {
    main();
})();


async function main() {

    MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DBNAME,
    })

    Server.start();
    
}