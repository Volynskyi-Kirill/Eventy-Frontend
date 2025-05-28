'use client';

import { useState, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * A hook that handles actions requiring authentication
 * Shows a modal if the user is not logged in, otherwise executes the action
 */
export function useAuthRequired() {
  const { isLoggedIn } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthRequiredAction = useCallback(
    (action: () => void) => {
      if (isLoggedIn) {
        action();
      } else {
        setIsAuthModalOpen(true);
      }
    },
    [isLoggedIn]
  );

  return {
    isAuthModalOpen,
    setIsAuthModalOpen,
    handleAuthRequiredAction,
  };
}
