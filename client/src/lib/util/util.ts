import z from "zod";

export function formatDate(date: string | Date | undefined): string {
    if (!date) return 'No date';
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  }

export const requiredString = (fieldName: string) => z
    .string({error: (issue) => issue.input === undefined ? `${fieldName} is required` : "Invalid type"})
    .min(1, {message: `${fieldName} is required`})