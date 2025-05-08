export const formatLocalDateForInput = (date) => {
    // Простая заглушка для формата YYYY-MM-DD
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };
  