import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const conversations = mysqlTable("conversations", {
  id: serial("id").primaryKey(),
  topic: text("topic"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: int("conversation_id").notNull(),
  role: varchar("role", { length: 16 }).notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversationsRelations = relations(conversations, ({ many }) => ({
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
})); 