import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import dashboard from '@/server/dashboard'

const app = new Hono().basePath('/api')

app.route("/dashboard", dashboard);

export const GET = handle(app)
