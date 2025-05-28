export function formatDate(date: Date): {
  day: string;
  month: string;
  year: string;
} {
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    year: date.getFullYear().toString(),
  };
}

export function formatDateToDisplay(date: Date): string {
  const { day, month, year } = formatDate(date);
  return `${day}.${month}.${year}`;
}

export function formatTimeToDisplay(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatFullDateToDisplay(date: Date): string {
  return `${formatDateToDisplay(date)} ${formatTimeToDisplay(date)}`;
}
