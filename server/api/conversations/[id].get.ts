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
    const [conversation] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, conversationId));

    if (!conversation) {
      throw createError({
        statusCode: 404,
        statusMessage: "Conversation not found",
      });
    }

    const conversationMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId));

    return { ...conversation, messages: conversationMessages };
  } catch (error) {
    console.error(`Error fetching conversation ${conversationId}:`, error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
}); 