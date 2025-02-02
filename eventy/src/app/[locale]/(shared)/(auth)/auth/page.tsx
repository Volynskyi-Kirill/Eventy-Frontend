'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { URLS } from '@/components/Navigation/urls';

const GoogleAuthHandler = () => {
  const router = useRouter();
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        const token = new URLSearchParams(window.location.search).get('token');

        if (!token) {
          console.error('Google authentication failed: Token not found');
          router.replace(URLS.CLIENT.HOME);
          return;
        }

        await loginWithGoogle(token);

        router.replace(URLS.CLIENT.HOME);
      } catch (error) {
        console.error('Error during Google authentication:', error);
        router.replace(URLS.CLIENT.HOME);
      }
    };

    handleGoogleAuth();
  }, [router, loginWithGoogle]);

  return <div>Processing Google authentication...</div>;
};

export default GoogleAuthHandler;
