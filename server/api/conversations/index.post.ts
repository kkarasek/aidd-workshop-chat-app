import { eq } from "drizzle-orm";
import { useDB } from "~/server/utils/db";
import { conversations } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const db = useDB();
    const result = await db.insert(conversations).values({});

    const insertId = result[0].insertId;

    const [newConversation] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, insertId));

    return newConversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
}); 