import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { conversations, messages } from "./schema";

dotenv.config(); // Now loads .env by default

if (!process.env.NUXT_DATABASE_URL) {
  throw new Error("NUXT_DATABASE_URL is not set in .env");
}

const connection = mysql.createPool({
  uri: process.env.NUXT_DATABASE_URL,
});

const db = drizzle(connection);

async function main() {
  console.log("Seeding database...");

  // 1. Clear existing data
  await db.delete(messages);
  await db.delete(conversations);

  // 2. Create sample conversations
  const result = await db
    .insert(conversations)
    .values([
      { topic: "Getting Started with Nuxt" },
      { topic: "Exploring Drizzle ORM" },
      { topic: "The Future of AI" },
    ]);

  // 3. Add messages to the first conversation
  const firstConvId = result[0].insertId;
  await db.insert(messages).values([
    {
      conversationId: firstConvId,
      role: "user",
      content: "How do I set up a new Nuxt 3 project?",
    },
    {
      conversationId: firstConvId,
      role: "assistant",
      content: "You can start by running `npx nuxi@latest init <project-name>`.",
    },
    {
      conversationId: firstConvId,
      role: "user",
      content: "Great, thanks! What about adding TypeScript?",
    },
    {
      conversationId: firstConvId,
      role: "assistant",
      content:
        "Nuxt has first-class TypeScript support. It's configured automatically when you start a new project!",
    },
  ]);

  console.log("Database seeded successfully!");
  await connection.end();
}

main().catch((err) => {
  console.error("Error during seeding:", err);
  process.exit(1);
}); 