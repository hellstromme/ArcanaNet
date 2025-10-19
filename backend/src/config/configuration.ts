export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT ?? '3001', 10),
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost:5432/arcananet',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
});
