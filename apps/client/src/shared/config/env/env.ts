import { envSchema } from './schema'

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables')
  console.error(parsedEnv.error.issues)

  throw new Error('Environment validation failed')
}

export const env = parsedEnv.data
