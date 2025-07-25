import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { dashboard, stats, session, emails } from '@/server';

const app = new Hono().basePath('/api')

app.route("/dashboard", dashboard);
app.route("/stats", stats)
app.route("/session", session);
app.route("/emails", emails);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
