declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    DATABASE_DIRECT_URL: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: number;
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_FROM: string;
    GHOST_CONTENT_API_KEY: string;
    GHOST_ADMIN_API_KEY: string;
    GHOST_API_URL: string;
    JITSU_HOST: string;
    JITSU_KEY: string;
    WEBHOOK_URL: string;
    WEBHOOK_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    PWD: string;
  }
}