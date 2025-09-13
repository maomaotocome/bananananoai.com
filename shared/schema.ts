import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Nano Banana 3D Figurines core tables
export const figurines = pgTable("figurines", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalImageUrl: text("original_image_url").notNull(),
  generatedImageUrl: text("generated_image_url"),
  promptId: varchar("prompt_id"),
  customPrompt: text("custom_prompt"),
  status: varchar("status", { enum: ["pending", "generating", "completed", "failed"] }).default("pending").notNull(),
  metadata: jsonb("metadata"), // Store generation parameters, file sizes, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const promptPacks = pgTable("prompt_packs", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  category: varchar("category", { enum: ["pet", "couple", "anime", "office", "superhero", "general"] }).notNull(),
  description: text("description").notNull(),
  prompt: text("prompt").notNull(),
  negativePrompt: text("negative_prompt"),
  parameters: jsonb("parameters"), // guidance, seed, etc.
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const threeDModels = pgTable("3d_models", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  figurineId: varchar("figurine_id").notNull().references(() => figurines.id),
  glbUrl: text("glb_url"),
  objUrl: text("obj_url"),
  stlUrl: text("stl_url"),
  status: varchar("status", { enum: ["pending", "processing", "completed", "failed"] }).default("pending").notNull(),
  processingService: varchar("processing_service"), // triposr, meshy, tripo
  metadata: jsonb("metadata"), // vertices count, file sizes, processing time
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const printJobs = pgTable("print_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  modelId: varchar("model_id").notNull().references(() => threeDModels.id),
  material: varchar("material").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  quotedPrice: text("quoted_price"), // Store as string to handle currency
  printService: varchar("print_service"), // craftcloud, shapeways
  externalOrderId: text("external_order_id"),
  status: varchar("status", { enum: ["quoted", "ordered", "printing", "shipped", "delivered", "cancelled"] }).default("quoted").notNull(),
  customerEmail: text("customer_email"),
  shippingInfo: jsonb("shipping_info"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFigurineSchema = createInsertSchema(figurines).omit({
  id: true,
  createdAt: true,
});

export const insertPromptPackSchema = createInsertSchema(promptPacks).omit({});

export const insertThreeDModelSchema = createInsertSchema(threeDModels).omit({
  id: true,
  createdAt: true,
});

export const insertPrintJobSchema = createInsertSchema(printJobs).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFigurine = z.infer<typeof insertFigurineSchema>;
export type Figurine = typeof figurines.$inferSelect;

export type InsertPromptPack = z.infer<typeof insertPromptPackSchema>;
export type PromptPack = typeof promptPacks.$inferSelect;

export type InsertThreeDModel = z.infer<typeof insertThreeDModelSchema>;
export type ThreeDModel = typeof threeDModels.$inferSelect;

export type InsertPrintJob = z.infer<typeof insertPrintJobSchema>;
export type PrintJob = typeof printJobs.$inferSelect;
