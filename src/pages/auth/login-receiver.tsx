import React, { useCallback, useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const LoginReceiver: React.FC = () => {
  const mutation = trpc.auth.createUser.useMutation();
  const { user } = useUser();
  const router = useRouter();

  const createAccount = useCallback(async () => {
    if (!user) return;
    await mutation.mutate({
      id: user.id,
      nickName:
        user.fullName ??
        user.username ??
        user.primaryEmailAddress?.emailAddress ??
        `${user.id}`,
    });
    await router.replace('/');
  }, [user, mutation]);

  useEffect(() => {
    createAccount();
  }, [user]);

  return <div>Probíhá přihlašování</div>;
};

export default LoginReceiver;
