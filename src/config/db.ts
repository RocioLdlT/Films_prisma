
import { env } from "./env.ts";
import debug from 'debug';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../../generated/prisma/client.ts';

const log = debug(`${env.PROJECT_NAME}:configDB`);
log("Loaded database connection...");

export const connectDB = async () => {
    // const pool = new Pool({
    //     user: env.PGUSER,
    //     password: env.PGPASSWORD,
    //     host: env.PGHOST,
    //     port: env.PGPORT,
    //     database: env.PGDATABASE

    const adapter = new PrismaPg({
        user: env.PGUSER,
        password: env.PGPASSWORD,
        host: env.PGHOST,
        port: env.PGPORT,
        database: env.PGDATABASE
    });

    const prisma = new PrismaClient({
        adapter
    })
    // Para probar la conexión
    try {
        await prisma.$connect();
        // Constante para opciones de DB con prisma en vez de con pool
        const [info] = (await prisma.$queryRaw`SELECT current_database()`) as {
        current_database: string;
    }[];
        log("Database connection established successfully.");
        log("Connected to database:", info?.current_database); //traemos la const info para que veamos las options.database
        prisma.$disconnect();
    } catch (error) {
        log("Error connecting to the database:", error);
        throw error;
    }
    return prisma;
}
