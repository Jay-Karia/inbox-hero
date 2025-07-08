import { Hono } from "hono";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import clerk from "@clerk/clerk-sdk-node";

const app = new Hono();

app.get("/", async (c) => {
  const req = c.req.raw as NextRequest;
  const { userId } = getAuth(req);

  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const accessToken = await clerk.users.getUserOauthAccessToken(
    userId,
    "oauth_google"
  );

  if (!accessToken) {
    return c.json({ error: "No access token found" }, 403);
  }

  // Step 1: Get message IDs
  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5",
    {
      headers: {
        Authorization: `Bearer ${accessToken[0].token}`,
      },
    }
  );

  const listData = await listRes.json();

  if (!listData.messages) {
    return c.json({ error: "No messages found" }, 404);
  }

  // Step 2: Fetch metadata for each message
  const emails = await Promise.all(
    listData.messages.map(async (msg: { id: string }) => {
      const res = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata`,
        {
          headers: {
            Authorization: `Bearer ${accessToken[0].token}`,
          },
        }
      );
      const data = await res.json();

      const headers = data.payload?.headers || []

      const getHeader = (name: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        headers.find((h: any) => h.name === name)?.value || "";

      return {
        id: msg.id,
        from: getHeader("From"),
        subject: getHeader("Subject"),
        snippet: data.snippet,
      };
    })
  );

  return c.json({
    userId,
    emails,
  });
});

export default app;
