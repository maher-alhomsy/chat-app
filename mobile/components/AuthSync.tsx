import { useEffect, useRef } from 'react';

import * as Sentry from '@sentry/react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';

import { useAuthCallback } from '@/hooks/useAuth';

const AuthSync = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const { mutate: syncUser } = useAuthCallback();

  const hasSync = useRef(false);

  useEffect(() => {
    if (isSignedIn && user && !hasSync.current) {
      hasSync.current = true;

      console.log('Sync user');

      syncUser(undefined, {
        onSuccess: (data) => {
          console.log('User synced with backend: ', data.name);
          Sentry.logger.info(
            Sentry.logger.fmt`User synced with backend: ${data}`,
            {
              userId: user.id,
              userName: data?.user?.name,
            },
          );
        },
        onError: (error) => {
          console.log('User sync failed for the user: ', error.message);

          Sentry.logger.error('Failed to sync user with backend', {
            userId: user.id,
            error: error instanceof Error ? error.message : String(error),
          });
        },
      });
    }

    if (!isSignedIn) hasSync.current = false;
  }, [isSignedIn, user, syncUser]);

  return null;
};

export default AuthSync;
