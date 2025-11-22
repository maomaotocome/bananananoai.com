/**
 * React Query hooks for Kie.ai Nano Banana Pro API
 * Handles async generation workflow with polling
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "./use-toast";
import { useEffect, useRef } from "react";

export interface GenerationTask {
  id: string;
  taskId: string;
  model: string;
  state: "waiting" | "success" | "fail";
  prompt: string;
  imageInput: string[] | null;
  aspectRatio: string;
  resolution: string;
  outputFormat: string;
  resultUrls: string[] | null;
  failCode: string | null;
  failMsg: string | null;
  costTime: number | null;
  completeTime: Date | null;
  createdAt: Date;
}

interface CreateTaskResponse {
  success: boolean;
  taskId: string;
  id: string;
  state: string;
}

interface TaskStatusResponse {
  success: boolean;
  task: GenerationTask;
}

/**
 * Hook to create a new generation task
 */
export function useCreateGenerationTask() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (params: {
      prompt: string;
      imageInput?: string[];
      aspectRatio?: string;
      resolution?: string;
      outputFormat?: string;
    }) => {
      const response = await apiRequest("POST", "/api/kie/generate", params) as CreateTaskResponse;
      return response;
    },
    onSuccess: (data) => {
      console.log("✅ Generation task created:", data.taskId);
      toast({
        title: "Generation started",
        description: "Your image is being generated. This may take 15-30 seconds...",
      });
      // Invalidate tasks list
      queryClient.invalidateQueries({ queryKey: ["/api/kie/tasks"] });
    },
    onError: (error: Error) => {
      console.error("❌ Generation task error:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to start generation. Please try again.",
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook to poll task status until completion
 * Uses React Query with refetchInterval for automatic polling
 */
export function useTaskStatus(taskId: string | null, options?: {
  enabled?: boolean;
  onSuccess?: (task: GenerationTask) => void;
  onError?: (error: Error) => void;
}) {
  const { toast } = useToast();
  const lastStateRef = useRef<string | null>(null);

  const query = useQuery({
    queryKey: ["/api/kie/task", taskId],
    queryFn: async () => {
      if (!taskId) throw new Error("Task ID is required");
      const response = await fetch(`/api/kie/task/${taskId}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json() as TaskStatusResponse;
      return data;
    },
    enabled: !!taskId && (options?.enabled !== false),
    refetchInterval: (query) => {
      const data = query.state.data as TaskStatusResponse | undefined;
      // Stop polling if task is completed or failed
      if (!data?.success) return false;
      const state = data.task.state;
      if (state === "success" || state === "fail") {
        return false;
      }
      // Continue polling every 2 seconds while waiting
      return 2000;
    },
    retry: 3,
    retryDelay: 1000,
  });

  // Handle state changes with toast notifications
  useEffect(() => {
    const responseData = query.data as TaskStatusResponse | undefined;
    if (!responseData?.success) return;

    const task = responseData.task;
    const currentState = task.state;

    // Only show toasts on state changes
    if (lastStateRef.current === currentState) return;
    lastStateRef.current = currentState;

    if (currentState === "success") {
      toast({
        title: "✅ Image generated successfully!",
        description: `Generated in ${task.costTime ? (task.costTime / 1000).toFixed(1) : ""}s`,
      });
      options?.onSuccess?.(task);
    } else if (currentState === "fail") {
      toast({
        title: "❌ Generation failed",
        description: task.failMsg || "Unknown error occurred",
        variant: "destructive",
      });
      options?.onError?.(new Error(task.failMsg || "Generation failed"));
    }
  }, [query.data, toast, options]);

  return query;
}

/**
 * Hook to get all generation tasks (for history/gallery)
 */
export function useGenerationTasks() {
  return useQuery({
    queryKey: ["/api/kie/tasks"],
    queryFn: async () => {
      const response = await fetch("/api/kie/tasks");
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json() as { success: boolean; tasks: GenerationTask[] };
      return data;
    },
  });
}

/**
 * Combined hook for complete generation workflow
 * Creates task + polls status automatically
 */
export function useKieGeneration() {
  const createTask = useCreateGenerationTask();
  const currentTaskId = createTask.data?.taskId || null;
  
  const taskStatus = useTaskStatus(currentTaskId, {
    enabled: !!currentTaskId && createTask.isSuccess,
  });

  const responseData = taskStatus.data as TaskStatusResponse | undefined;

  return {
    // Task creation
    generate: createTask.mutate,
    isGenerating: createTask.isPending || taskStatus.isLoading,
    
    // Task status
    task: responseData?.task,
    taskId: currentTaskId,
    isPolling: taskStatus.isFetching && responseData?.task?.state === "waiting",
    
    // Results
    resultUrls: responseData?.task?.resultUrls || null,
    isSuccess: responseData?.task?.state === "success",
    isFailed: responseData?.task?.state === "fail",
    
    // Error handling
    error: createTask.error || taskStatus.error,
    
    // Reset
    reset: () => {
      createTask.reset();
    },
  };
}
