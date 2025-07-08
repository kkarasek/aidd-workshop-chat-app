import { eq } from "drizzle-orm";
import { useDB } from "~/server/utils/db";
import { conversations, messages } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const conversationId = Number(event.context.params?.id);

  if (!conversationId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Conversation ID is required",
    });
  }

  try {
    const db = useDB();
    await db.transaction(async (tx) => {
      await tx
        .delete(messages)
        .where(eq(messages.conversationId, conversationId));
      await tx
        .delete(conversations)
        .where(eq(conversations.id, conversationId));
    });

    return { success: true };
  } catch (error) {
    console.error(`Error deleting conversation ${conversationId}:`, error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
}); 