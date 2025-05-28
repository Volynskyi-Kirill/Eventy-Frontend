import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';
import { formatDate } from '@/lib/utils/dates';

export type EventZone = {
  id: number;
  eventId: number;
  name: string;
  price: number;
  currency: string;
  seatCount: number;
};

export type EventDate = {
  id: number;
  date: string;
  eventId: number;
};

export type Ticket = {
  id: number;
  eventZoneId: number;
  eventDateId: number;
  seatNumber: number;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  eventZone: EventZone;
  eventDate: EventDate;
};

export type TicketPurchaseData = {
  ticketIds: number[];
  paymentMethod: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    agreeToTerms: boolean;
    marketingConsent?: boolean;
  };
};

export type UserTicket = {
  ticketId: number;
  buyerId: number;
  soldAt: string;
  paymentMethod: string;
  purchaseContactId: number | null;
  ticket: {
    id: number;
    eventZoneId: number;
    eventDateId: number;
    seatNumber: number;
    status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
    eventZone: {
      id: number;
      eventId: number;
      name: string;
      price: number;
      currency: string;
      seatCount: number;
      event: {
        id: number;
        ownerId: number;
        title: string;
        country: string;
        state: string;
        city: string;
        street: string;
        buildingNumber: string;
        shortDescription: string;
        fullDescription: string;
        coverImg: string | null;
        logoImg: string | null;
        mainImg: string | null;
        userId: number | null;
        createdAt: string;
        updatedAt: string;
      };
    };
    eventDate: {
      id: number;
      date: string;
      eventId: number;
    };
  };
  purchaseContactInfo: any | null;
};

export const ticketsService = {
  async getAvailableTickets(eventId: number, zoneId?: number) {
    const params = new URLSearchParams();
    if (zoneId) {
      params.append('zoneId', zoneId.toString());
    }

    const url = `${API_ENDPOINTS.TICKETS.GET_AVAILABLE_TICKETS(
      eventId
    )}?${params.toString()}`;
    const response = await axiosInstance.get<Ticket[]>(url);
    return response.data;
  },

  async purchaseTicket(ticketData: TicketPurchaseData) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.TICKETS.PURCHASE,
      ticketData
    );
    return response.data;
  },

  async getUserTickets() {
    const response = await axiosInstance.get<UserTicket[]>(
      API_ENDPOINTS.TICKETS.USER_TICKETS
    );
    return response.data;
  },

  // Helper function to group tickets by date and zone for the UI
  groupTicketsByDateAndZone(tickets: Ticket[]) {
    // First group by date
    const dateGroups = tickets.reduce<Record<string, Ticket[]>>(
      (groups, ticket) => {
        const dateKey = ticket.eventDate.date;
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(ticket);
        return groups;
      },
      {}
    );

    // For each date, group by zone
    const result = Object.entries(dateGroups).map(
      ([dateStr, ticketsForDate]) => {
        const formattedDate = new Date(dateStr);

        // Group by zone for this date
        const zoneGroups = ticketsForDate.reduce<Record<number, Ticket[]>>(
          (zones, ticket) => {
            const zoneId = ticket.eventZone.id;
            if (!zones[zoneId]) {
              zones[zoneId] = [];
            }
            zones[zoneId].push(ticket);
            return zones;
          },
          {}
        );

        // Convert to array of zones with their tickets
        const zonesArray = Object.entries(zoneGroups).map(
          ([zoneIdStr, ticketsForZone]) => {
            const zoneId = parseInt(zoneIdStr);
            const zone = ticketsForZone[0].eventZone; // All tickets in this group have the same zone

            return {
              zoneId,
              zoneName: zone.name,
              price: zone.price,
              currency: zone.currency,
              totalSeats: zone.seatCount,
              availableSeats: ticketsForZone.length,
              tickets: ticketsForZone,
            };
          }
        );

        return {
          dateId: ticketsForDate[0].eventDate.id,
          dateStr: dateStr,
          formattedDate: formatDate(formattedDate),
          time: formattedDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          zones: zonesArray,
        };
      }
    );

    return result;
  },
};
