// Currency formatting
export const formatCurrency = (amount: number, currency: string) => {
  return `${amount.toLocaleString()} ${currency}`;
};

// Date formatting functions
export const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString();
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

// Occupancy calculations
export const getOccupancyPercentage = (sold: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((sold / total) * 100);
};

export const getOccupancyColor = (percentage: number) => {
  if (percentage >= 80) return 'bg-green-100 text-green-800';
  if (percentage >= 50) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

// Days until event calculation
export const getDaysUntilEvent = (dateString: string) => {
  const eventDate = new Date(dateString);
  const now = new Date();
  const diffTime = eventDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Urgency color for upcoming events
export const getUrgencyColor = (days: number) => {
  if (days <= 3) return 'bg-red-100 text-red-800';
  if (days <= 7) return 'bg-yellow-100 text-yellow-800';
  if (days <= 14) return 'bg-blue-100 text-blue-800';
  return 'bg-green-100 text-green-800';
};

// Urgency text for upcoming events
export const getUrgencyText = (days: number, t: (key: string) => string) => {
  if (days <= 0) return t('today');
  if (days === 1) return t('tomorrow');
  if (days <= 7) return t('thisWeek');
  if (days <= 30) return t('thisMonth');
  return t('upcoming');
};

// Ticket status for events
export const getTicketStatus = (
  sold: number,
  total: number,
  nextEventDate: string | undefined,
  t: (key: string) => string
) => {
  if (total === 0) {
    return { text: t('noTickets'), color: 'bg-gray-100 text-gray-800' };
  }

  // If no next date, event is completed
  if (!nextEventDate) {
    return { text: t('completed'), color: 'bg-gray-100 text-gray-800' };
  }

  const percentage = (sold / total) * 100;

  if (percentage === 0) {
    return { text: t('notStarted'), color: 'bg-red-100 text-red-800' };
  } else if (percentage === 100) {
    return { text: t('soldOut'), color: 'bg-green-100 text-green-800' };
  } else if (percentage >= 80) {
    return { text: t('almostFull'), color: 'bg-yellow-100 text-yellow-800' };
  } else {
    return { text: t('onSale'), color: 'bg-blue-100 text-blue-800' };
  }
};
