import { useDB } from "~/server/utils/db";
import { conversations } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const db = useDB();
    const allConversations = await db.select().from(conversations);
    return allConversations;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
}); 