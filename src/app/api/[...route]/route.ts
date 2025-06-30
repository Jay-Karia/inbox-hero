import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { dashboard, stats, session } from '@/server';

const app = new Hono().basePath('/api')

app.route("/dashboard", dashboard);
app.route("/stats", stats)
app.route("/session", session);

export const GET = handle(app)
