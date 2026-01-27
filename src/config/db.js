

import { prisma } from "./prisma.ts";

const connectDB = async()=>{
    try {
        await prisma.$connect();
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
}
const disconnectDB = async()=>{
    try {
        await prisma.$disconnect();
        console.log("Disconnected from database successfully");
    } catch (error) {
        console.error("Error disconnecting from database:", error);
    }
}

export { prisma, connectDB, disconnectDB };