import { 
  type User, type InsertUser,
  type Figurine, type InsertFigurine,
  type PromptPack, type InsertPromptPack,
  type ThreeDModel, type InsertThreeDModel,
  type PrintJob, type InsertPrintJob,
  type GenerationTask, type InsertGenerationTask,
  type GeneratedResult, type InsertGeneratedResult,
  type UsageLedger, type InsertUsageLedger,
  type TaskOutbox, type InsertTaskOutbox
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, figurines, promptPacks, threeDModels, printJobs, generationTasks, generatedResults, usageLedger, taskOutbox } from "@shared/schema";
import { eq, desc, and, sql, lt } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Figurine operations
  getFigurine(id: string): Promise<Figurine | undefined>;
  getAllFigurines(): Promise<Figurine[]>;
  createFigurine(figurine: InsertFigurine): Promise<Figurine>;
  updateFigurine(id: string, figurine: Partial<Figurine>): Promise<Figurine>;
  deleteFigurine(id: string): Promise<void>;
  
  // Prompt Pack operations
  getPromptPack(id: string): Promise<PromptPack | undefined>;
  getAllPromptPacks(): Promise<PromptPack[]>;
  getActivePromptPacks(): Promise<PromptPack[]>;
  createPromptPack(promptPack: InsertPromptPack): Promise<PromptPack>;
  updatePromptPack(id: string, promptPack: Partial<PromptPack>): Promise<PromptPack>;
  deletePromptPack(id: string): Promise<void>;
  
  // 3D Model operations
  getThreeDModel(id: string): Promise<ThreeDModel | undefined>;
  getThreeDModelsByFigurine(figurineId: string): Promise<ThreeDModel[]>;
  createThreeDModel(model: InsertThreeDModel): Promise<ThreeDModel>;
  updateThreeDModel(id: string, model: Partial<ThreeDModel>): Promise<ThreeDModel>;
  deleteThreeDModel(id: string): Promise<void>;
  
  // Print Job operations
  getPrintJob(id: string): Promise<PrintJob | undefined>;
  getPrintJobsByModel(modelId: string): Promise<PrintJob[]>;
  createPrintJob(printJob: InsertPrintJob): Promise<PrintJob>;
  updatePrintJob(id: string, printJob: Partial<PrintJob>): Promise<PrintJob>;
  deletePrintJob(id: string): Promise<void>;
  
  // Generation Task operations
  getGenerationTask(id: string): Promise<GenerationTask | undefined>;
  getGenerationTaskByTaskId(taskId: string): Promise<GenerationTask | undefined>;
  getAllGenerationTasks(): Promise<GenerationTask[]>;
  createGenerationTask(task: InsertGenerationTask): Promise<GenerationTask>;
  updateGenerationTask(id: string, task: Partial<GenerationTask>): Promise<GenerationTask>;
  deleteGenerationTask(id: string): Promise<void>;
  
  // Generated Result operations (UGC Gallery)
  getGeneratedResult(id: string): Promise<GeneratedResult | undefined>;
  getAllGeneratedResults(): Promise<GeneratedResult[]>;
  getPublicGeneratedResults(limit?: number, offset?: number): Promise<GeneratedResult[]>;
  getFeaturedGeneratedResults(limit?: number, offset?: number): Promise<GeneratedResult[]>;
  getGeneratedResultsByCategory(category: string, limit?: number, offset?: number): Promise<GeneratedResult[]>;
  createGeneratedResult(result: InsertGeneratedResult): Promise<GeneratedResult>;
  updateGeneratedResult(id: string, result: Partial<GeneratedResult>): Promise<GeneratedResult>;
  incrementResultViews(id: string): Promise<void>;
  incrementResultLikes(id: string): Promise<void>;
  incrementResultShares(id: string): Promise<void>;
  deleteGeneratedResult(id: string): Promise<void>;
  
  // Credit Management operations
  getUserCredits(userId: string): Promise<number>;
  refundCredits(userId: string, amount: number, reason: string): Promise<{ success: boolean; newBalance: number }>;
  consumeCredits(userId: string, amount: number, operation: string, metadata?: any, generationTaskId?: string): Promise<{ success: boolean; remaining: number }>;
  getUserUsageHistory(userId: string, limit?: number): Promise<UsageLedger[]>;
  
  // Transactional Outbox operations (for reliable task creation)
  enqueueKieGeneration(
    userId: string,
    credits: number,
    payload: { prompt: string; imageInput?: any; aspectRatio?: string; resolution?: string; outputFormat?: string; },
    metadata?: any
  ): Promise<{ success: boolean; outboxId?: string; ledgerId?: string; remaining?: number; error?: string }>;
  claimPendingOutbox(limit?: number): Promise<TaskOutbox[]>;
  resetOutboxToPending(outboxId: string, errorMsg: string): Promise<void>;
  completeOutboxWithTask(outboxId: string, taskData: InsertGenerationTask): Promise<void>;
  completeOutboxWithRefund(outboxId: string, errorMsg: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Figurine operations
  async getFigurine(id: string): Promise<Figurine | undefined> {
    const [figurine] = await db.select().from(figurines).where(eq(figurines.id, id));
    return figurine;
  }

  async getAllFigurines(): Promise<Figurine[]> {
    return await db.select().from(figurines).orderBy(desc(figurines.createdAt));
  }

  async createFigurine(insertFigurine: InsertFigurine): Promise<Figurine> {
    const [figurine] = await db.insert(figurines).values(insertFigurine).returning();
    return figurine;
  }

  async updateFigurine(id: string, updateData: Partial<Figurine>): Promise<Figurine> {
    const [figurine] = await db.update(figurines)
      .set(updateData)
      .where(eq(figurines.id, id))
      .returning();
    return figurine;
  }

  async deleteFigurine(id: string): Promise<void> {
    await db.delete(figurines).where(eq(figurines.id, id));
  }

  // Prompt Pack operations
  async getPromptPack(id: string): Promise<PromptPack | undefined> {
    const [promptPack] = await db.select().from(promptPacks).where(eq(promptPacks.id, id));
    return promptPack;
  }

  async getAllPromptPacks(): Promise<PromptPack[]> {
    return await db.select().from(promptPacks).orderBy(promptPacks.sortOrder);
  }

  async getActivePromptPacks(): Promise<PromptPack[]> {
    return await db.select().from(promptPacks)
      .where(eq(promptPacks.isActive, true))
      .orderBy(promptPacks.sortOrder);
  }

  async createPromptPack(insertPromptPack: InsertPromptPack): Promise<PromptPack> {
    const [promptPack] = await db.insert(promptPacks).values(insertPromptPack).returning();
    return promptPack;
  }

  async updatePromptPack(id: string, updateData: Partial<PromptPack>): Promise<PromptPack> {
    const [promptPack] = await db.update(promptPacks)
      .set(updateData)
      .where(eq(promptPacks.id, id))
      .returning();
    return promptPack;
  }

  async deletePromptPack(id: string): Promise<void> {
    await db.delete(promptPacks).where(eq(promptPacks.id, id));
  }

  // 3D Model operations
  async getThreeDModel(id: string): Promise<ThreeDModel | undefined> {
    const [model] = await db.select().from(threeDModels).where(eq(threeDModels.id, id));
    return model;
  }

  async getThreeDModelsByFigurine(figurineId: string): Promise<ThreeDModel[]> {
    return await db.select().from(threeDModels)
      .where(eq(threeDModels.figurineId, figurineId))
      .orderBy(desc(threeDModels.createdAt));
  }

  async createThreeDModel(insertModel: InsertThreeDModel): Promise<ThreeDModel> {
    const [model] = await db.insert(threeDModels).values(insertModel).returning();
    return model;
  }

  async updateThreeDModel(id: string, updateData: Partial<ThreeDModel>): Promise<ThreeDModel> {
    const [model] = await db.update(threeDModels)
      .set(updateData)
      .where(eq(threeDModels.id, id))
      .returning();
    return model;
  }

  async deleteThreeDModel(id: string): Promise<void> {
    await db.delete(threeDModels).where(eq(threeDModels.id, id));
  }

  // Print Job operations
  async getPrintJob(id: string): Promise<PrintJob | undefined> {
    const [printJob] = await db.select().from(printJobs).where(eq(printJobs.id, id));
    return printJob;
  }

  async getPrintJobsByModel(modelId: string): Promise<PrintJob[]> {
    return await db.select().from(printJobs)
      .where(eq(printJobs.modelId, modelId))
      .orderBy(desc(printJobs.createdAt));
  }

  async createPrintJob(insertPrintJob: InsertPrintJob): Promise<PrintJob> {
    const [printJob] = await db.insert(printJobs).values(insertPrintJob).returning();
    return printJob;
  }

  async updatePrintJob(id: string, updateData: Partial<PrintJob>): Promise<PrintJob> {
    const [printJob] = await db.update(printJobs)
      .set(updateData)
      .where(eq(printJobs.id, id))
      .returning();
    return printJob;
  }

  async deletePrintJob(id: string): Promise<void> {
    await db.delete(printJobs).where(eq(printJobs.id, id));
  }

  // Generation Task operations
  async getGenerationTask(id: string): Promise<GenerationTask | undefined> {
    const [task] = await db.select().from(generationTasks).where(eq(generationTasks.id, id));
    return task;
  }

  async getGenerationTaskByTaskId(taskId: string): Promise<GenerationTask | undefined> {
    const [task] = await db.select().from(generationTasks).where(eq(generationTasks.taskId, taskId));
    return task;
  }

  async getAllGenerationTasks(): Promise<GenerationTask[]> {
    return await db.select().from(generationTasks).orderBy(desc(generationTasks.createdAt));
  }

  async createGenerationTask(insertTask: InsertGenerationTask): Promise<GenerationTask> {
    const [task] = await db.insert(generationTasks).values(insertTask).returning();
    return task;
  }

  async updateGenerationTask(id: string, updateData: Partial<GenerationTask>): Promise<GenerationTask> {
    const [task] = await db.update(generationTasks)
      .set(updateData)
      .where(eq(generationTasks.id, id))
      .returning();
    return task;
  }

  async deleteGenerationTask(id: string): Promise<void> {
    await db.delete(generationTasks).where(eq(generationTasks.id, id));
  }

  // Generated Result operations (UGC Gallery)
  async getGeneratedResult(id: string): Promise<GeneratedResult | undefined> {
    const [result] = await db.select().from(generatedResults).where(eq(generatedResults.id, id));
    return result;
  }

  async getAllGeneratedResults(): Promise<GeneratedResult[]> {
    return await db.select().from(generatedResults).orderBy(desc(generatedResults.createdAt));
  }

  async getPublicGeneratedResults(limit: number = 50, offset: number = 0): Promise<GeneratedResult[]> {
    return await db.select().from(generatedResults)
      .where(eq(generatedResults.isPublic, true))
      .orderBy(desc(generatedResults.qualityScore), desc(generatedResults.likes), desc(generatedResults.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getFeaturedGeneratedResults(limit: number = 12, offset: number = 0): Promise<GeneratedResult[]> {
    return await db.select().from(generatedResults)
      .where(and(
        eq(generatedResults.isPublic, true),
        eq(generatedResults.isFeatured, true)
      ))
      .orderBy(desc(generatedResults.qualityScore), desc(generatedResults.likes))
      .limit(limit)
      .offset(offset);
  }

  async getGeneratedResultsByCategory(category: string, limit: number = 20, offset: number = 0): Promise<GeneratedResult[]> {
    return await db.select().from(generatedResults)
      .where(and(
        eq(generatedResults.isPublic, true),
        eq(generatedResults.category, category)
      ))
      .orderBy(desc(generatedResults.qualityScore), desc(generatedResults.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async createGeneratedResult(insertResult: InsertGeneratedResult): Promise<GeneratedResult> {
    const [result] = await db.insert(generatedResults).values(insertResult).returning();
    return result;
  }

  async updateGeneratedResult(id: string, updateData: Partial<GeneratedResult>): Promise<GeneratedResult> {
    const updatedData = { ...updateData, updatedAt: new Date() };
    const [result] = await db.update(generatedResults)
      .set(updatedData)
      .where(eq(generatedResults.id, id))
      .returning();
    return result;
  }

  async incrementResultViews(id: string): Promise<void> {
    await db.update(generatedResults)
      .set({ views: sql`${generatedResults.views} + 1`, updatedAt: new Date() })
      .where(eq(generatedResults.id, id));
  }

  async incrementResultLikes(id: string): Promise<void> {
    await db.update(generatedResults)
      .set({ likes: sql`${generatedResults.likes} + 1`, updatedAt: new Date() })
      .where(eq(generatedResults.id, id));
  }

  async incrementResultShares(id: string): Promise<void> {
    await db.update(generatedResults)
      .set({ shares: sql`${generatedResults.shares} + 1`, updatedAt: new Date() })
      .where(eq(generatedResults.id, id));
  }

  async deleteGeneratedResult(id: string): Promise<void> {
    await db.delete(generatedResults).where(eq(generatedResults.id, id));
  }

  // Credit Management operations
  async getUserCredits(userId: string): Promise<number> {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user?.credits || 0;
  }

  async refundCredits(userId: string, amount: number, reason: string): Promise<{ success: boolean; newBalance: number }> {
    // Refund credits (e.g., when task creation fails)
    const [updated] = await db.update(users)
      .set({ 
        credits: sql`${users.credits} + ${amount}`,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();

    if (!updated) {
      return { success: false, newBalance: 0 };
    }

    // Log refund to ledger
    await db.insert(usageLedger).values({
      userId,
      operation: "refund",
      creditsConsumed: -amount, // Negative indicates credit addition
      creditsRemaining: updated.credits,
      metadata: { reason },
      generationTaskId: null,
      success: true,
    });

    return { success: true, newBalance: updated.credits };
  }

  async consumeCredits(
    userId: string, 
    amount: number, 
    operation: string, 
    metadata?: any,
    generationTaskId?: string
  ): Promise<{ success: boolean; remaining: number }> {
    // Use transaction to ensure atomicity and prevent race conditions
    return await db.transaction(async (tx) => {
      // Atomic UPDATE with WHERE guard - only succeeds if sufficient credits
      const [updated] = await tx.update(users)
        .set({ 
          credits: sql`${users.credits} - ${amount}`,
          updatedAt: new Date()
        })
        .where(and(
          eq(users.id, userId),
          sql`${users.credits} >= ${amount}` // Guard: prevents negative balance
        ))
        .returning();

      if (!updated) {
        // Insufficient credits or user not found - get fresh balance
        const [user] = await tx.select().from(users).where(eq(users.id, userId));
        return { success: false, remaining: user?.credits || 0 };
      }

      // Log to usage ledger with fresh balance from UPDATE RETURNING
      await tx.insert(usageLedger).values({
        userId,
        operation,
        creditsConsumed: amount,
        creditsRemaining: updated.credits,
        metadata,
        generationTaskId,
        success: true,
      });

      return { success: true, remaining: updated.credits };
    });
  }

  async getUserUsageHistory(userId: string, limit: number = 50): Promise<UsageLedger[]> {
    return await db.select()
      .from(usageLedger)
      .where(eq(usageLedger.userId, userId))
      .orderBy(desc(usageLedger.createdAt))
      .limit(limit);
  }

  // Transactional Outbox Pattern - Ensures atomic credit deduction + task creation
  async enqueueKieGeneration(
    userId: string,
    credits: number,
    payload: { prompt: string; imageInput?: any; aspectRatio?: string; resolution?: string; outputFormat?: string; },
    metadata?: any
  ): Promise<{ success: boolean; outboxId?: string; ledgerId?: string; remaining?: number; error?: string }> {
    // Single atomic transaction: deduct credits + create ledger + enqueue outbox command
    return await db.transaction(async (tx) => {
      // Step 1: Deduct credits with atomic guard
      const [updated] = await tx.update(users)
        .set({ 
          credits: sql`${users.credits} - ${credits}`,
          updatedAt: new Date()
        })
        .where(and(
          eq(users.id, userId),
          sql`${users.credits} >= ${credits}` // Guard: prevents negative balance
        ))
        .returning();

      if (!updated) {
        // Insufficient credits - get fresh balance
        const [user] = await tx.select().from(users).where(eq(users.id, userId));
        return { 
          success: false, 
          remaining: user?.credits || 0,
          error: "INSUFFICIENT_CREDITS"
        };
      }

      // Step 2: Create ledger entry with status=pending
      const [ledger] = await tx.insert(usageLedger).values({
        userId,
        operation: "image_generation",
        creditsConsumed: credits,
        creditsRemaining: updated.credits,
        status: "pending", // Will be updated when task completes or refunded
        metadata,
        generationTaskId: null, // Will be linked later when task created
        success: true,
      }).returning();

      // Step 3: Enqueue outbox command
      const [outbox] = await tx.insert(taskOutbox).values({
        type: "create_generation_task",
        userId,
        ledgerId: ledger.id,
        payload,
        credits,
        status: "pending",
        attempts: 0,
      }).returning();

      return { 
        success: true, 
        outboxId: outbox.id,
        ledgerId: ledger.id,
        remaining: updated.credits 
      };
    });
  }

  async claimPendingOutbox(limit: number = 10): Promise<TaskOutbox[]> {
    // Claim pending OR stale processing commands with distributed locking
    return await db.transaction(async (tx) => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      
      const pending = await tx.select()
        .from(taskOutbox)
        .where(and(
          sql`(${taskOutbox.status} = 'pending' OR (${taskOutbox.status} = 'processing' AND ${taskOutbox.lockedAt} < ${fiveMinutesAgo}))`,
          sql`${taskOutbox.attempts} <= 7` // ✅ Max: 4 task retries (1-4) + 3 refund retries (5-7) = 7 attempts total
        ))
        .orderBy(taskOutbox.createdAt)
        .limit(limit)
        .for('update', { skipLocked: true });

      // Mark as processing and increment attempts
      if (pending.length > 0) {
        await tx.update(taskOutbox)
          .set({ 
            status: "processing",
            lockedAt: new Date(),
            attempts: sql`${taskOutbox.attempts} + 1`, // Incremented here
            updatedAt: new Date()
          })
          .where(sql`${taskOutbox.id} IN (${sql.join(pending.map(p => sql`${p.id}`), sql`, `)})`);

        // Re-fetch with incremented attempts for accurate retry logic
        return await tx.select()
          .from(taskOutbox)
          .where(sql`${taskOutbox.id} IN (${sql.join(pending.map(p => sql`${p.id}`), sql`, `)})`);
      }

      return [];
    });
  }

  async resetOutboxToPending(outboxId: string, errorMsg: string): Promise<void> {
    // Reset failed outbox command to pending for retry
    await db.update(taskOutbox)
      .set({ 
        status: "pending", // Reset to pending for next retry
        lockedAt: null, // Clear lock
        lastError: errorMsg,
        updatedAt: new Date()
      })
      .where(eq(taskOutbox.id, outboxId));
  }

  async completeOutboxWithTask(outboxId: string, taskData: InsertGenerationTask): Promise<void> {
    await db.transaction(async (tx) => {
      // Get outbox to find linked ledger
      const [outbox] = await tx.select().from(taskOutbox).where(eq(taskOutbox.id, outboxId));
      
      if (!outbox) {
        throw new Error(`Outbox ${outboxId} not found`);
      }

      // Create generation task
      const [task] = await tx.insert(generationTasks).values(taskData).returning();

      // Update outbox status to succeeded
      await tx.update(taskOutbox)
        .set({ 
          status: "succeeded",
          updatedAt: new Date()
        })
        .where(eq(taskOutbox.id, outboxId));

      // Update ORIGINAL ledger entry with task link and status=succeeded
      if (outbox.ledgerId) {
        await tx.update(usageLedger)
          .set({ 
            status: "succeeded",
            generationTaskId: task.id,
            outboxId: outboxId
          })
          .where(eq(usageLedger.id, outbox.ledgerId));
      }
    });
  }

  async completeOutboxWithRefund(outboxId: string, errorMsg: string): Promise<void> {
    await db.transaction(async (tx) => {
      // Get outbox data
      const [outbox] = await tx.select().from(taskOutbox).where(eq(taskOutbox.id, outboxId));
      
      if (!outbox) {
        throw new Error(`Outbox ${outboxId} not found`);
      }

      // Refund credits
      await tx.update(users)
        .set({ 
          credits: sql`${users.credits} + ${outbox.credits}`,
          updatedAt: new Date()
        })
        .where(eq(users.id, outbox.userId));

      // Get fresh balance AFTER refund
      const [user] = await tx.select().from(users).where(eq(users.id, outbox.userId));

      // Update ORIGINAL ledger entry to refunded (DO NOT create new entry)
      if (outbox.ledgerId) {
        await tx.update(usageLedger)
          .set({ 
            status: "refunded",
            outboxId: outboxId,
            creditsRemaining: user?.credits || 0, // Update to post-refund balance
            metadata: { reason: "task_creation_failed", error: errorMsg }
          })
          .where(eq(usageLedger.id, outbox.ledgerId));
      }

      // Update outbox status to refunded
      await tx.update(taskOutbox)
        .set({ 
          status: "refunded",
          lastError: errorMsg,
          updatedAt: new Date()
        })
        .where(eq(taskOutbox.id, outboxId));
    });
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private figurinesList: Map<string, Figurine>;
  private promptPacksList: Map<string, PromptPack>;
  private threeDModelsList: Map<string, ThreeDModel>;
  private printJobsList: Map<string, PrintJob>;
  private generationTasksList: Map<string, GenerationTask>;
  private generatedResultsList: Map<string, GeneratedResult>;

  constructor() {
    this.users = new Map();
    this.figurinesList = new Map();
    this.promptPacksList = new Map();
    this.threeDModelsList = new Map();
    this.printJobsList = new Map();
    this.generationTasksList = new Map();
    this.generatedResultsList = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Figurine operations
  async getFigurine(id: string): Promise<Figurine | undefined> {
    return this.figurinesList.get(id);
  }

  async getAllFigurines(): Promise<Figurine[]> {
    return Array.from(this.figurinesList.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createFigurine(insertFigurine: InsertFigurine): Promise<Figurine> {
    const id = randomUUID();
    const figurine: Figurine = { 
      id,
      originalImageUrl: insertFigurine.originalImageUrl,
      generatedImageUrl: insertFigurine.generatedImageUrl || null,
      promptId: insertFigurine.promptId || null,
      customPrompt: insertFigurine.customPrompt || null,
      status: insertFigurine.status || "pending",
      metadata: insertFigurine.metadata || null,
      createdAt: new Date() 
    };
    this.figurinesList.set(id, figurine);
    return figurine;
  }

  async updateFigurine(id: string, updateData: Partial<Figurine>): Promise<Figurine> {
    const existing = this.figurinesList.get(id);
    if (!existing) {
      throw new Error(`Figurine with id ${id} not found`);
    }
    const updated = { ...existing, ...updateData };
    this.figurinesList.set(id, updated);
    return updated;
  }

  async deleteFigurine(id: string): Promise<void> {
    this.figurinesList.delete(id);
  }

  // Prompt Pack operations
  async getPromptPack(id: string): Promise<PromptPack | undefined> {
    return this.promptPacksList.get(id);
  }

  async getAllPromptPacks(): Promise<PromptPack[]> {
    return Array.from(this.promptPacksList.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getActivePromptPacks(): Promise<PromptPack[]> {
    return Array.from(this.promptPacksList.values())
      .filter(pack => pack.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async createPromptPack(insertPromptPack: InsertPromptPack): Promise<PromptPack> {
    const promptPack: PromptPack = insertPromptPack as PromptPack;
    this.promptPacksList.set(promptPack.id, promptPack);
    return promptPack;
  }

  async updatePromptPack(id: string, updateData: Partial<PromptPack>): Promise<PromptPack> {
    const existing = this.promptPacksList.get(id);
    if (!existing) {
      throw new Error(`PromptPack with id ${id} not found`);
    }
    const updated = { ...existing, ...updateData };
    this.promptPacksList.set(id, updated);
    return updated;
  }

  async deletePromptPack(id: string): Promise<void> {
    this.promptPacksList.delete(id);
  }

  // 3D Model operations
  async getThreeDModel(id: string): Promise<ThreeDModel | undefined> {
    return this.threeDModelsList.get(id);
  }

  async getThreeDModelsByFigurine(figurineId: string): Promise<ThreeDModel[]> {
    return Array.from(this.threeDModelsList.values())
      .filter(model => model.figurineId === figurineId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createThreeDModel(insertModel: InsertThreeDModel): Promise<ThreeDModel> {
    const id = randomUUID();
    const model: ThreeDModel = { 
      id,
      figurineId: insertModel.figurineId,
      glbUrl: insertModel.glbUrl || null,
      objUrl: insertModel.objUrl || null,
      stlUrl: insertModel.stlUrl || null,
      status: insertModel.status || "pending",
      processingService: insertModel.processingService || null,
      metadata: insertModel.metadata || null,
      createdAt: new Date() 
    };
    this.threeDModelsList.set(id, model);
    return model;
  }

  async updateThreeDModel(id: string, updateData: Partial<ThreeDModel>): Promise<ThreeDModel> {
    const existing = this.threeDModelsList.get(id);
    if (!existing) {
      throw new Error(`ThreeDModel with id ${id} not found`);
    }
    const updated = { ...existing, ...updateData };
    this.threeDModelsList.set(id, updated);
    return updated;
  }

  async deleteThreeDModel(id: string): Promise<void> {
    this.threeDModelsList.delete(id);
  }

  // Print Job operations
  async getPrintJob(id: string): Promise<PrintJob | undefined> {
    return this.printJobsList.get(id);
  }

  async getPrintJobsByModel(modelId: string): Promise<PrintJob[]> {
    return Array.from(this.printJobsList.values())
      .filter(job => job.modelId === modelId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createPrintJob(insertPrintJob: InsertPrintJob): Promise<PrintJob> {
    const id = randomUUID();
    const printJob: PrintJob = { 
      id,
      modelId: insertPrintJob.modelId,
      material: insertPrintJob.material,
      quantity: insertPrintJob.quantity || 1,
      quotedPrice: insertPrintJob.quotedPrice || null,
      printService: insertPrintJob.printService || null,
      externalOrderId: insertPrintJob.externalOrderId || null,
      status: insertPrintJob.status || "quoted",
      customerEmail: insertPrintJob.customerEmail || null,
      shippingInfo: insertPrintJob.shippingInfo || null,
      createdAt: new Date() 
    };
    this.printJobsList.set(id, printJob);
    return printJob;
  }

  async updatePrintJob(id: string, updateData: Partial<PrintJob>): Promise<PrintJob> {
    const existing = this.printJobsList.get(id);
    if (!existing) {
      throw new Error(`PrintJob with id ${id} not found`);
    }
    const updated = { ...existing, ...updateData };
    this.printJobsList.set(id, updated);
    return updated;
  }

  async deletePrintJob(id: string): Promise<void> {
    this.printJobsList.delete(id);
  }

  // Generation Task operations
  async getGenerationTask(id: string): Promise<GenerationTask | undefined> {
    return this.generationTasksList.get(id);
  }

  async getGenerationTaskByTaskId(taskId: string): Promise<GenerationTask | undefined> {
    return Array.from(this.generationTasksList.values()).find(
      (task) => task.taskId === taskId,
    );
  }

  async getAllGenerationTasks(): Promise<GenerationTask[]> {
    return Array.from(this.generationTasksList.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createGenerationTask(insertTask: InsertGenerationTask): Promise<GenerationTask> {
    const id = randomUUID();
    const task: GenerationTask = { 
      id,
      taskId: insertTask.taskId,
      model: insertTask.model || "nano-banana-pro",
      state: insertTask.state,
      prompt: insertTask.prompt,
      imageInput: insertTask.imageInput || null,
      aspectRatio: insertTask.aspectRatio || "1:1",
      resolution: insertTask.resolution || "1K",
      outputFormat: insertTask.outputFormat || "png",
      resultUrls: insertTask.resultUrls || null,
      failCode: insertTask.failCode || null,
      failMsg: insertTask.failMsg || null,
      costTime: insertTask.costTime || null,
      completeTime: insertTask.completeTime || null,
      createdAt: new Date() 
    };
    this.generationTasksList.set(id, task);
    return task;
  }

  async updateGenerationTask(id: string, updateData: Partial<GenerationTask>): Promise<GenerationTask> {
    const existing = this.generationTasksList.get(id);
    if (!existing) {
      throw new Error(`GenerationTask with id ${id} not found`);
    }
    const updated = { ...existing, ...updateData };
    this.generationTasksList.set(id, updated);
    return updated;
  }

  async deleteGenerationTask(id: string): Promise<void> {
    this.generationTasksList.delete(id);
  }

  // Generated Result operations (UGC Gallery)
  async getGeneratedResult(id: string): Promise<GeneratedResult | undefined> {
    return this.generatedResultsList.get(id);
  }

  async getAllGeneratedResults(): Promise<GeneratedResult[]> {
    return Array.from(this.generatedResultsList.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPublicGeneratedResults(limit: number = 50, offset: number = 0): Promise<GeneratedResult[]> {
    return Array.from(this.generatedResultsList.values())
      .filter(r => r.isPublic)
      .sort((a, b) => {
        if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
        if (b.likes !== a.likes) return b.likes - a.likes;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(offset, offset + limit);
  }

  async getFeaturedGeneratedResults(limit: number = 12, offset: number = 0): Promise<GeneratedResult[]> {
    return Array.from(this.generatedResultsList.values())
      .filter(r => r.isPublic && r.isFeatured)
      .sort((a, b) => {
        if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
        return b.likes - a.likes;
      })
      .slice(offset, offset + limit);
  }

  async getGeneratedResultsByCategory(category: string, limit: number = 20, offset: number = 0): Promise<GeneratedResult[]> {
    return Array.from(this.generatedResultsList.values())
      .filter(r => r.isPublic && r.category === category)
      .sort((a, b) => {
        if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(offset, offset + limit);
  }

  async createGeneratedResult(insertResult: InsertGeneratedResult): Promise<GeneratedResult> {
    const id = randomUUID();
    const result: GeneratedResult = {
      id,
      generationTaskId: insertResult.generationTaskId || null,
      imageUrl: insertResult.imageUrl,
      prompt: insertResult.prompt,
      title: insertResult.title || null,
      category: insertResult.category || "general",
      isPublic: insertResult.isPublic ?? true,
      isFeatured: insertResult.isFeatured ?? false,
      qualityScore: insertResult.qualityScore || 0,
      likes: insertResult.likes || 0,
      views: insertResult.views || 0,
      shares: insertResult.shares || 0,
      tags: insertResult.tags || null,
      metadata: insertResult.metadata || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.generatedResultsList.set(id, result);
    return result;
  }

  async updateGeneratedResult(id: string, updateData: Partial<GeneratedResult>): Promise<GeneratedResult> {
    const existing = this.generatedResultsList.get(id);
    if (!existing) {
      throw new Error(`Generated result ${id} not found`);
    }
    const updated: GeneratedResult = { 
      ...existing, 
      ...updateData,
      updatedAt: new Date()
    };
    this.generatedResultsList.set(id, updated);
    return updated;
  }

  async incrementResultViews(id: string): Promise<void> {
    const result = this.generatedResultsList.get(id);
    if (result) {
      result.views += 1;
      result.updatedAt = new Date();
      this.generatedResultsList.set(id, result);
    }
  }

  async incrementResultLikes(id: string): Promise<void> {
    const result = this.generatedResultsList.get(id);
    if (result) {
      result.likes += 1;
      result.updatedAt = new Date();
      this.generatedResultsList.set(id, result);
    }
  }

  async incrementResultShares(id: string): Promise<void> {
    const result = this.generatedResultsList.get(id);
    if (result) {
      result.shares += 1;
      result.updatedAt = new Date();
      this.generatedResultsList.set(id, result);
    }
  }

  async deleteGeneratedResult(id: string): Promise<void> {
    this.generatedResultsList.delete(id);
  }

  // Credit Management operations
  async getUserCredits(userId: string): Promise<number> {
    const user = this.users.get(userId);
    return user?.credits || 0;
  }

  async consumeCredits(
    userId: string, 
    amount: number, 
    operation: string, 
    metadata?: any,
    generationTaskId?: string
  ): Promise<{ success: boolean; remaining: number }> {
    const user = this.users.get(userId);
    if (!user) {
      return { success: false, remaining: 0 };
    }

    if (user.credits < amount) {
      return { success: false, remaining: user.credits };
    }

    // Deduct credits
    user.credits -= amount;
    user.updatedAt = new Date();
    this.users.set(userId, user);

    const remaining = user.credits;

    // Log to usage ledger (in-memory)
    const ledgerEntry: UsageLedger = {
      id: randomUUID(),
      userId,
      operation,
      creditsConsumed: amount,
      creditsRemaining: remaining,
      endpoint: null,
      metadata: metadata || null,
      generationTaskId: generationTaskId || null,
      success: true,
      createdAt: new Date(),
    };

    // Store in memory (you could add a Map for this if needed)
    // For now, just return success
    return { success: true, remaining };
  }

  async getUserUsageHistory(userId: string, limit: number = 50): Promise<UsageLedger[]> {
    // In-memory implementation would need a separate Map to store ledger
    // For now, return empty array
    return [];
  }

  // Transactional Outbox - Stub implementations (project uses DatabaseStorage)
  async enqueueKieGeneration(
    userId: string,
    credits: number,
    payload: any,
    metadata?: any
  ): Promise<{ success: boolean; outboxId?: string; ledgerId?: string; remaining?: number; error?: string }> {
    throw new Error("MemStorage does not support transactional outbox");
  }

  async claimPendingOutbox(limit?: number): Promise<TaskOutbox[]> {
    return [];
  }

  async resetOutboxToPending(outboxId: string, errorMsg: string): Promise<void> {
    throw new Error("MemStorage does not support transactional outbox");
  }

  async completeOutboxWithTask(outboxId: string, taskData: InsertGenerationTask): Promise<void> {
    throw new Error("MemStorage does not support transactional outbox");
  }

  async completeOutboxWithRefund(outboxId: string, errorMsg: string): Promise<void> {
    throw new Error("MemStorage does not support transactional outbox");
  }
}

// Use database storage by default, but keep MemStorage as fallback
export const storage = new DatabaseStorage();
