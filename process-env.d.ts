declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        PUBLIC_KEY: string
        PRIVATE_KEY: string
        MONGODB_URI: string
        NODE_ENV: string
    }
}