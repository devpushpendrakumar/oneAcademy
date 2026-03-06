import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import rateLimit from '@fastify/rate-limit'

const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  },
})

const start = async () => {
  // ── Plugins ────────────────────────────────────
  await fastify.register(cors, {
    origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    credentials: true,
  })

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  })

  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })

  // ── Health check ───────────────────────────────
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  // ── Start server ───────────────────────────────
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 4000,
      host: '0.0.0.0',
    })
    console.log('🚀 API running on http://localhost:4000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()