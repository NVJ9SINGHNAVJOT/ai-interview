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

    FOLDER_NAME: string;
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;

    POSTGRES_HOST: string;
    POSTGRES_USER: string;
    POSTGRES_DB: string;
    POSTGRES_PASSWORD: string;
  }
}
