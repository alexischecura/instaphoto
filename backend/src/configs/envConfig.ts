import { z } from 'zod';

const positiveNumbersRegex = /^\d+$/;

/**
 * Define a schema for parsing environment variables using the 'zod' library.
 * The schema specifies the expected data types and constraints for each variable.
 */
const envSchema = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z
    .string()
    .regex(positiveNumbersRegex, {
      message: 'Postgres database port must be a positive integer number',
    })
    .transform(Number),
  DATABASE_URL: z.string(),

  REDIS_PORT: z
    .string()
    .regex(positiveNumbersRegex, {
      message: 'Redis database port must be a positive integer number',
    })
    .transform(Number),
  REDIS_URL: z.string(),

  PORT: z
    .string()
    .regex(positiveNumbersRegex, {
      message: 'Port for server must be a positive integer number',
    })
    .transform(Number),

  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string().regex(positiveNumbersRegex).transform(Number),
  EMAIL_FROM: z.string(),
});

/**
 * Parse and validate environment variables using the defined schema.
 * The resulting object 'envVars' provides access to validated variables.
 */
export const envVars = envSchema.parse(process.env);
