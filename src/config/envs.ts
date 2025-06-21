import z from 'zod';
import 'dotenv/config';

const envsSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  PUBLIC: z.string(),
});

export const envs = envsSchema.parse(process.env);