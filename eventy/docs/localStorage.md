# LocalStorage Usage in Eventy

This document describes how localStorage is used in the Eventy project for data persistence.

## Overview

LocalStorage is used in several key areas of the application to persist data between page reloads and browser sessions. The main use cases include:

1. Authentication state
2. Form data persistence
3. User preferences and settings

## Storage Keys

The application uses predefined storage keys defined in `src/lib/constants.ts`:

```typescript
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'token',
  EVENT_FORM_DATA: 'eventFormData',
};
```

## Use Cases

### 1. Authentication

- **Purpose**: Store user authentication token
- **Key**: `STORAGE_KEYS.ACCESS_TOKEN`
- **Usage**:
  - Set when user logs in
  - Retrieved for authenticated API requests
  - Removed on logout
- **Implementation**: Handled by `token.service.ts`

### 2. Event Creation Form

- **Purpose**: Persist form data during event creation
- **Key**: `STORAGE_KEYS.EVENT_FORM_DATA`
- **Usage**:
  - Automatically saves form state as user types
  - Restores form data on page reload
  - Cleared after successful event creation
- **Implementation**: Located in `src/app/[locale]/organizer/events/new/page.tsx`

#### Form Data Storage

The form uses two different storage mechanisms:

1. **Main Form Data** (`STORAGE_KEYS.EVENT_FORM_DATA`):

   - Stores all form fields including speaker IDs
   - Automatically saved on every form change
   - Cleared after successful event creation

2. **Speakers Store** (`speakers-store`):
   - Persistent storage for speaker information
   - Managed by Zustand with localStorage persistence
   - Stores complete speaker objects (`UserByEmail[]`)
   - Used to maintain speaker data between form sessions
   - Cleared after successful event creation

### 3. State Management

LocalStorage is also used by various Zustand stores for persistence:

- `authStore`: Persists authentication state
- `roleStore`: Persists user role information
- `speakersStore`: Persists speaker-related data
