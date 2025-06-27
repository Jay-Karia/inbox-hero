import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("Welcome to dashboard!"));

export default app;
