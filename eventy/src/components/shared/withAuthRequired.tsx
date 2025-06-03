'use client';

import { ComponentType, ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { AuthRequiredModal } from './AuthRequiredModal';
import { useAuthRequired } from '@/lib/hooks/useAuthRequired';

interface WithAuthRequiredProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Higher-order component that can wrap any component that requires authentication
 * Shows AuthRequiredModal if user is not logged in
 */
export function WithAuthRequired({
  children,
  fallback,
}: WithAuthRequiredProps) {
  const { isLoggedIn } = useAuthStore();
  const { setIsAuthModalOpen } = useAuthRequired();

  // If user is logged in, render children
  if (isLoggedIn) {
    return <>{children}</>;
  }

  // If not logged in, render fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Otherwise, render null with the auth modal
  return (
    <>
      {null}
      <AuthRequiredModal
        isOpen={true}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}

/**
 * HOC factory that wraps a component with authentication requirement
 */
export function withAuthRequired<P extends object>(
  Component: ComponentType<P>
) {
  return function AuthProtectedComponent(props: P) {
    const { setIsAuthModalOpen } = useAuthRequired();
    const { isLoggedIn } = useAuthStore();

    if (!isLoggedIn) {
      return (
        <AuthRequiredModal
          isOpen={true}
          onClose={() => setIsAuthModalOpen(false)}
        />
      );
    }

    return <Component {...props} />;
  };
}
