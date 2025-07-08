import { eq } from "drizzle-orm";
import { useDB } from "~/server/utils/db";
import { conversations } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const conversationId = Number(event.context.params?.id);
  const body = await readBody(event);
  const topic = body.topic;

  if (!conversationId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Conversation ID is required",
    });
  }

  if (typeof topic !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Topic must be a string",
    });
  }

  try {
    const db = useDB();
    await db
      .update(conversations)
      .set({ topic })
      .where(eq(conversations.id, conversationId));

    return { success: true };
  } catch (error) {
    console.error(`Error updating conversation ${conversationId}:`, error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
}); 