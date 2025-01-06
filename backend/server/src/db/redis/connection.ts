import { logger } from "@/logger/logger";
import Redis from "ioredis";

export let redisClient: Redis;

// Function to connect to Redis
export async function connectToRedis(): Promise<void> {
  try {
    redisClient = new Redis(process.env["REDIS_URL"], { password: process.env["REDIS_PASSWORD"], lazyConnect: true });

    // Test the connection
    await redisClient.connect();
    logger.info("Ping successful, Redis is ready.");
  } catch (error: any) {
    logger.error("Failed to connect to Redis", { error: error?.message || "Unknown error" });
    redisClient.disconnect();
  }
}

// Function to disconnect from Redis
export async function disconnectRedis(): Promise<void> {
  try {
    await redisClient.quit();
    logger.info("Redis connection closed.");
  } catch (error: any) {
    logger.error("Failed to disconnect from Redis", { error: error?.message || "Unknown error" });
  }
}
