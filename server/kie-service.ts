/**
 * Kie.ai Nano Banana Pro API Service
 * Documentation: https://kie.ai/nano-banana-pro
 */

interface KieCreateTaskRequest {
  model: "nano-banana-pro";
  input: {
    prompt: string;
    image_input?: string[]; // Array of base64 or URLs
    aspect_ratio?: "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "4:5" | "5:4" | "9:16" | "16:9" | "21:9";
    resolution?: "1K" | "2K" | "4K";
    output_format?: "png" | "jpg";
  };
  callBackUrl?: string;
}

interface KieCreateTaskResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
  };
}

interface KieTaskStatusResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
    model: string;
    state: "waiting" | "success" | "fail";
    param: string; // JSON string
    resultJson: string; // JSON string with resultUrls or resultObject
    failCode: string | null;
    failMsg: string | null;
    costTime: number | null;
    completeTime: number | null;
    createTime: number;
  };
}

const KIE_API_BASE = "https://api.kie.ai/api/v1/jobs";
const KIE_API_KEY = process.env.KIE_API_KEY;

if (!KIE_API_KEY) {
  console.warn("⚠️ KIE_API_KEY not found - Kie.ai API will not work");
}

/**
 * Create a generation task using Kie.ai Nano Banana Pro API
 */
export async function createGenerationTask(params: {
  prompt: string;
  imageInput?: string[];
  aspectRatio?: string;
  resolution?: string;
  outputFormat?: string;
}): Promise<{ taskId: string }> {
  if (!KIE_API_KEY) {
    throw new Error("KIE_API_KEY not configured");
  }

  const request: KieCreateTaskRequest = {
    model: "nano-banana-pro",
    input: {
      prompt: params.prompt,
      image_input: params.imageInput || [],
      aspect_ratio: (params.aspectRatio as any) || "1:1",
      resolution: (params.resolution as any) || "1K",
      output_format: (params.outputFormat as any) || "png",
    },
  };

  console.log("🚀 Creating Kie.ai task:", { prompt: params.prompt.substring(0, 100) });

  const response = await fetch(`${KIE_API_BASE}/createTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KIE_API_KEY}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Kie.ai API error:", response.status, errorText);
    throw new Error(`Kie.ai API error: ${response.status} ${errorText}`);
  }

  const data: KieCreateTaskResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(`Kie.ai API returned error: ${data.msg}`);
  }

  console.log("✅ Task created:", data.data.taskId);
  return { taskId: data.data.taskId };
}

/**
 * Query task status and results
 */
export async function getTaskStatus(taskId: string): Promise<{
  state: "waiting" | "success" | "fail";
  resultUrls?: string[];
  failCode?: string | null;
  failMsg?: string | null;
  costTime?: number | null;
  completeTime?: number | null;
}> {
  if (!KIE_API_KEY) {
    throw new Error("KIE_API_KEY not configured");
  }

  const response = await fetch(`${KIE_API_BASE}/recordInfo?taskId=${taskId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${KIE_API_KEY}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Kie.ai status check error:", response.status, errorText);
    throw new Error(`Kie.ai API error: ${response.status}`);
  }

  const data: KieTaskStatusResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(`Kie.ai API returned error: ${data.msg}`);
  }

  const result: any = {
    state: data.data.state,
    failCode: data.data.failCode,
    failMsg: data.data.failMsg,
    costTime: data.data.costTime,
    completeTime: data.data.completeTime,
  };

  // Parse resultJson if task is successful
  if (data.data.state === "success" && data.data.resultJson) {
    try {
      const resultData = JSON.parse(data.data.resultJson);
      result.resultUrls = resultData.resultUrls || [];
      console.log("✅ Task completed:", taskId, "Results:", result.resultUrls.length);
    } catch (e) {
      console.error("Failed to parse resultJson:", e);
    }
  }

  return result;
}

/**
 * Poll task status until completion (with timeout and retry)
 */
export async function pollTaskUntilComplete(
  taskId: string,
  options: {
    maxAttempts?: number;
    intervalMs?: number;
    timeoutMs?: number;
  } = {}
): Promise<{
  state: "success" | "fail" | "timeout";
  resultUrls?: string[];
  failCode?: string | null;
  failMsg?: string | null;
  costTime?: number | null;
}> {
  const maxAttempts = options.maxAttempts || 60; // 60 attempts
  const intervalMs = options.intervalMs || 2000; // 2 seconds
  const timeoutMs = options.timeoutMs || 120000; // 2 minutes total

  const startTime = Date.now();
  let attempts = 0;

  console.log(`⏳ Polling task ${taskId} (max ${maxAttempts} attempts, ${intervalMs}ms interval)`);

  while (attempts < maxAttempts) {
    if (Date.now() - startTime > timeoutMs) {
      console.warn(`⏰ Timeout polling task ${taskId}`);
      return { state: "timeout" };
    }

    try {
      const status = await getTaskStatus(taskId);

      if (status.state === "success") {
        return {
          state: "success",
          resultUrls: status.resultUrls,
          costTime: status.costTime,
        };
      }

      if (status.state === "fail") {
        return {
          state: "fail",
          failCode: status.failCode,
          failMsg: status.failMsg,
        };
      }

      // Still waiting, continue polling
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    } catch (error) {
      console.error(`Error polling task ${taskId}:`, error);
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }

  console.warn(`⏰ Max attempts reached for task ${taskId}`);
  return { state: "timeout" };
}
