export interface TopEventByRevenue {
  id: number;
  title: string;
  revenue: number;
  currency: string;
  ticketsSold: number;
  totalTickets: number;
  nextEventDate?: string;
}

export interface TopEventByTickets {
  id: number;
  title: string;
  ticketsSold: number;
  totalTickets: number;
  revenue: number;
  currency: string;
  nextEventDate?: string;
}

export interface CategoryStats {
  id: number;
  name: string;
  eventCount: number;
  totalRevenue: number;
  ticketsSold: number;
  percentage: number;
}

export interface RecentEvent {
  id: number;
  title: string;
  createdAt: string;
  nextEventDate?: string;
  totalTickets: number;
  ticketsSold: number;
}

export interface UpcomingEvent {
  id: number;
  title: string;
  nextEventDate: string;
  totalTickets: number;
  ticketsSold: number;
  revenue: number;
  currency: string;
}

export interface DashboardStats {
  // Overall statistics
  totalEvents: number;
  eventsThisMonth: number;
  totalTicketsCreated: number;
  totalTicketsSold: number;
  totalRevenue: number;
  averageRevenuePerEvent: number;
  currency: string;

  // Top events
  topEventsByRevenue: TopEventByRevenue[];
  topEventsByTickets: TopEventByTickets[];

  // Category distribution
  categoryStats: CategoryStats[];

  // Recent activity
  recentEvents: RecentEvent[];
  upcomingEvents: UpcomingEvent[];
}

export interface DashboardStatsQueryParams {
  // Future filters can be added here
}
