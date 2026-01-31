
export function formatDate(date: string | Date | undefined): string {
    if (!date) return 'No date';
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  }