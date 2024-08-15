import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

//creamos el cliente prisma pra consumir la base de datos
const prisma = new PrismaClient();

const severityEnum = {
    low:    SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high:   SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        const newLog = await prisma.logModel.create({
            data: {
                level: level,
                message: log.message,
                origin: log.origin,         
            }
        });
        console.log({newLog});
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const logs = await prisma.logModel.findMany({
            where: {
                level: level
            }
        });
        return logs.map( (log) => LogEntity.fromObject(log));
    }

}