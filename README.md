# Eventy

**Eventy** is a modern, full-stack web platform designed for seamless event organization and discovery. It provides a comprehensive solution for both event organizers and participants, featuring a polished UI and robust management tools.

Backend repository: [Eventy Backend](https://github.com/Volynskyi-Kirill/Eventy-Backend).

## 🚀 Key Features

- **Dual-Role System**: Users can switch between **Client** and **Organizer** roles within a single account.
- **Secure Authentication**: Robust security using JWT-based sessions and Google OAuth 2.0 integration.
- **Advanced Discovery**: Real-time event filtering by category, price range, and location with various sorting options.
- **Organizer Tools**:
    - **Dashboard**: Track ticket sales, revenue, and audience statistics.
    - **Event Creation**: Multi-step forms for event details, seat zones, pricing, and speaker management with a live preview.
- **Participant Experience**: Detailed event presentations (including descriptions, schedules, and Google Maps integration) and a streamlined ticket booking process.
- **Localization**: Full multi-language support for English and Ukrainian using `next-intl`.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, ShadCN UI.
- **State Management**: Zustand.
- **Backend**: NestJS, Prisma ORM, PostgreSQL.

## 📸 Interface Preview

### Authentication

Secure access via traditional credentials or Google social login.
![Login](./docs/images/login.png)

### Home page

View the most relevant event
![Featured Event](./docs/images/home-page-view-event.png)

### Event discovery

Browse a wide variety of events with powerful filtering tools.
![View All Events](./docs/images/view-all-events.png)

### Event Details

Rich event presentation with descriptions and integrated maps.
![Event Details](./docs/images/view-event.png)

### Organizer Dashboard

Monitor your success and manage upcoming sessions from a central hub.
![Organizer Dashboard](./docs/images/organizer-dashboard.png)

_category distribution close view_
![category distribution](docs/images/dasbord-category-destribution.png)

### Creating Events

Structured multi-step creation process with real-time feedback.

**Empty form**
![Create Event - Empty](./docs/images/create-event-empty-form.png)

**Filled form**
![Create Event - Filled](./docs/images/create-event-filled-for.png)
