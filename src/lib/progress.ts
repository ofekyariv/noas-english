"use client";

export interface ModuleProgress {
  completed: number;
  total: number;
  score: number;
  stars: number;
}

const STORAGE_KEY = "noas-english-progress";

export function getProgress(): Record<string, ModuleProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getModuleProgress(moduleId: string): ModuleProgress | null {
  const all = getProgress();
  return all[moduleId] || null;
}

export function saveModuleProgress(moduleId: string, progress: ModuleProgress) {
  const all = getProgress();
  all[moduleId] = progress;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getOverallProgress(moduleIds: string[]): number {
  const all = getProgress();
  let totalStars = 0;
  for (const id of moduleIds) {
    totalStars += (all[id]?.stars || 0);
  }
  return Math.round((totalStars / (moduleIds.length * 3)) * 100);
}
