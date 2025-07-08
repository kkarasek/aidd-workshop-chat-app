import { useDB } from "~/server/utils/db";
import { messages } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { conversationId, message } = body;

  if (!conversationId || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Conversation ID and message are required",
    });
  }

  try {
    const db = useDB();
    const newMessages = await db.transaction(async (tx) => {
      // 1. Insert the user's message
      await tx.insert(messages).values({
        conversationId,
        role: "user",
        content: message,
      });

      // 2. Insert the dummy assistant's message
      await tx.insert(messages).values({
        conversationId,
        role: "assistant",
        content: "This is a dummy response from the assistant.",
      });

      // 3. Return all messages for the conversation
      const allMessages = await tx.query.messages.findMany({
        where: (messages, { eq }) => eq(messages.conversationId, conversationId),
      });

      return allMessages;
    });

    return newMessages;
  } catch (error) {
    console.error("Error processing chat message:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
}); 