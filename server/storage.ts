import { 
  type User, type InsertUser,
  type Figurine, type InsertFigurine,
  type PromptPack, type InsertPromptPack,
  type ThreeDModel, type InsertThreeDModel,
  type PrintJob, type InsertPrintJob,
  type GenerationTask, type InsertGenerationTask
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, figurines, promptPacks, threeDModels, printJobs, generationTasks } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private figurinesList: Map<string, Figurine>;
  private promptPacksList: Map<string, PromptPack>;
  private threeDModelsList: Map<string, ThreeDModel>;
  private printJobsList: Map<string, PrintJob>;
  private generationTasksList: Map<string, GenerationTask>;

  constructor() {
    this.users = new Map();
    this.figurinesList = new Map();
    this.promptPacksList = new Map();
    this.threeDModelsList = new Map();
    this.printJobsList = new Map();
    this.generationTasksList = new Map();
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
}

// Use database storage by default, but keep MemStorage as fallback
export const storage = new DatabaseStorage();
