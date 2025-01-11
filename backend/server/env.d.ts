declare namespace NodeJS {
  export interface ProcessEnv {
    ENVIRONMENT: string;
    ALLOWED_ORIGINS: string;
    SERVER_KEY: string;
    PORT: string;

    MAIL_HOST: string;
    MAIL_USER: string;
    MAIL_PASS: string;

    JWT_SECRET: string;
    TOKEN_NAME: string;

    GEMINI_API_KEY: string;

    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASSWORD: string;

    POSTGRES_HOST: string;
    POSTGRES_USER: string;
    POSTGRES_DB: string;
    POSTGRES_PASSWORD: string;
  }
}
