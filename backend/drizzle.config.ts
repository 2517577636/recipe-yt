import { defineConfig } from 'drizzle-kit';
import { ENV } from './src/config/env';

export default defineConfig({
  out: './src/db',
  schema: './src/db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: ENV.DATABASE_URL as string,
  },
});