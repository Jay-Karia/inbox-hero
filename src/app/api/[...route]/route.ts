import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import dashboard from '@/server/dashboard'
import stats from '@/server/stats'

const app = new Hono().basePath('/api')

app.route("/dashboard", dashboard);
app.route("/stats", stats)

export const GET = handle(app)
