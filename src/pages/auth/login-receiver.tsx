import React, { useCallback, useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useDialog } from '~/components/contexts/DialogProvider';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';

const LoginReceiver: React.FC = () => {
  const mutation = trpc.auth.createUser.useMutation();
  const { user } = useUser();
  const router = useRouter();
  const { setOpenLoginDialog } = useDialog();

  const createAccount = useCallback(async () => {
    if (!user) return;

    let nickName = '';
    if (user.firstName && user.lastName) {
      nickName = `${user.firstName} ${user.lastName?.substring(0, 1)}.`;
    } else if (user.username) {
      nickName = user.username;
    } else if (typeof user.primaryEmailAddress?.emailAddress.split('@')[0] === 'string') {
      const leftPartOfEmail = user.primaryEmailAddress.emailAddress.split('@')[0] as string;
      nickName = leftPartOfEmail;
    } else {
      nickName = user.id;
    }

    const result = await mutation.mutateAsync({
      id: user.id,
      nickName,
    });
    if (result.createdNewUser) {
      await router.replace('/auth/user');
    } else {
      await router.replace('/');
    }
  }, [router, user, mutation]);

  useEffect(() => {
    setOpenLoginDialog(false);
    createAccount();
  }, [user]);

  if (mutation.error) {
    return <MessageBox type="error" message={'Chyba při přihlašování - kontaktujte prosím správce webu.'} />;
  }

  return <Loader title={'Probíhá přihlašování...'} />;
};

export default LoginReceiver;

export async function getStaticProps() {
  return {
    props: {},
  };
}
